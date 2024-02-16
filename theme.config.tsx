import React from "react";
import { DocsThemeConfig } from "nextra-theme-docs";

const config: DocsThemeConfig = {
  logo: (
    <React.Fragment>
      <div className="ml">
        <img style={{width: "27px", marginRight: ".3rem"}} src="/knit-logo.svg" className="w-5" />
      </div>
      <span className="text-gray-600 font-normal hidden md:inline"></span>
    </React.Fragment>
  ),
  project: {
    link: "https://github.com/gbxnga/docs.useknit.io",
  },
  chat: {
    link: "https://discord.com",
  },
  docsRepositoryBase: "https://github.com/gbxnga/docs.useknit.io",
  footer: {
    text: "Knit",
  },
};

export default config;
