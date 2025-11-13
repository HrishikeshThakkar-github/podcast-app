import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      primaryDark: string;
      secondary: string;
      background: string;
      surface: string;
      border: string;
      text: {
        primary: string;
        secondary: string;
        disabled: string;
        inverse: string;
      };
      error: string;
    };
    spacing: (multiplier: number) => string;
    borderRadius: {
      sm: string;
      md: string;
      lg: string;
    };
  }
}
