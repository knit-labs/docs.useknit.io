import React, { useCallback, useState } from "react";

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

const BASE_URL = "https://api-prod.useknit.io";

export function MethodBadge({ method }: { method: string }) {
  const upper = (method || "GET").toUpperCase();
  return (
    <span className={`knit-method knit-method--${upper.toLowerCase()}`}>
      {upper}
    </span>
  );
}

/**
 * Renders the path with `{placeholders}` and `:params` highlighted so the
 * variable segments are obvious at a glance.
 */
function HighlightedPath({ path }: { path: string }) {
  const segments = path.split(/(\{[^}]+\}|:[A-Za-z_][A-Za-z0-9_]*)/g);
  return (
    <>
      {segments.map((segment, index) =>
        /^\{[^}]+\}$/.test(segment) || /^:[A-Za-z_]/.test(segment) ? (
          <span className="knit-endpoint__param" key={index}>
            {segment}
          </span>
        ) : (
          <React.Fragment key={index}>{segment}</React.Fragment>
        )
      )}
    </>
  );
}

export function Endpoint({
  method = "GET",
  path,
  base = true,
}: {
  method?: Method | string;
  path: string;
  base?: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const fullPath = base ? `${BASE_URL}${path}` : path;

  const copy = useCallback(() => {
    if (typeof navigator === "undefined" || !navigator.clipboard) return;
    navigator.clipboard.writeText(fullPath).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    });
  }, [fullPath]);

  return (
    <div className="knit-endpoint">
      <MethodBadge method={method} />
      <div className="knit-endpoint__path">
        {base && <span className="knit-endpoint__base">{BASE_URL}</span>}
        <HighlightedPath path={path} />
      </div>
      <button
        type="button"
        className="knit-endpoint__copy"
        onClick={copy}
        aria-label={copied ? "Copied" : "Copy endpoint URL"}
        title={copied ? "Copied" : "Copy endpoint URL"}
      >
        {copied ? (
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : (
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
        )}
      </button>
    </div>
  );
}

export default Endpoint;
