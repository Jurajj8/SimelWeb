import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: "https://simel-group.sk",
  base: '/', // ✅ Správna relatívna cesta pre hosting
  output: "static", // ✅ Vynúti statický výstup
  integrations: [sitemap()],
  trailingSlash: 'never',

  redirects: {
    '/': '/sk'
  },

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
