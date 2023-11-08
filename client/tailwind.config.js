/** @type {import('tailwindcss').Config} */

const colorTokens = {
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
    600: "#309a4f",
    700: "#2d6a4f",
    800: "#1b4332",
    900: "#081c15",
    1000: "#000",
  },
};

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        darkPrimary: {
          0: colorTokens.primary[200],
          500: colorTokens.primary[500],
          900: colorTokens.primary[800],
        },
        darkNeutral: {
          0: colorTokens.grey[100],
          200: colorTokens.grey[200],
          500: colorTokens.grey[300],
          700: colorTokens.grey[400],
          900: colorTokens.grey[700],
        },
        darkBackground: {
          0: colorTokens.grey[800],
          900: colorTokens.grey[900],
        },
        lightPrimary: {
          0: colorTokens.primary[700],
          500: colorTokens.primary[500],
          900: colorTokens.primary[50],
        },
        lightNeutral: {
          0: colorTokens.grey[700],
          200: colorTokens.grey[500],
          500: colorTokens.grey[400],
          700: colorTokens.grey[300],
          900: colorTokens.grey[50],
        },
        lightBackground: {
          0: colorTokens.grey[0],
          900: colorTokens.grey[10],
        },
      },
    },
  },
  plugins: [],
};
