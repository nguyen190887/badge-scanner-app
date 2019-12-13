import { deepPurple, teal, red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: deepPurple[700],
      light: deepPurple[500],
      dark: deepPurple[900],
    },
    secondary: {
      main: teal.A400,
      light: teal.A200,
      dark: teal.A700
    },
    error: {
      main: red[800],
    },
    background: {
      default: '#fff',
    },
  },
});

export default theme;
