import React from "react";

/** Row of small chips shown directly beneath an endpoint bar. */
export function Meta({ children }: { children: React.ReactNode }) {
  return <div className="knit-meta">{children}</div>;
}

export function Chip({
  label,
  value,
  brand,
}: {
  label?: string;
  value: string;
  brand?: boolean;
}) {
  return (
    <span className={`knit-chip${brand ? " knit-chip--brand" : ""}`}>
      {label && <span>{label}</span>}
      <code>{value}</code>
    </span>
  );
}

/** Convenience: the OAuth scope a route requires. */
export function Scope({ value }: { value: string }) {
  return <Chip label="Scope" value={value} brand />;
}

export default Meta;
