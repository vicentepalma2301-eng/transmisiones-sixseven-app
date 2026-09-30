/**
 * Raíz de la aplicación: aquí se declaran las rutas.
 *
 * Estructura:
 *
 *   /            → AppLayout + Outlet, y adentro las pantallas de los módulos
 *
 * Todas las pantallas cuelgan de `AppLayout`, así que el layout (barra + menú) se dibuja
 * una sola vez. Si cada ruta repitiera el layout, habría que cambiarlo en ocho archivos
 * la próxima vez.
 *
 * Las rutas de los módulos se generan con un `.map()` sobre el registro único de
 * `config/modulos.js`. Así el menú lateral y las rutas no pueden desincronizarse: si
 * hay un módulo en el menú, hay una ruta y una petición, porque salen de la misma
 * lista.
 *
 * No hay login ni control de acceso: la aplicación entra directo al tablero y cualquier
 * ruta es alcanzable.
 */
import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Columna, PaginaContenedor, PantallaCarga, Tarjeta, TextoSecundario, Titulo } from '@/components/ui';
import AppLayout from '@/layouts/AppLayout.jsx';
import { MODULOS } from '@/config/modulos.js';

/**
 * Las pantallas se cargan bajo demanda con `lazy`.
 *
 * Sin esto, la primera visita descarga el sistema entero: con las pantallas importadas
 * de forma normal, el bundle llegó a 520 kB, casi todos MUI. Con `lazy`, cada pantalla
 * baja su código cuando se la abre por primera vez.
 */
const ModuloPage = lazy(() => import('@/pages/ModuloPage.jsx'));

/**
 * Página para rutas que no existen.
 */
function PaginaNoEncontrada() {
  return (
    <PaginaContenedor titulo="Página no encontrada">
      <Tarjeta>
        <Columna gap={1} sx={{ py: 4 }}>
          <Titulo sx={{ fontSize: '1.25rem' }}>Esta dirección no existe</Titulo>
          <TextoSecundario>
            Revisa el enlace, o vuelve al tablero desde el menú lateral.
          </TextoSecundario>
        </Columna>
      </Tarjeta>
    </PaginaContenedor>
  );
}

export default function App() {
  /**
   * Una ruta por módulo del registro, todas montando la misma pantalla con su módulo
   * por prop. La pantalla pide los datos de `modulo.endpoint` al abrirse, así que la
   * ruta y la petición quedan Atadas a la misma entrada del registro.
   */
  const rutasDeModulos = MODULOS.map((modulo) => (
    <Route key={modulo.clave} path={modulo.ruta} element={<ModuloPage modulo={modulo} />} />
  ));

  return (
    // Un solo `Suspense` alrededor de las rutas: cuando una pantalla lazy está
    // bajando, se ve el indicador de carga en lugar de la pantalla anterior.
    <Suspense fallback={<PantallaCarga texto="Cargando pantalla…" />}>
      <Routes>
        <Route element={<AppLayout />}>
          {/* La raíz manda al tablero: es el destino por defecto. */}
          <Route index element={<Navigate to="/tablero" replace />} />

          {rutasDeModulos}

          <Route path="*" element={<PaginaNoEncontrada />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
