import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
  // breakpoints: {
  //   keys: ["xs", "sm", "md", "lg", "xl", "xxl", "x3l"],
  //   values: {
  //     sm: 360,
  //     md: 564,
  //     lg: 768,
  //     xl: 1024,
  //     xxl: 1280,
  //     x3l: 1920
  //   }
  // },
  palette: {
    primary: {
      main: '#104D82',
      light: '#5797CF',
      dark: '#092F4F',//#011D36
    },
    secondary: {
      main: '#0A8F86',
      light: '#0FDBCE',
      dark: '#065C56'
    },
    error: {
      main: '#8F241F',
    },
    background: {
      default: '#fff',
    },
  },
});

export default theme;
