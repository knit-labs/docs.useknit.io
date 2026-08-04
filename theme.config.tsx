import React from "react";
import { DocsThemeConfig, useConfig } from "nextra-theme-docs";
import { useRouter } from "next/router";
import { Callout, Steps, Tabs, Tab, Cards, Card as NextraCard } from "nextra/components";
import Footer from "./components/Footer";
import {
  Endpoint,
  MethodBadge,
  Fields,
  Field,
  ResponseField,
  CardGrid,
  Card,
  Meta,
  Chip,
  Scope,
  Hero,
} from "./components/mdx";

const SITE_URL = "https://docs.useknit.io";
const DEFAULT_DESCRIPTION =
  "Knit API reference — collect stablecoin payments, provision wallets, send payouts, and keep your systems in sync with webhooks.";

const config: DocsThemeConfig = {
  // Both wordmarks are rendered and toggled in CSS rather than switched on
  // `resolvedTheme`, which is undefined on the server and would flash.
  logo: (
    <span className="knit-logo">
      <img
        src="/knit.svg"
        alt="Knit"
        className="knit-logo__mark knit-logo__mark--light"
      />
      <img
        src="/knit-white.svg"
        alt="Knit"
        className="knit-logo__mark knit-logo__mark--dark"
      />
      <span className="knit-logo__tag">Docs</span>
    </span>
  ),
  logoLink: "/",

  head: () => {
    const { asPath, defaultLocale, locale } = useRouter();
    const { frontMatter, title } = useConfig();
    const url =
      SITE_URL + (defaultLocale === locale ? asPath : `/${locale}${asPath}`);
    const description = frontMatter.description || DEFAULT_DESCRIPTION;
    const pageTitle = title ? `${title} – Knit Docs` : "Knit Docs";

    return (
      <>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={description} />
        <meta name="theme-color" content="#4c38cb" />
        <link rel="icon" href="/knit-logo.svg" />
        <link rel="canonical" href={url} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Knit Docs" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={description} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={description} />
      </>
    );
  },

  // Knit purple (#4C38CB) expressed as the theme's primary hue/saturation.
  primaryHue: { light: 248, dark: 252 },
  primarySaturation: { light: 59, dark: 100 },

  search: {
    placeholder: "Search documentation…",
  },

  sidebar: {
    defaultMenuCollapseLevel: 1,
    autoCollapse: true,
    toggleButton: true,
  },

  toc: {
    title: "On this page",
    backToTop: true,
    float: true,
  },

  navigation: {
    prev: true,
    next: true,
  },

  darkMode: true,
  nextThemes: {
    defaultTheme: "light",
  },

  docsRepositoryBase: "https://github.com/knit-labs/docs.useknit.io/tree/main",
  editLink: {
    component: null,
  },
  feedback: {
    content: null,
  },

  footer: {
    component: Footer,
  },

  useNextSeoProps() {
    const { asPath } = useRouter();
    return {
      titleTemplate: asPath === "/" ? "Knit Docs" : "%s – Knit Docs",
    };
  },

  // Components available to every MDX page without an explicit import.
  components: {
    // Nextra's own building blocks — registering them here means pages don't
    // each need an import statement.
    Callout,
    Steps,
    Tabs,
    Tab,
    Cards,
    NextraCard,
    Endpoint,
    MethodBadge,
    Fields,
    Field,
    ResponseField,
    CardGrid,
    Card,
    Meta,
    Chip,
    Scope,
    Hero,
  },
};

export default config;
