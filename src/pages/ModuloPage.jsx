/**
 * Pantalla de un módulo.
 *
 * Es una sola para todos los módulos, y no una por módulo, porque hacen exactamente
 * lo mismo: pedir los datos de su endpoint y avisar que la pantalla todavía no está
 * construida. La diferencia entre una y otra es solo el texto, y eso llega por props
 * (`modulo`): la pantalla no sabe qué módulo es, se lo pintan.
 *
 * Cada apertura dispara el `GET` del módulo y deja registro de la petición —método,
 * URL, status y respuesta— en la consola. La pantalla no muestra ni la URL ni el
 * resultado: como el módulo todavía no existe en el backend, lo que devuelve es un
 * error, y un error no es la información útil acá.
 */
import { useCallback, useEffect, useRef, useState } from 'react';

import { Boton, PaginaContenedor, Tarjeta, TextoSecundario } from '@/components/ui';
import { modulosService, urlDeModulo } from '@/services/modulosService.js';

/**
 * @param {object} props
 * @param {{ clave: string, texto: string, endpoint: string, descripcion?: string }} props.modulo
 */
export default function ModuloPage({ modulo }) {
  const [consultando, setConsultando] = useState(false);

  /**
   * En desarrollo, `StrictMode` monta el componente dos veces seguidas a propósito, y
   * eso dispararía el GET dos veces. La bandera corta solo la repetición del montaje
   * artificial: el botón de reintentar no la consulta, así que ahí sí vuelve a pedir.
   */
  const yaPidioAlMontar = useRef(false);

  const pedir = useCallback(async () => {
    const url = urlDeModulo(modulo);

    setConsultando(true);
    console.log('[API] GET', url);

    try {
      const { status, datos } = await modulosService.consultar(modulo);
      console.log(`[API] GET ${url} → ${status}`, datos);
    } catch (err) {
      console.warn(`[API] GET ${url} → ${err.status} ${err.codigo}: ${err.mensaje}`);
    } finally {
      setConsultando(false);
    }
  }, [modulo]);

  useEffect(() => {
    if (yaPidioAlMontar.current) return;
    yaPidioAlMontar.current = true;
    pedir();
  }, [pedir]);

  return (
    <PaginaContenedor
      titulo={modulo.texto}
      subtitulo={`Módulo ${modulo.texto} - en construcción`}
      acciones={
        <Boton
          variante="secundario"
          onClick={pedir}
          cargando={consultando}
          textoCargando="Consultando…"
        >
          Consultar de nuevo
        </Boton>
      }
    >
      <Tarjeta titulo="Esta pantalla todavía no está implementada">
        <TextoSecundario>
          El módulo {modulo.texto} se construye en una etapa posterior del plan de
          trabajo. Cuando se implemente, aparecerá aquí.
        </TextoSecundario>
      </Tarjeta>
    </PaginaContenedor>
  );
}
