import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: '/', // ✅ Správna relatívna cesta pre hosting
  output: "static", // ✅ Vynúti statický výstup

  vite: {
    plugins: [tailwindcss()],
    build: {
      rollupOptions: {
        output: {
          assetFileNames: "resources/[name]-[hash][extname]", // ✅ CSS & JS do `resources/`
          entryFileNames: "resources/[name]-[hash].js",
        },
      },
    },
  },

  build: {
    format: "directory", // ✅ Dôležité! Vynúti generovanie `index.html`
    ssr: false, // 🔥 Zakáže generovanie SSR súborov
  }
});
