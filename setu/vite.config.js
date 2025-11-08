import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { createServer } from "./server";

export default defineConfig(({ mode }) => ({
  server: {
    host: "0.0.0.0",

    allowedHosts: [
      "internsetu-3.onrender.com", // backend
      "internsetu-4.onrender.com"  // frontend
    ],

    fs: {
      allow: [
        ".",
        "./client",
        "./shared"
      ],
      deny: [".env", ".env.*", "*.{crt,pem}", "**/.git/**", "server/**"],
    },
  },

  build: {
    outDir: "dist/spa",
  },

  plugins: [
    react(),
    // ✅ Express plugin ONLY for dev
    mode === "development" ? expressPlugin() : null
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
    dedupe: ["react", "react-dom"],
  },
}));

function expressPlugin() {
  return {
    name: "express-plugin",
    apply: "serve",
    configureServer(server) {
      const app = createServer();
      server.middlewares.use(app);
    },
  };
}
