import React from "react";
import Link from "next/link";

export function CardGrid({
  cols = 2,
  children,
}: {
  cols?: number;
  children: React.ReactNode;
}) {
  return (
    <div
      className="knit-cards"
      style={{ ["--knit-cards-cols" as any]: String(cols) }}
    >
      {children}
    </div>
  );
}

export function Card({
  title,
  icon,
  href,
  children,
}: {
  title: string;
  icon?: string;
  href?: string;
  children?: React.ReactNode;
}) {
  const inner = (
    <>
      <div className="knit-card__title">
        {icon && (
          <span className="knit-card__icon" aria-hidden="true">
            {icon}
          </span>
        )}
        {title}
      </div>
      {children && <div className="knit-card__body">{children}</div>}
    </>
  );

  if (!href) {
    return <div className="knit-card">{inner}</div>;
  }

  const external = /^https?:\/\//.test(href);
  if (external) {
    return (
      <a
        className="knit-card"
        href={href}
        target="_blank"
        rel="noreferrer noopener"
      >
        {inner}
      </a>
    );
  }

  return (
    <Link className="knit-card" href={href}>
      {inner}
    </Link>
  );
}

export default Card;
