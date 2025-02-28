import type { Config } from "tailwindcss";
import sharedConfig from "@app/tailwind-config";

const config: Pick<Config, "content" | "presets" | "darkMode" | 'theme'> = {
	content: ["./src/**/*.tsx"],
	presets: [sharedConfig],
	darkMode: 'class'
};

export default config;