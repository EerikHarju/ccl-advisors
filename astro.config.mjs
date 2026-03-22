import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  site: "https://ccladvisors.com",
  output: "server", // ← THIS ENABLES API ROUTES
  adapter: cloudflare(), // ← REQUIRED FOR CLOUDFLARE FUNCTIONS
  i18n: {
    defaultLocale: "fi",
    locales: ["en", "fi"],
    routing: { prefixDefaultLocale: false },
  },
});
