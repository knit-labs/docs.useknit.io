import React from "react";

export function Hero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="knit-hero">
      {eyebrow && <span className="knit-hero__eyebrow">{eyebrow}</span>}
      <h1 className="knit-hero__title">{title}</h1>
      {subtitle && <p className="knit-hero__subtitle">{subtitle}</p>}
    </div>
  );
}

export default Hero;
