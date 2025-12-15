import React, { createContext, useContext, useMemo, useState } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

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
          primary: { main: '#1976d2' },
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
        {children}
      </MuiThemeProvider>
    </ThemeModeContext.Provider>
  );
};

export default CustomThemeProvider;
