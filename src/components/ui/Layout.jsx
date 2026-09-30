/**
 * Wrappers de los elementos de interfaz del layout y navegación.
 *
 * PRIMITIVOS: no saben nada de la aplicación. Solo reciben props y dibujan.
 * Todos los componentes del sistema que usan MUI lo hacen a través de estos
 * wrappers y los que están en `components/ui/`.
 */
import { Link as RouterLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const ANCHO_SIDEBAR = 260;

/**
 * Barra superior fija con la marca del sistema.
 *
 * @param {object} props
 * @param {string} props.marca nombre visible del sistema
 */
export function BarraSuperior({ marca = 'Transmisiones' }) {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: 'background.paper',
        color: 'text.primary',
        borderBottom: 1,
        borderColor: 'divider',
        boxShadow: 'none',
      }}
    >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {marca}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

/**
 * Un ítem del menú lateral.
 *
 * @param {object} props
 * @param {string} props.a ruta del router
 * @param {string} props.texto
 * @param {React.ComponentType} [props.icono]
 */
export function ItemMenu({ a, texto, icono: Icono }) {
  return (
    <ListItem disablePadding>
      <ListItemButton component={RouterLink} to={a}>
        {Icono && (
          <ListItemIcon>
            <Icono />
          </ListItemIcon>
        )}
        <ListItemText primary={texto} />
      </ListItemButton>
    </ListItem>
  );
}

/**
 * Menú lateral fijo con los ítems que se le pasen.
 *
 * Se deja genérico a propósito: la lista la arma el layout desde el registro de
 * módulos, así la navegación no escribe las rutas a mano.
 *
 * @param {object} props
 * @param {Array<{ a: string, texto: string, icono?: React.ComponentType }>} props.items
 */
export function MenuLateral({ items = [], ancho = ANCHO_SIDEBAR }) {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: ancho,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: ancho,
          boxSizing: 'border-box',
          borderRight: 1,
          borderColor: 'divider',
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto', py: 1 }}>
        <List>
          {items.length === 0 ? (
            <ListItem>
              <ListItemText
                primary="Sin módulos"
                secondary="No hay módulos cargados en la aplicación."
                slotProps={{
                  // En MUI 6+ la configuración de los slots internos se pasa por
                  // `slotProps`, no por `primaryTypographyProps` / `secondaryTypographyProps`,
                  // que se eliminaron. Son la misma idea con el nombre nuevo.
                  primary: { variant: 'subtitle2' },
                  secondary: { variant: 'body2' },
                }}
              />
            </ListItem>
          ) : (
            items.map((item) => (
              <ItemMenu key={item.a} a={item.a} texto={item.texto} icono={item.icono} />
            ))
          )}
        </List>
      </Box>
    </Drawer>
  );
}

/**
 * Contenedor principal: barra + menú lateral + contenido.
 *
 * @param {object} props
 * @param {string} [props.marca]
 * @param {Array} [props.items] ítems del menú lateral
 * @param {React.ReactNode} [props.children] contenido de la página
 */
export function LayoutApp({ marca, items, children }) {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <BarraSuperior marca={marca} />
      <MenuLateral items={items} />
      <Box component="main" sx={{ flexGrow: 1, minWidth: 0 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
