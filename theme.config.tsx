import React from "react";
import { DocsThemeConfig } from "nextra-theme-docs";
import { useRouter } from "next/router";
import { useConfig } from "nextra-theme-docs";
import Footer from "./components/Footer/Footer";

export default {
  head: () => {
    const { asPath, defaultLocale, locale } = useRouter();
    const { frontMatter } = useConfig();
    const url =
      "https://docs.useknit.io" +
      (defaultLocale === locale ? asPath : `/${locale}${asPath}`);

    return (
      <>
        <meta property="og:url" content={url} />
        <link rel="icon" href="/knit-logo.svg" />
        <meta property="og:title" content={frontMatter.title || "Knit"} />
        <meta
          property="og:description"
          content={frontMatter.description || "The next site builder"}
        />
      </>
    );
  },
  logo: (
    <React.Fragment>
      <div className="ml">
        <img
          style={{ width: "27px", marginRight: ".3rem" }}
          src="/knit-logo.svg"
          className="w-5"
        />
      </div>
      <span className="text-gray-600 font-normal hidden md:inline"></span>
    </React.Fragment>
  ),

  docsRepositoryBase: "https://github.com/gbxnga/docs.useknit.io",
  footer: {
    text: (
      <div style={{ width: "100%" }}>
        <Footer />
      </div>
    ),
  },
  useNextSeoProps() {
    const { asPath } = useRouter();
    if (asPath !== "/") {
      return {
        titleTemplate: "%s – KNIT",
      };
    }
  },
};

// export default config;
