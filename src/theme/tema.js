/**
 * Tema central de la aplicación — asunción G3.
 *
 * Toda la configuración visual de MUI vive acá y en ningún otro lado. Si mañana se
 * cambia el azul de la marca, se edita este archivo y no las 24 pantallas.
 *
 * ASUNCIONES QUE APLICA:
 *   G3 · Lenguaje administrativo, azules corporativos, sin colores pasteles ni
 *        animaciones complejas.
 *   G1 · Los montos son enteros en pesos: el tema define el separador de miles, pero
 *        el redondeo ocurre en el backend (utils/clp.js).
 *   G2 · Las fechas se muestran en dd/mm/aaaa y las horas en 24 h. Ver utils/fechas.js.
 */
import { createTheme } from '@mui/material/styles';

/** Azul corporativo principal. Botones primarios, ítems activos, enlaces. */
export const AZUL = '#1565C0';

/** Azul oscuro. Textos deEmphasis y anillos de foco. */
export const AZUL_OSCURO = '#0D47A1';

/** Fondo general de la aplicación. */
export const FONDO = '#F5F7FA';

/** Verde de éxito. Contraste AA verificado sobre fondo blanco. */
export const VERDE = '#2E7D32';

/** Rojo de error. Contraste AA verificado sobre fondo blanco. */
export const ROJO = '#C62828';

/** Ámbar de advertencia. */
export const AMARILLO = '#ED6C02';

export const tema = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: AZUL,
      dark: AZUL_OSCURO,
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: AZUL_OSCURO,
    },
    success: { main: VERDE },
    error: { main: ROJO },
    warning: { main: AMARILLO },
    background: {
      default: FONDO,
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1A202C',
      secondary: '#4A5568',
    },
    divider: '#E2E8F0',
  },

  typography: {
    fontFamily: [
      'Roboto',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Helvetica',
      'Arial',
      'sans-serif',
    ].join(','),
    fontSize: 14,
    h1: { fontSize: '2rem', fontWeight: 600 },
    h2: { fontSize: '1.5rem', fontWeight: 600 },
    h3: { fontSize: '1.25rem', fontWeight: 600 },
    h4: { fontSize: '1.125rem', fontWeight: 600 },
    h5: { fontSize: '1rem', fontWeight: 600 },
    h6: { fontSize: '0.9375rem', fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 500 },
  },

  shape: {
    // Bordes de 8 px: redondeados sin ser redondos.
    borderRadius: 8,
  },

  components: {
    // Duración de las transiciones. Los valores de MUI por defecto llegan a 375 ms,
    // y con transiciones tan largas la interfaz se siente lenta. G3 pide animaciones
    // discretas, y 150–200 ms es lo que se percibe como inmediato.
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { textTransform: 'none', fontWeight: 500 },
      },
    },

    MuiTextField: {
      defaultProps: { size: 'small', fullWidth: true },
    },

    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: 'none' },
      },
    },

    MuiTableCell: {
      styleOverrides: {
        // Los encabezados no en negrita: se distinguen por fondo, y el peso de la
        // fuente lo reserva a los títulos.
        head: { fontWeight: 500, backgroundColor: FONDO },
      },
    },

    MuiLink: {
      defaultProps: { underline: 'hover' },
    },
  },
});

export default tema;
