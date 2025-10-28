import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import viteImagemin from "vite-plugin-imagemin";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(), 
    mode === "development" && componentTagger(),
    mode === "production" && ViteImageOptimizer({
      jpeg: { quality: 80 },
      jpg: { quality: 80 },
      png: { quality: 80 },
      webp: { quality: 85 },
      avif: { quality: 75 },
    }),
    // Gate imagemin behind env flag (known to fail in CI)
    mode === "production" && process.env.ENABLE_IMAGEMIN === 'true' && viteImagemin({
      gifsicle: { optimizationLevel: 7 },
      optipng: { optimizationLevel: 7 },
      mozjpeg: { quality: 80 },
      webp: { quality: 85 },
      svgo: {
        plugins: [{ name: 'removeViewBox', active: false }]
      },
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    sourcemap: mode === 'development', // Only in dev mode
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor chunks for better caching
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-ui-core': [
            '@radix-ui/react-accordion',
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
          ],
          'vendor-ui-extended': [
            '@radix-ui/react-tabs',
            '@radix-ui/react-tooltip',
            '@radix-ui/react-select',
            '@radix-ui/react-popover',
          ],
          'vendor-supabase': ['@supabase/supabase-js'],
          'vendor-charts': ['recharts'],
          'vendor-forms': ['react-hook-form', '@hookform/resolvers', 'zod'],
          'vendor-editor': ['react-quill', 'quill'],
        },
      },
    },
    chunkSizeWarningLimit: 400, // Warn if chunks exceed 400KB (stricter budget)
  },
}));
