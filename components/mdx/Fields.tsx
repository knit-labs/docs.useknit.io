import React from "react";

export function Fields({ children }: { children: React.ReactNode }) {
  return <div className="knit-fields">{children}</div>;
}

export function Field({
  name,
  type,
  required,
  defaultValue,
  children,
}: {
  name: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="knit-field">
      <div className="knit-field__head">
        <span className="knit-field__name">{name}</span>
        {type && <span className="knit-field__type">{type}</span>}
        {required !== undefined && (
          <span
            className={`knit-field__flag knit-field__flag--${
              required ? "required" : "optional"
            }`}
          >
            {required ? "required" : "optional"}
          </span>
        )}
        {defaultValue && (
          <span className="knit-field__type">default: {defaultValue}</span>
        )}
      </div>
      {children && <div className="knit-field__body">{children}</div>}
    </div>
  );
}

/** Alias kept so request and response sections read differently in source. */
export const ResponseField = Field;

export default Fields;
