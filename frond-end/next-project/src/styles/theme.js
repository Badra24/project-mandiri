import { extendTheme } from "@chakra-ui/react";


// const fontWeight = {
//   normal: 300,
//   Medium: 600,
//   bold: 700,
// };
const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

// 3. extend the theme
const theme = extendTheme({ config });

// const theme = extendTheme({ fontWeight });

export default theme;

