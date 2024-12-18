import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    logoFillColor?: string;
    bodyColor?: string;
    bodyBackgroundColor?: string;
  }
}
