/**
 * Punto de entrada del frontend — el que Vite ejecuta.
 *
 * Orden de los providers, de adentro hacia afuera, y por qué importa:
 *
 *   Router        — sabe qué URL es cuál. Va por fuera porque las rutas usan
 *                   `Navigate` y los enlaces del menú son del router.
 *   ThemeProvider — el tema, para que los componentes de MUI se vean iguales en toda
 *                   la aplicación.
 *   CssBaseline   — borra las diferencias de estilos entre navegadores.
 *
 * `StrictMode` está porque en desarrollo hace correr los efectos dos veces a propósito:
 * es lo que revela los casos en que un estado se actualiza en un componente ya
 * desmontado. Solo lo hace en desarrollo, nunca en el build.
 */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import App from '@/App.jsx';
import { tema } from '@/theme/tema.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={tema}>
      <CssBaseline />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
);
