import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const env = process.env.NODE_ENV;
// env är development i npm run dev, production i npm run build
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: env === "development" ? "/" : "/e-wallet/",
});
