/**
 * Íconos de la aplicación.
 *
 * Las pantallas importan de acá y nunca de `@mui/icons-material` directamente. Con
 * esta barrera, cambiar de librería de íconos es editar un archivo, y no una
 * importación en cada pantalla.
 *
 * Cada icono tiene nombre semántico, no el nombre de MUI: las pantallas dicen
 * `IconoCalendario` y no `CalendarMonthIcon`, así que no dependen de cómo se llame
 * dentro de la librería.
 */

// Navegación
export { default as IconoTablero } from '@mui/icons-material/Dashboard';
export { default as IconoAgenda } from '@mui/icons-material/CalendarMonth';
export { default as IconoPersonal } from '@mui/icons-material/People';
export { default as IconoInventario } from '@mui/icons-material/Inventory2';
export { default as IconoFinanciero } from '@mui/icons-material/AccountBalance';
export { default as IconoAuspicios } from '@mui/icons-material/Campaign';
export { default as IconoUsuarios } from '@mui/icons-material/Group';

// Acciones
export { default as IconoGuardar } from '@mui/icons-material/Save';
export { default as IconoBuscar } from '@mui/icons-material/Search';
export { default as IconoAgregar } from '@mui/icons-material/Add';
export { default as IconoEditar } from '@mui/icons-material/Edit';
export { default as IconoVer } from '@mui/icons-material/Visibility';
export { default as IconoVolver } from '@mui/icons-material/ArrowBack';
export { default as IconoEliminar } from '@mui/icons-material/Delete';
