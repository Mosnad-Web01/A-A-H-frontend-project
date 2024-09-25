import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const customTheme = extendTheme({
  colors: {
    primary: {
      100: '#E5F2FF',
      200: '#B2DAFF',
      300: '#80C2FF',
      400: '#4DA9FF',
      500: '#1A91FF',
      600: '#0073E6',
      700: '#005BB3',
      800: '#004380',
      900: '#002B4D',
    },
    secondary: {
      light: '#FFB6B6',  // Light theme secondary color
      dark: '#FF5252',    // Dark theme secondary color
    },
    background: {
      light: '#F7FAFC', // Light background
      dark: '#1A202C',  // Dark background (chakra default)
    },
    text: {
      light: '#2D3748', // Light text
      dark: '#F7FAFC',  // Dark text
    },
  },
  fonts: {
    heading: `'Inter', sans-serif`,
    body: `'Inter', sans-serif`,
  },
  styles: {
    global: (props) => ({
      body: {
        bg: mode('background.light', 'background.dark')(props),
        color: mode('text.light', 'text.dark')(props),
      },
    }),
  },
  config: {
    initialColorMode: 'light',  // Default mode
    useSystemColorMode: true,   // Sync with user's system preferences
  },
});

export default customTheme;
