/**
 * Registro único de los módulos de la aplicación.
 *
 * Este archivo es la fuente de verdad de qué módulos existen. Lo consumen el menú
 * lateral (`AppLayout`), el router (`App.jsx`) y la pantalla de cada módulo, y los
 * tres se construyen a partir de la misma lista.
 *
 * Antes de este archivo, cada uno repetía su propia lista. Eso inevitablemente se
 * desincroniza: se agregaba un módulo al menú y se olvidaba de la ruta, y el
 * resultado era un enlace que llevaba a una pantalla en blanco. Con una sola lista,
 * agregar un módulo es agregar una entrada acá.
 *
 * Cada entrada declara su `endpoint`, que es lo que se pide al backend al abrir el
 * módulo. Se escribe acá y no en la pantalla para que el menú, la ruta y la petición
 * no puedan desincronizarse: agregar un módulo es agregar una entrada, nada más.
 */
import {
  IconoAgenda,
  IconoAuspicios,
  IconoFinanciero,
  IconoInventario,
  IconoPersonal,
  IconoTablero,
  IconoUsuarios,
} from '@/components/ui';

export const MODULOS = [
  {
    clave: 'TABLERO',
    texto: 'Tablero',
    ruta: '/tablero',
    endpoint: '/tablero',
    icono: IconoTablero,
    descripcion: 'Resumen del sistema',
  },
  {
    clave: 'AGENDA',
    texto: 'Agenda',
    ruta: '/agenda',
    endpoint: '/agenda',
    icono: IconoAgenda,
    descripcion: 'Programación semanal de transmisiones',
  },
  {
    clave: 'PERSONAL',
    texto: 'Personal',
    ruta: '/personal',
    endpoint: '/personal',
    icono: IconoPersonal,
    descripcion: 'Trabajadores y roles',
  },
  {
    clave: 'INVENTARIO',
    texto: 'Inventario',
    ruta: '/inventario',
    endpoint: '/inventario',
    icono: IconoInventario,
    descripcion: 'Equipos y disponibilidad',
  },
  {
    clave: 'FINANCIERO',
    texto: 'Financiero',
    ruta: '/financiero',
    endpoint: '/financiero',
    icono: IconoFinanciero,
    descripcion: 'Ingresos, gastos y balances',
  },
  {
    clave: 'AUSPICIOS',
    texto: 'Auspicios',
    ruta: '/auspicios',
    endpoint: '/auspicios',
    icono: IconoAuspicios,
    descripcion: 'Convenios y beneficios',
  },
  {
    clave: 'USUARIOS',
    texto: 'Usuarios',
    ruta: '/usuarios',
    endpoint: '/usuarios',
    icono: IconoUsuarios,
    descripcion: 'Gestión de accesos al sistema',
  },
];

export default MODULOS;
