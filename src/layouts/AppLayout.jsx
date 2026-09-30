/**
 * Layout con barra superior y menú lateral — AD-03 y mapa de pantallas.
 *
 * Un componente de `components/`, no de `components/ui/`, porque ya sabe de la
 * aplicación: arma el menú con los módulos del registro. La señal práctica de la
 * ayudantía 6: un primitivo de `ui/` no importa de `config/`; este sí, así que vive
 * acá.
 *
 * No dibuja el contenido de la página: eso lo hace `Outlet` de React Router, que
 * recibe las rutas hijas.
 */
import { Outlet } from 'react-router-dom';

import { LayoutApp } from '@/components/ui';
import { MODULOS } from '@/config/modulos.js';

export default function AppLayout() {
  /**
   * El menú se arma desde el registro único de módulos, sin filtros: sin
   * autenticación no hay permisos que ocultar, así que se ven todos.
   *
   * La lista de módulos del registro es la misma que usa el router para armar las
   * rutas, así que tampoco puede pasar que haya un enlace sin pantalla detrás.
   */
  const items = MODULOS.map((modulo) => ({
    a: modulo.ruta,
    texto: modulo.texto,
    icono: modulo.icono,
  }));

  return (
    <LayoutApp marca="Transmisiones" items={items}>
      <Outlet />
    </LayoutApp>
  );
}
