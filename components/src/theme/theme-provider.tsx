import CssBaseline from '@mui/material/CssBaseline';
import { Experimental_CssVarsProvider as CssVarsProvider, ThemeOptions, experimental_extendTheme as extendTheme } from '@mui/material/styles';
import { colorSchemes } from './core/palette';
import { customShadows } from './core/custom-shadows';
import { shadows } from './core/shadows';
import { components } from './core/components';
import { typography } from './core/typography';

export function ThemeProvider({ children }: { children: any }) {
  const theme = extendTheme({
    colorSchemes,
    shadows: shadows('light'),
    customShadows: customShadows('light'),
    direction: 'ltr',
    shape: { borderRadius: 8 },
    components,
    typography: {
      ...typography,
      fontFamily: '"Public Sans",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
    },
    cssVarPrefix: '',
  });

  return (
    <CssVarsProvider 
      theme={theme}
      defaultMode="light"
      enableColorScheme
    >
      <CssBaseline />
      {children}
    </CssVarsProvider>
  );
}
