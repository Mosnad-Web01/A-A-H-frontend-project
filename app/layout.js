

import Navbar from '../components/Navbar/Navbar';
import './globals.css';

// These styles apply to every route in the application
 

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
      >
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
