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

import { Container } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Badge from "@material-ui/core/Badge";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
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
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: theme.palette.background.default,
  },
  toolbar: {
    paddingRight: 24, // Mantém padding direito quando drawer está fechado
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#1976d2',
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    boxShadow: theme.shadows[4],
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
    color: 'inherit',
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  logo: {
    marginRight: 12,
    height: 32,
    width: "auto",
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor: theme.palette.mode === 'dark' ? '#1e1e1e' : '#f5f5f5',
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
    backgroundColor: theme.palette.background.default,
  },
  container: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(4),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
  snack: {
    position: "absolute",
    bottom: 10,
    right: 30,
    "& > * + *": {
      marginTop: theme.spacing(1),
    },
  },
}));

/**
 * Componente principal da aplicação
 */
const CraftBeerPiApp = () => {
  const classes = useStyles();
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
    <div className={classes.root}>
      <CssBaseline />
      <Router>
        <Switch>
          <PrivateRoute path="/">
            {/* AppBar - Barra superior */}
            <AppBar 
              position="absolute" 
              className={`${classes.appBar} ${drawerOpen ? classes.appBarShift : ''}`}
            >
              <Toolbar className={classes.toolbar}>
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  className={classes.menuButton}
                >
                  <MenuIcon />
                </IconButton>
                <div className={classes.title}>
                  <img 
                    src={logo} 
                    alt="CraftBeerPi Logo" 
                    className={classes.logo}
                  />
                  <Typography component="h1" variant="h5" color="inherit" noWrap>
                    CraftBeerPi 5.0
                  </Typography>
                </div>
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
              classes={{
                paper: drawerOpen ? classes.drawerPaper : classes.drawerPaperClose,
              }}
            >
              <div className={classes.toolbarIcon}>
                <IconButton onClick={handleDrawerClose}>
                  <MenuIcon />
                </IconButton>
              </div>
              <Menu onClose={handleDrawerClose} />
            </Drawer>

            {/* Conteúdo principal */}
            <main className={classes.content}>
              <div className={classes.appBarSpacer} />
              <Container maxWidth={false} className={classes.container}>
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
            </main>
          </PrivateRoute>
        </Switch>
      </Router>
    </div>
  );
};

export default CraftBeerPiApp;
