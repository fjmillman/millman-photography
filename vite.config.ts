import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import mdx from "@mdx-js/rollup"
import mdxImportMediaPlugin from 'rehype-mdx-import-media'

export default defineConfig(({ command }) => ({
  ssr: {
    noExternal: command === "build" ? true : undefined,
  },
  plugins: [tailwindcss(), mdx({
    rehypePlugins: [mdxImportMediaPlugin],
  }), reactRouter(), tsconfigPaths()],
}));
