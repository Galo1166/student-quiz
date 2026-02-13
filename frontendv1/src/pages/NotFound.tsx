import { Link } from 'react-router';
import { Home, AlertCircle } from 'lucide-react';

/**
 * NotFound Component
 * 404 error page displayed when a requested route does not exist.
 * Provides a link back to the login page.
 */
export function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 text-red-600 rounded-full mb-6">
          <AlertCircle size={48} />
        </div>
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          <Home size={20} />
          Go to Login
        </Link>
      </div>
    </div>
  );
}
