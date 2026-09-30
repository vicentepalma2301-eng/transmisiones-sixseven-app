/**
 * Barril de los primitivos de interfaz.
 *
 * Una pantalla importa de acá y nunca de cada archivo suelto:
 *
 *     import { Boton, CampoTexto, Tarjeta } from '@/components/ui';
 *
 * Tres razones. La primera es que cambiar el nombre de un archivo no rompe 24
 * importaciones. La segunda, más importante, es que `@mui/*` queda importado
 * únicamente dentro de esta carpeta: es la barrera que hace que cambiar de librería sea
 * edición de un archivo y no de 24. Y la tercera es que este archivo deja ver de un
 * vistazo qué primitivos existen.
 */
export { default as Boton } from './Boton.jsx';
export { CampoPassword, CampoSeleccion, CampoTexto } from './Campos.jsx';
export {
  Aviso,
  Cargando,
  EstadoVacio,
  PaginaContenedor,
  PantallaCarga,
  TablaDatos,
  Tarjeta,
} from './Contenedores.jsx';
export { Columna, Fila, Rejilla, Subtitulo, TextoChico, TextoSecundario, Titulo } from './Estructura.jsx';
export { BarraSuperior, ItemMenu, LayoutApp, MenuLateral } from './Layout.jsx';
export * from './Iconos.jsx';
