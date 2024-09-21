'use client';
import { MovieFilterProvider } from './lib/movieFilterContext';

import Navbar from '../components/Navbar/Navbar';
import './globals.css';
 

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
      >
      <MovieFilterProvider>
        <Navbar/>
        {children}
        </MovieFilterProvider>
      </body>
    </html>
  );
}
