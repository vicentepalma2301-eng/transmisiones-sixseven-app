/**
 * Wrappers de estructura y tipografía.
 *
 * PRIMITIVOS: no saben nada de la aplicación. Solo reciben props y dibujan.
 *
 * Lo que aporta cada uno:
 *   Fila/Columna — usan el `gap` del sistema de espacios en vez de `margin`, y los
 *                 hijos no llevan anchos raros: así los componentes no se rompen
 *                 cuando el contenido es más largo de lo esperado.
 *   Rejilla — una grilla responsive con el mismo comportamiento en todas partes.
 *   Pila      — agrupa cosas verticalmente.
 */
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

/** Fila horizontal con separación uniforme. */
export function Fila({ children, gap = 2, alineado = 'center', justificado = 'flex-start', envolver = false, ...props }) {
  return (
    <Stack
      direction="row"
      spacing={gap}
      alignItems={alineado}
      justifyContent={justificado}
      useFlexGap
      flexWrap={envolver ? 'wrap' : 'nowrap'}
      {...props}
    >
      {children}
    </Stack>
  );
}

/** Columna vertical con separación uniforme. */
export function Columna({ children, gap = 2, alineado = 'stretch', ...props }) {
  return (
    <Stack direction="column" spacing={gap} alignItems={alineado} {...props}>
      {children}
    </Stack>
  );
}

/**
 * Rejilla responsive.
 *
 * @param {object} props
 * @param {number} props.columnas cuántas columnas en pantalla grande
 */
export function Rejilla({ children, columnas = 4, gap = 2, ...props }) {
  return (
    <Box
      sx={{
        display: 'grid',
        gap,
        gridTemplateColumns: {
          xs: '1fr',
          sm: `repeat(${Math.min(columnas, 2)}, 1fr)`,
          lg: `repeat(${columnas}, 1fr)`,
        },
      }}
      {...props}
    >
      {children}
    </Box>
  );
}

/** Título principal de la página. `component="h1"` para que sea el encabezado real. */
export function Titulo({ children, ...props }) {
  return (
    <Typography variant="h2" component="h1" {...props}>
      {children}
    </Typography>
  );
}

/** Título de sección. */
export function Subtitulo({ children, ...props }) {
  return (
    <Typography variant="h6" component="h2" {...props}>
      {children}
    </Typography>
  );
}

/** Texto de apoyo bajo un título. */
export function TextoSecundario({ children, ...props }) {
  return (
    <Typography variant="body2" color="text.secondary" {...props}>
      {children}
    </Typography>
  );
}

/** Texto de tamaño chico, para notas al pie. */
export function TextoChico({ children, ...props }) {
  return (
    <Typography variant="caption" color="text.secondary" {...props}>
      {children}
    </Typography>
  );
}
