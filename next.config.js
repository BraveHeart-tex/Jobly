// biome-ignore lint/correctness/noNodejsModules: <explanation>
import { fileURLToPath } from "node:url";
import createJiti from "jiti";

const jiti = createJiti(fileURLToPath(import.meta.url));

jiti("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  experimental: {
    serverComponentsExternalPackages: ["@node-rs/argon2"],
  },
};

export default config;
