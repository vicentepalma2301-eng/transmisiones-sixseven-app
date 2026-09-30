/**
 * Wrappers de las piezas de interfaz: tarjeta, tabla, estado vacío, carga y aviso.
 *
 * Todos son primitivos de `components/ui/`: no saben nada de la aplicación, solo
 * reciben props y dibujan. Si alguno necesitara importar de `services/` o de
 * `context/`, habría que bajarlo a `components/`.
 */
import MuiPaper from '@mui/material/Paper';
import MuiTable from '@mui/material/Table';
import MuiTableBody from '@mui/material/TableBody';
import MuiTableCell from '@mui/material/TableCell';
import MuiTableContainer from '@mui/material/TableContainer';
import MuiTableHead from '@mui/material/TableHead';
import MuiTableRow from '@mui/material/TableRow';
import MuiTypography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MuiAlert from '@mui/material/Alert';
import MuiCircularProgress from '@mui/material/CircularProgress';
import MuiSkeleton from '@mui/material/Skeleton';

/**
 * Contenedor de contenido de una pantalla.
 *
 * @param {object} props
 * @param {string} props.titulo
 * @param {React.ReactNode} [props.acciones] botones a la derecha del título
 * @param {string} [props.subtitulo]
 */
export function PaginaContenedor({ titulo, subtitulo, acciones, children }) {
  return (
    <Box sx={{ p: { xs: 2, md: 3 }, maxWidth: 1440, mx: 'auto' }}>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
          mb: 3,
        }}
      >
        <Box>
          {/* `component="h1"` para que sea el título real de la página y no un
              `div` con estilo de título: los lectores de pantalla y el historial del
              navegador dependen de esto. */}
          <MuiTypography variant="h2" component="h1">
            {titulo}
          </MuiTypography>
          {subtitulo && (
            <MuiTypography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              {subtitulo}
            </MuiTypography>
          )}
        </Box>
        {acciones && <Box sx={{ display: 'flex', gap: 1 }}>{acciones}</Box>}
      </Box>

      {children}
    </Box>
  );
}

/**
 * Tarjeta de contenido.
 *
 * @param {object} props
 * @param {string} [props.titulo]
 */
export function Tarjeta({ titulo, acciones, children, sx, ...propsMui }) {
  return (
    <MuiPaper
      {...propsMui}
      elevation={0}
      variant="outlined"
      sx={{ p: 2.5, borderRadius: 2, ...sx }}
    >
      {titulo && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <MuiTypography variant="h6" component="h2">
            {titulo}
          </MuiTypography>
          {acciones}
        </Box>
      )}
      {children}
    </MuiPaper>
  );
}

/**
 * Tabla de datos.
 *
 * @param {object} props
 * @param {Array<{ clave: string, titulo: string, alineacion?: string, render?: Function }>} props.columnas
 * @param {Array<object>} props.filas
 * @param {Function} [props.alHacerClicFila]
 */
export function TablaDatos({ columnas = [], filas = [], alHacerClicFila, cargando = false }) {
  if (cargando) return <TablaCargando columnas={columnas} />;
  if (filas.length === 0) return <EstadoVacio />;

  return (
    <MuiTableContainer>
      <MuiTable size="small" aria-label="Tabla de datos">
        <MuiTableHead>
          <MuiTableRow>
            {columnas.map((columna) => (
              <MuiTableCell key={columna.clave} align={columna.alineacion ?? 'left'}>
                {columna.titulo}
              </MuiTableCell>
            ))}
          </MuiTableRow>
        </MuiTableHead>
        <MuiTableBody>
          {filas.map((fila, indice) => (
            <MuiTableRow
              key={fila.id ?? indice}
              // Con `component="div"` la fila puede ser un elemento con manejadores de
              // clic y navegación sin que React advierta por usar `<tr>` con props que
              // no existen en el DOM.
              component="div"
              onClick={alHacerClicFila ? () => alHacerClicFila(fila) : undefined}
              onKeyDown={
                alHacerClicFila
                  ? (evento) => {
                      if (evento.key === 'Enter' || evento.key === ' ') {
                        evento.preventDefault();
                        alHacerClicFila(fila);
                      }
                    }
                  : undefined
              }
              hover={Boolean(alHacerClicFila)}
              tabIndex={alHacerClicFila ? 0 : undefined}
              sx={{ cursor: alHacerClicFila ? 'pointer' : 'default' }}
            >
              {columnas.map((columna) => (
                <MuiTableCell
                  key={columna.clave}
                  component="div"
                  align={columna.alineacion ?? 'left'}
                >
                  {/* Si la columna define `render`, manda la columna; si no, se muestra
                      el dato de la fila con la clave de la columna. */}
                  {columna.render ? columna.render(fila) : fila[columna.clave]}
                </MuiTableCell>
              ))}
            </MuiTableRow>
          ))}
        </MuiTableBody>
      </MuiTable>
    </MuiTableContainer>
  );
}

