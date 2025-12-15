/**
 * Componente Principal da Aplicação CraftBeerPi 5
 * 
 * Este componente gerencia:
 * - Layout principal (AppBar, Drawer, Content)
 * - Roteamento usando configuração centralizada
 * - Navegação e menu lateral
 * 
 * Para adicionar novas rotas, edite src/config/routes.js
 */

import { Container, AppBar, Badge, CssBaseline, Drawer, IconButton, Toolbar, Typography, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useTheme } from '@mui/material/styles';
import React, { useState } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Menu from "./components/util/Menu";
import PrivateRoute from "./components/util/PrivateRoute";
import logo from "./images/cbpi_no_border.png";
import { routes } from "./config/routes";

// Largura do drawer (menu lateral)
const drawerWidth = 280;

/**
 * Estilos do componente usando Material-UI makeStyles
 */
// Converted to theme + sx usage — see runtime constants below

/**
 * Componente principal da aplicação
 */
const CraftBeerPiApp = () => {
  const theme = useTheme();
  const rootSx = { display: 'flex', minHeight: '100vh', bgcolor: theme.palette.background.default };
  const toolbarSx = { pr: '24px' };
  const toolbarIconSx = { display: 'flex', alignItems: 'center', justifyContent: 'flex-end', p: '0 8px', ...theme.mixins.toolbar };
  const appBarSx = {
    zIndex: theme.zIndex.drawer + 1,
    bgcolor: theme.palette.mode === 'dark' ? theme.palette.primary.dark : theme.palette.primary.main,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    boxShadow: theme.shadows[4],
  };
  const appBarShiftSx = {
    ml: `${drawerWidth}px`,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  };
  const menuButtonSx = { mr: 36, color: 'inherit' };
  const titleSx = { flexGrow: 1, display: 'flex', alignItems: 'center', flexDirection: 'row' };
  const logoSx = { mr: 1.5, height: 32, width: 'auto' };
  const drawerPaperSx = {
    position: 'relative', whiteSpace: 'nowrap', width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    bgcolor: theme.palette.background.paper,
    borderRight: `1px solid ${theme.palette.divider}`,
  };
  const drawerPaperCloseSx = {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: { width: theme.spacing(9) },
    bgcolor: theme.palette.background.paper,
  };
  const contentSx = { flexGrow: 1, height: '100vh', overflow: 'auto', bgcolor: theme.palette.background.default };
  const containerSx = { pt: 3, pb: 4, pl: 3, pr: 3 };
  // Inicia com o drawer aberto para melhor UX
  const [drawerOpen, setDrawerOpen] = useState(true);

  /**
   * Abre o drawer (menu lateral)
   */
  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  /**
   * Fecha o drawer (menu lateral)
   */
  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <Box sx={rootSx}>
      <CssBaseline />
      <Router>
        <Switch>
          <PrivateRoute path="/">
            {/* AppBar - Barra superior */}
            <AppBar 
              position="absolute" 
              sx={{ ...(appBarSx), ...(drawerOpen ? appBarShiftSx : {}) }}
            >
              <Toolbar sx={toolbarSx}>
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  sx={menuButtonSx}
                >
                  <MenuIcon />
                </IconButton>
                <Box sx={titleSx}>
                  <Box component="img" src={logo} alt="CraftBeerPi Logo" sx={logoSx} />
                  <Typography component="h1" variant="h5" color="inherit" noWrap>
                    CraftBeerPi 5.0
                  </Typography>
                </Box>
                <IconButton color="inherit">
                  <Badge badgeContent={0} color="secondary">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </Toolbar>
            </AppBar>

            {/* Drawer - Menu lateral */}
            <Drawer
              variant="persistent"
              open={drawerOpen}
              onClose={handleDrawerClose}
              sx={{ '& .MuiDrawer-paper': drawerOpen ? drawerPaperSx : drawerPaperCloseSx }}
            >
              <Box sx={toolbarIconSx}>
                <IconButton onClick={handleDrawerClose}>
                  <MenuIcon />
                </IconButton>
              </Box>
              <Menu onClose={handleDrawerClose} />
            </Drawer>

            {/* Conteúdo principal */}
            <Box component="main" sx={contentSx}>
              <Box sx={theme.mixins.toolbar} />
              <Container maxWidth={false} sx={containerSx}>
                {/* Renderiza todas as rotas da configuração centralizada */}
                <Switch>
                  {routes.map((route, index) => {
                    // Valida se a rota tem componente
                    if (!route.component) {
                      console.warn(`App: Rota sem componente no índice ${index}:`, route);
                      return null;
                    }
                    return (
                      <Route
                        key={route.path || `route-${index}`}
                        exact={route.exact !== false}
                        path={route.path}
                        component={route.component}
                      />
                    );
                  })}
                </Switch>
              </Container>
            </Box>
          </PrivateRoute>
        </Switch>
      </Router>
    </Box>
  );
};

export default CraftBeerPiApp;
