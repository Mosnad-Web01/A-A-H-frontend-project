'use client'
// components/Navbar.js
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white py-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center">
          <Link href="/" legacyBehavior>
            <a className="text-2xl font-bold">TMDb</a>
          </Link>
        </div>

        {/* User/Options */}
        <div className="flex items-center space-x-4">
          <Link href="/login" legacyBehavior>
            <a className="hover:underline">Login</a>
          </Link>
          <Link href="/signup" legacyBehavior>
            <a className="hover:underline">Sign Up</a>
          </Link>
        </div>
      </div>
    </nav>
  );
}
