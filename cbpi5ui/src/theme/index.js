import React, { createContext, useContext, useMemo, useState } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';

const ThemeModeContext = createContext({ mode: 'dark', toggleMode: () => {} });

export const useThemeMode = () => useContext(ThemeModeContext);

export const CustomThemeProvider = ({ children, initialMode = 'dark' }) => {
  const [mode, setMode] = useState(initialMode);
  const toggleMode = () => setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: '#64cf00ff' },
          secondary: { main: '#ff4081' },
          success: { main: '#4caf50' },
          warning: { main: '#ff9800' },
          info: { main: '#29b6f6' },
          error: { main: '#f44336' },
          background: {
            default: mode === 'dark' ? '#121212' : '#fafafa',
            paper: mode === 'dark' ? '#1e1e1e' : '#ffffff',
          },
          text: {
            primary: mode === 'dark' ? '#ffffff' : '#111827',
            secondary: mode === 'dark' ? '#bdbdbd' : '#6b7280',
          },
        },
        typography: {
          fontFamily: ['Advent Pro', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'].join(','),
        },
      }),
    [mode]
  );

  return (
    <ThemeModeContext.Provider value={{ mode, toggleMode }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles
          styles={{
            ':root': {
              '--cbpi-primary': theme.palette.primary.main,
              '--cbpi-secondary': theme.palette.secondary.main,
              '--cbpi-success': theme.palette.success.main,
              '--cbpi-warning': theme.palette.warning.main,
              '--cbpi-info': theme.palette.info.main,
              '--cbpi-error': theme.palette.error.main,
              '--cbpi-bg': theme.palette.background.default,
              '--cbpi-paper': theme.palette.background.paper,
              '--cbpi-text': theme.palette.text.primary,
              '--cbpi-text-muted': theme.palette.text.secondary,
            },
          }}
        />
        {children}
      </MuiThemeProvider>
    </ThemeModeContext.Provider>
  );
};

export default CustomThemeProvider;
