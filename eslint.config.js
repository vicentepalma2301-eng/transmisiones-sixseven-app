/**
 * Configuración de ESLint — configuración plana (flat config), la que usa ESLint 9 y
 * 10. El `.eslintrc.json` viejo ya no se lee, y por eso acá el orden importa: primero
 * se declara qué archivos se revisan, y después los plugins.
 *
 * Reglas que no son solo de estilo:
 *
 *   react-refresh/only-export-components — evita que un archivo que exporta un
 *   componente exporte también constantes o funciones sueltas. Sin esta regla, un
 *   `import { useAuth }` desde un `.jsx` puede terminar rompiendo el refresco en
 *   caliente de Vite, y el síntoma aparece solo en desarrollo y no en el build.
 *
 *   react-hooks/rules-of-hooks — los hooks en la misma posición de cada render. Es la
 *   regla que más errores graves evita, porque un hook en un `if` rompe en producción
 *   de formas que en desarrollo no aparecen.
 */
import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  // Primero va el «ignorar»: sin esto, ESLint revisaría `dist/` y los archivos
  // minificados que genera el build, produciendo miles de errores falsos.
  {
    ignores: ['dist/**', 'node_modules/**'],
  },

  js.configs.recommended,

  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        // Vite inyecta `import.meta.env`; ESLint no lo sabe solo.
        'import.meta': 'writable',
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,

      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      // Las variables de componentes que empiezan con mayúscula y no se usan como
      // componente son typos, casi siempre un `<Boton>` que quedó como `<boton>`.
      // ESLint no marca los JSX, así que se cubre con una expresión regular.
      'no-unused-vars': [
        'error',
        { varsIgnorePattern: '^[A-Z]', ignoreRestSiblings: true },
      ],

      // `==` y `!=` permiten comparaciones que convierten null en 0. En este
      // proyecto los amounts son enteros y los ids pueden venir como texto de un
      // <select>, así que se comparan con `Number()` explícito antes.
      eqeqeq: ['error', 'smart'],
      // `console.log` está permitido a propósito: la capa de servicios y la pantalla de
      // módulo dejan registro de cada petición al backend, y ese registro es parte de
      // lo que hay que poder revisar.
      'no-console': ['warn', { allow: ['warn', 'error', 'log'] }],
    },
  },

  {
    // `vite.config.js` corre en Node, no en el navegador: no tiene `window` ni
    // `document`, y exigir globals del navegador ahí produce errores falsos.
    files: ['vite.config.js', 'eslint.config.js'],
    languageOptions: {
      globals: { ...globals.node },
    },
  },
];
