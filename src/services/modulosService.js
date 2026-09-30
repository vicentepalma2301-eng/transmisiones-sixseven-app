/**
 * Servicios de los módulos de la aplicación.
 *
 * Son funciones con nombre, no URLs: las pantallas llaman
 * `modulosService.consultar(modulo)` y no saben que existe un `GET /api/agenda`. Si la
 * ruta cambiara, solo se edita este archivo (decisión AD-07).
 *
 * El endpoint vive en `config/modulos.js` y no acá: el registro de módulos es la
 * fuente de verdad de qué hay y de dónde se lee cada módulo, y el servicio solo sabe
 * cómo pegarle a la API.
 */
import { api, urlCompleta } from './api.js';

export const modulosService = {
  /**
   * Pide los datos de un módulo.
   *
   * @param {{ endpoint: string }} modulo una entrada de `MODULOS`
   * @returns {Promise<{ status: number, datos: any }>} el status y el cuerpo ya parseado
   */
  consultar(modulo) {
    return api.get(modulo.endpoint);
  },
};

/**
 * URL que se va a pedir para un módulo, para poder mostrarla en pantalla.
 *
 * Va en el servicio y no en la pantalla porque la URL completa depende de
 * `VITE_API_URL`, y eso es un detalle de la capa de servicios.
 *
 * @param {{ endpoint: string }} modulo
 * @returns {string}
 */
export function urlDeModulo(modulo) {
  return urlCompleta(modulo.endpoint);
}

export default modulosService;
