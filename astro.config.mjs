import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  output: "static",
  adapter: cloudflare(),
  i18n: {
    defaultLocale: "fi",
    locales: ["en", "fi"],
    routing: { prefixDefaultLocale: false },
  },
});
