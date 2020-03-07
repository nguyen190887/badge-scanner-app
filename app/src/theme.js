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
    tertiary: {
      main: '#C3CF0E',
      light: '#E6D305',
      dark: '#4A4F02'
    },
    error: {
      main: '#8F241F',
    },
    background: {
      default: '#fff',
    },
    success: {
      main: '#4caf50'
    },
    warning: {
      main: '#ff9800'
    },
    info: {
      main: '#fff'
    },
  },
  zIndex: {
    drawer: 1000
  },
  overrides: {
    MUIDataTable: {
      responsiveScrollMaxHeight: {
        maxHeight: '80%'
      },
      paper: {
        height: '90vh'
      },
    }
  }
});

export default theme;