/** Tabla con el esqueleto de carga. */
function TablaCargando({ columnas = [] }) {
  return (
    <Box aria-busy="true" aria-live="polite">
      {[...Array(5)].map((_, indiceFila) => (
        <Box key={indiceFila} sx={{ display: 'flex', gap: 2, mb: 1 }}>
          {columnas.map((columna) => (
            <MuiSkeleton
              key={columna.clave}
              variant="rounded"
              height={32}
              width={columna.ancho ?? '100%'}
            />
          ))}
        </Box>
      ))}
    </Box>
  );
}

/** Estado vacío de una tabla o listado. */
export function EstadoVacio({ titulo = 'No hay registros', detalle, accion }) {
  return (
    <Box
      sx={{
        py: 6,
        textAlign: 'center',
        color: 'text.secondary',
      }}
    >
      <MuiTypography variant="body1" sx={{ fontWeight: 500 }}>
        {titulo}
      </MuiTypography>
      {detalle && (
        <MuiTypography variant="body2" sx={{ mt: 0.5 }}>
          {detalle}
        </MuiTypography>
      )}
      {accion && <Box sx={{ mt: 2 }}>{accion}</Box>}
    </Box>
  );
}

/**
 * Pantalla de carga completa, para cuando todavía no hay nada que pintar.
 *
 * Es la que se usa como `fallback` de `Suspense` y mientras se verifica la sesión.
 * La diferencia con `Cargando` es que esta ocupa toda la pantalla y centra el
 * indicador: sin eso, el spinner queda pegado arriba mientras baja el código de la
 * pantalla, que se ve como una página a medio cargar.
 */
export function PantallaCarga({ texto = 'Cargando…' }) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        p: 3,
      }}
      role="status"
      aria-live="polite"
    >
      <MuiCircularProgress />
      <MuiTypography variant="body2" color="text.secondary">
        {texto}
      </MuiTypography>
    </Box>
  );
}

/**
 * Indicador de carga para el primer render de una pantalla.

 *
 * Un esqueleto en vez de un spinner a pantalla completa: comunica mejor qué se está
 * cargando y no interrumpe la lectura.
 */
export function Cargando({ texto = 'Cargando…' }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        py: 8,
      }}
      role="status"
      aria-live="polite"
    >
      <MuiCircularProgress />
      <MuiTypography variant="body2" color="text.secondary">
        {texto}
      </MuiTypography>
    </Box>
  );
}

/**
 * Aviso de error, de éxito o de advertencia.
 *
 * @param {object} props
 * @param {'error'|'success'|'warning'|'info'} props.tipo
 * @param {Function} [props.alCerrar]
 */
export function Aviso({ tipo = 'info', titulo, children, alCerrar }) {
  return (
    <MuiAlert
      severity={tipo}
      onClose={alCerrar}
      // `variant="filled"` y no el outlined por defecto: los colores tienen que
      // alcanzar contraste AA sobre su fondo, y el relleno lo garantiza.
      variant="filled"
      sx={{ mb: 2 }}
    >
      {titulo && <strong>{titulo}: </strong>}
      {children}
    </MuiAlert>
  );
}
