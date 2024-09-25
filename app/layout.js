'use client';

import { ChakraProvider } from '@chakra-ui/react';
import {customTheme} from './theme/index'
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ChakraProvider theme={customTheme}>
          <Navbar />
          {children}
          <Footer />
        </ChakraProvider>
      </body>
    </html>
  );
}
