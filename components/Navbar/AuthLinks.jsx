// AuthLinks.js
import Link from 'next/link';

export default function AuthLinks() {
  return (
    <div className="flex items-center space-x-6">
      <Link href="/login" legacyBehavior>
        <a className="bg-red-600 hover:bg-red-500 text-white font-semibold py-2 px-4 rounded transition-colors">Login</a>
      </Link>
      <Link href="/signup" legacyBehavior>
        <a className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded transition-colors">Sign Up</a>
      </Link>
    </div>
  );
}