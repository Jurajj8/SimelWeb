import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: "https://www.simel-group.sk",
  base: '/', // ✅ Správna relatívna cesta pre hosting
  output: "static", // ✅ Vynúti statický výstup
  integrations: [sitemap({
    i18n: {
      defaultLocale: 'sk',
      locales: {
        sk: 'sk',
        en: 'en',
        de: 'de',
      },
    },
    filter: (page) => !page.includes('/sitemap') && page !== 'https://www.simel-group.sk/sk/',
  })],
  trailingSlash: 'always',
  
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
