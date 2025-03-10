import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#f79400',
      dark: '#d87a00',
      main: '#f79400',
    },
    secondary: {
      light: '#3365ac',
      main: '#0e1826',
    },
    tertiary: {
      light: '#cfcfcf',
      dark: '#aeaeae',
    },
  },
});

export default theme;
