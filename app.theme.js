import { DefaultTheme } from 'react-native-paper';

const appTheme = {
  ...DefaultTheme,
  // here you can get the access tochange the default theme
  // https://github.com/callstack/react-native-paper/blob/master/src/styles/DefaultTheme.tsx

  // example
  colors: {
    ...DefaultTheme.colors,
    primary: '#233540',
    accent: '#F28B66',
    background: '#F2F2F2'
    // secondary: '#9BBF95'
    // yellow: '#D9B64E'
  }
};

export default appTheme;
