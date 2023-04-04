import '@mui/material/styles';

declare module '@mui/material/styles/createPalette' {
  interface Palette {
    custom?: any;
  }
  interface PaletteOptions {
    custom?: any;
  }
}
