export const colorTokens = {
  grey: {
    0: "#fff",
    10: "f6f6f6",
    50: "#FAFAFA",
    100: "#F5F5F5",
    200: "#EEEEEE",
    300: "#E0E0E0",
    400: "#BDBDBD",
    500: "#9E9E9E",
    600: "#757575",
    700: "#616161",
    800: "#424242",
    900: "#212121",
    1000: "#111",
  },
  primary: {
    50: "#d8f3dc",
    100: "#b7e4c7",
    200: "#95d5b2",
    300: "#74c69d",
    400: "#52b788",
    500: "#40916c",
    600: "#40916c",
    700: "#2d6a4f",
    800: "#1b4332",
    900: "#081c15",
    1000: "#000",
  },
};

// Mui theme settings
export const muiTheme = (mode) => {
  return {
    palette: {
      mode,
      ...(mode === "dark"
        ? {
            primary: {
              dark: colorTokens.primary[200],
              main: colorTokens.primary[500],
              light: colorTokens.primary[800],
            },
            neutral: {
              dark: colorTokens.grey[100],
              main: colorTokens.grey[200],
              mediumMain: colorTokens.grey[300],
              medium: colorTokens.grey[400],
              light: colorTokens.grey[700],
            },
            background: {
              default: colorTokens.grey[900],
              alt: colorTokens.grey[800],
            },
          }
        : {
            primary: {
              dark: colorTokens.primary[700],
              main: colorTokens.primary[500],
              light: colorTokens.primary[50],
            },
            neutral: {
              dark: colorTokens.grey[700],
              main: colorTokens.grey[500],
              mediumMain: colorTokens.grey[400],
              medium: colorTokens.grey[300],
              light: colorTokens.grey[50],
            },
            background: {
              default: colorTokens.grey[10],
              alt: colorTokens.grey[0],
            },
          }),
    },
    typography: {
        fontFamily: ["Roboto", "san-serif"].join(","),
        fontSize: 12
    },
    h1: {
        fontFamily: ["Roboto", "san-serif"].join(","),
        fontSize: 40
    },
    h2: {
        fontFamily: ["Roboto", "san-serif"].join(","),
        fontSize: 32
    },
    h3: {
        fontFamily: ["Roboto", "san-serif"].join(","),
        fontSize: 24
    },
    h4: {
        fontFamily: ["Roboto", "san-serif"].join(","),
        fontSize: 20
    },
    h5: {
        fontFamily: ["Roboto", "san-serif"].join(","),
        fontSize: 16
    },
    h6: {
        fontFamily: ["Roboto", "san-serif"].join(","),
        fontSize: 14
    },
  };
};
