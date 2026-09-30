/**
 * Wrapper del botón de MUI.
 *
 * PRIMITIVO de `components/ui/`: no sabe nada de la aplicación. Solo recibe props y
 * dibuja. Si este archivo importara algo de `services/` o de `context/`, no sería un
 * primitivo — la regla de la ayudantía 6.
 *
 * Por qué existe el wrapper y no usar `<Button>` de MUI en las pantallas: cambiar de
 * librería sería abrir 24 pantallas en vez de una. Además, todos los botones del
 * sistema quedan consistentes sin que nadie tenga que acordarse de la variante.
 *
 * PROPS ABAJO, EVENTOS ARRIBA: el componente no decide si algo está cargando, se lo
 * dice la pantalla mediante `cargando`. Esa inversión es lo que lo mantiene
 * reutilizable.
 */
import MuiButton from '@mui/material/Button';

export default function Boton({
  children,
  variante = 'primario',
  tamano = 'mediano',
  cargando = false,
  textoCargando = 'Guardando…',
  deshabilitado = false,
  inicioIcono,
  finIcono,
  sx,
  ...propsMui
}) {
  // Traduce el vocabulario propio del sistema al de MUI, para que las pantallas no
  // tengan que recordar cómo se llama cada variante.
  const variantes = {
    primario: { variant: 'contained', color: 'primary' },
    secundario: { variant: 'outlined', color: 'primary' },
    texto: { variant: 'text', color: 'primary' },
    peligro: { variant: 'contained', color: 'error' },
    peligroSuave: { variant: 'outlined', color: 'error' },
  };

  const tamanos = {
    pequeno: 'small',
    mediano: 'medium',
    grande: 'large',
  };

  const { variant, color } = variantes[variante] ?? variantes.primario;

  return (
    <MuiButton
      {...propsMui}
      variant={variant}
      color={color}
      size={tamanos[tamano] ?? tamanos.mediano}
      // Se deshabilita también mientras carga, no solo cuando viene deshabilitado:
      // un doble clic en «Guardar» crearía dos registros.
      disabled={deshabilitado || cargando}
      startIcon={inicioIcono}
      endIcon={finIcono}
      sx={{ minWidth: cargando ? 96 : undefined, ...sx }}
    >
      {cargando ? textoCargando : children}
    </MuiButton>
  );
}
