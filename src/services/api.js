/**
 * ÚNICO PUNTO DE CONTACTO CON EL BACKEND — decisión AD-07.
 *
 * Ninguna pantalla hace `fetch`. Todo pasa por acá, y este archivo centraliza:
 *
 *   1. La URL base. Cambiarla es cambiar una línea, no buscar y reemplazar en cada
 *      pantalla.
 *   2. El parseo del formato de error. Un solo lugar donde se traduce
 *      `{ error: { codigo, mensaje, detalle } }` a algo que la UI pueda pintar.
 *   3. El parseo de respuestas sin cuerpo. Un 204 no tiene cuerpo, y pedirlo tiraría
 *      un error de parseo que no significaría nada.
 *
 * Por qué importa: este archivo es lo que hace que el backend se pueda cambiar sin
 * tocar la interfaz, y lo que evita el error clásico de pantallas hooking con formas
 * distintas de manejar el mismo error.
 */

/**
 * Base de la API.
 *
 * En desarrollo, Vite corre en el 5173 y la API en el 3000, así que la URL es
 * absoluta. En producción Express sirve el frontend y la API desde el mismo origen,
 * así que alcanza con `/api` y no hay CORS.
 */
const URL_BASE = import.meta.env.VITE_API_URL ?? '/api';

/**
 * Construye la URL completa de una ruta de la API.
 *
 * @param {string} ruta ruta con el prefijo, por ejemplo '/agenda'
 * @returns {string}
 */
export function urlCompleta(ruta) {
  return `${URL_BASE}${ruta}`;
}

/**
 * Error de la API, con el código estable que el backend define.
 *
 * La UI decide qué hacer mirando `codigo`, no el texto de `mensaje`: el mensaje puede
 * cambiar de redacción sin que se rompa nada.
 */
export class ErrorApi extends Error {
  /**
   * @param {string} mensaje
   * @param {number} status
   * @param {string} codigo
   * @param {object} [detalle] mapa de campo a mensaje, para pintar bajo los inputs
   */
  constructor(mensaje, status, codigo, detalle) {
    super(mensaje);
    this.name = 'ErrorApi';
    this.status = status;
    this.codigo = codigo;
    this.detalle = detalle;
  }
}

/**
 * Traduce la respuesta del backend al formato de error del contrato.
 *
 * @param {Response} respuesta
 * @returns {Promise<ErrorApi>}
 */
async function leerError(respuesta) {
  // Se declara fuera del try para poder distinguir "el backend respondió con este
  // error" de "el cuerpo no se pudo leer", sin repetir el parseo.
  let cuerpo;

  try {
    cuerpo = await respuesta.json();
  } catch {
    // Si el cuerpo no es JSON —por ejemplo, un 502 del proxy o una página de error
    // del servidor web— `cuerpo` queda sin definir y se usa el mensaje genérico de
    // más abajo, en vez de fallar con un error de parseo.
  }

  const error = cuerpo?.error;

  return new ErrorApi(
    error?.mensaje ?? 'No se pudo completar la operación',
    respuesta.status,
    error?.codigo ?? 'ERROR_INESPERADO',
    error?.detalle,
  );
}

/**
 * Si la respuesta no es 2xx, lanza el error ya interpretado.
 *
 * @param {Response} respuesta
 * @returns {Promise<Response>}
 */
async function verificarRespuesta(respuesta) {
  if (respuesta.ok) return respuesta;

  throw await leerError(respuesta);
}

/**
 * Ejecuta la petición.
 *
 * Devuelve el sobre completo y no solo el cuerpo, porque las pantallas necesitan
 * también el status para poder mostrarlo —qué se pidió, con qué método y qué respondió
 * el servidor— sin tener que adivinarlo.
 *
 * @param {string} ruta ruta con el prefijo, por ejemplo '/agenda'
 * @param {object} [opciones]
 * @returns {Promise<{ status: number, datos: any }>}
 */
async function peticion(ruta, opciones = {}) {
  const { method = 'GET', body, headers, ...resto } = opciones;
  const url = urlCompleta(ruta);

  let respuesta;

  try {
    respuesta = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', ...headers },
      ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
      ...resto,
    });
  } catch {
    // fetch solo rechaza cuando no hubo respuesta: red caída, servidor apagado o
    // CORS bloqueando. Se distingue de un 4xx del backend, que sí tiene respuesta.
    throw new ErrorApi(
      'No se pudo conectar con el servidor. Revisa tu conexión e inténtalo de nuevo.',
      0,
      'SIN_CONEXION',
    );
  }

  await verificarRespuesta(respuesta);

  // Un 204 no tiene cuerpo, y pedirlo tiraría un error de parseo.
  const datos = respuesta.status === 204 ? null : await respuesta.json();

  return { status: respuesta.status, datos };
}

/**
 * API del cliente. Se expone con nombres de método, no URLs: las pantallas llaman
 * `modulosService.consultar(...)` y no conocen la ruta.
 *
 * Cada método resuelve con `{ status, datos }`.
 */
export const api = {
  get: (ruta, opciones) => peticion(ruta, { ...opciones, method: 'GET' }),
  post: (ruta, body, opciones) => peticion(ruta, { ...opciones, method: 'POST', body }),
  put: (ruta, body, opciones) => peticion(ruta, { ...opciones, method: 'PUT', body }),
  patch: (ruta, body, opciones) => peticion(ruta, { ...opciones, method: 'PATCH', body }),
  delete: (ruta, opciones) => peticion(ruta, { ...opciones, method: 'DELETE' }),
};

export default api;
