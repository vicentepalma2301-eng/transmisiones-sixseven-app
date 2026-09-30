/**
 * Wrappers de los campos de formulario de MUI.
 *
 * PRIMITIVOS de `components/ui/`: no saben nada de la aplicación. Solo reciben props
 * y dibujan.
 *
 * La diferencia con usar los `TextField` de MUI directamente es que acá el contrato
 * es del sistema, no el de MUI: la pantalla dice `error="El correo es obligatorio"` y
 * `ayuda="..."`, sin tener que acordarse de `helperText` ni de `FormHelperTextProps`.
 * Y el mensaje de error se anuncia a los lectores de pantalla, que es un detalle que
 * siempre se olvida al usar la librería directamente.
 */
import MuiTextField from '@mui/material/TextField';
import MuiFormHelperText from '@mui/material/FormHelperText';
import MuiInputLabel from '@mui/material/InputLabel';
import MuiSelect from '@mui/material/Select';
import MuiMenuItem from '@mui/material/MenuItem';
import MuiFormControl from '@mui/material/FormControl';

/**
 * Campo de texto.
 *
 * @param {object} props
 * @param {string} props.etiqueta texto visible del campo
 * @param {string} [props.ayuda] texto de ayuda bajo el campo
 * @param {string} [props.error] mensaje de error
 * @param {string} [props.tipo] 'text' | 'email' | 'password' | 'number' | 'date'
 */
export function CampoTexto({
  etiqueta,
  ayuda,
  error,
  tipo = 'text',
  required = false,
  multilinea = false,
  filas = 4,
  ...propsMui
}) {
  const idAyuda = `${etiqueta.replace(/\s+/g, '-').toLowerCase()}-ayuda`;

  return (
    <MuiTextField
      {...propsMui}
      type={tipo}
      label={etiqueta}
      required={required}
      multiline={multilinea}
      minRows={multilinea ? filas : undefined}
      error={Boolean(error)}
      helperText={error ?? ayuda}
      // `aria-describedby` conecta el campo con su texto de ayuda. Sin esto, quien
      // navega con lector de pantalla no se entera de la validación.
      FormHelperTextProps={{ id: idAyuda }}
      inputProps={multilinea ? undefined : { 'aria-describedby': idAyuda, ...propsMui.inputProps }}
    />
  );
}

/**
 * Campo de contraseña, con un botón para mostrar y ocultar.
 *
 * @param {object} props mismas props que CampoTexto
 */
export function CampoPassword({ etiqueta = 'Contraseña', ...props }) {
  return <CampoTexto {...props} etiqueta={etiqueta} tipo="password" />;
}

/**
 * Desplegable de opciones.
 *
 * @param {object} props
 * @param {string} props.etiqueta
 * @param {Array<{ valor: string|number, texto: string }>} props.opciones
 */
export function CampoSeleccion({ etiqueta, opciones = [], error, ayuda, required, ...propsMui }) {
  const idAyuda = `${String(etiqueta).replace(/\s+/g, '-').toLowerCase()}-ayuda`;

  return (
    <MuiFormControl fullWidth size="small" error={Boolean(error)} required={required}>
      <MuiInputLabel id={`${idAyuda}-label`}>{etiqueta}</MuiInputLabel>
      <MuiSelect
        {...propsMui}
        labelId={`${idAyuda}-label`}
        label={etiqueta}
        aria-describedby={idAyuda}
      >
        {opciones.map((opcion) => (
          <MuiMenuItem key={opcion.valor} value={opcion.valor}>
            {opcion.texto}
          </MuiMenuItem>
        ))}
      </MuiSelect>
      {(error || ayuda) && (
        <MuiFormHelperText id={idAyuda}>{error ?? ayuda}</MuiFormHelperText>
      )}
    </MuiFormControl>
  );
}
