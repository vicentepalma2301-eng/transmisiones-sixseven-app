/**
 * Configuración de Vite.
 *
 * El alias `@` evita imports relativos largos como `../../components/ui/Boton.jsx`.
 * Hay que declararlo en los tres lugares que lo usan: acá para que Vite resuelva en
 * desarrollo y en el build, y en el bloque `alias` de package.json para que ESLint
 * y el editor no marquen el import como inexistente.
 */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const carpetaSrc = path.dirname(fileURLToPath(import.meta.url)) + '/src';

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      '@': carpetaSrc,
    },
  },

  server: {
    port: 5173,
    // El servidor de Vite no abre el navegador solo, porque en un entorno de
    // desarrollo sin Escritorio eso falla y corta el arranque.
    open: false,
  },

  build: {
    // Carpeta que Express sirve en producción (decisión AD-03).
    outDir: 'dist',
    sourcemap: false,

    /**
     * El peso del bundle se separa en dos decisiones.
     *
     * 1. `manualChunks` parte las librerías grandes en chunks propios. Sin esto, React,
     *    React Router y MUI caen en un solo archivo que se descarga entero en cada
     *    carga, y además cambia por completo apenas se actualiza cualquiera de las
     *    tres: el navegador no puede reutilizar nada del caché. Con los chunks
     *    separados, actualizar una pantalla no obliga a volver a bajar MUI.
     *
     *    Va en la forma de FUNCIÓN, no como objeto, porque Vite 8 usa Rolldown y ahí
     *    la forma de objeto no existe: tira `manualChunks is not a function`. La forma
     *    de función funciona igual en Rolldown y en Rollup, así que el archivo no
     *    queda atado a esta versión de Vite.
     *
     *    El orden de los `if` importa: `@emotion/react` y `@mui/icons-material`
     *    contienen la palabra "react", así que hay que mirar MUI primero o estos
     *    caerían en el chunk equivocado.
     *
     * 2. `chunkSizeWarningLimit` sube a 600 kB porque el chunk de MUI con todos sus
     *    componentes ronda los 500 kB, y el aviso por defecto (500) saldría en cada
     *    build sin señalar un problema real. El código de la aplicación sí está
     *    partido por ruta con `lazy`, así que el usuario no carga el sistema entero en
     *    la primera pantalla.
     */
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined;

          if (id.includes('@mui') || id.includes('@emotion')) return 'mui';
          if (id.includes('react')) return 'react';

          // El resto de dependencias en un chunk propio, para que no entren en el
          // código de la aplicación ni cambien cuando cambia una pantalla.
          return 'vendor';
        },
      },
    },

    chunkSizeWarningLimit: 600,
  },
});
