'use client';

import { useAuth } from './UserContext'; // Adjust path as necessary
import Link from 'next/link';

export default function ProfilePage() {
  const { user, loading, error } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
          <p className="text-lg text-gray-700">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
          <h2 className="text-2xl font-bold mb-4 text-red-600">Authentication Error</h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <Link href="/signin" className="text-indigo-600 hover:text-indigo-500 font-medium">
            Try signing in again
          </Link>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Profile Access Denied</h2>
          <p className="text-gray-700 mb-6">Please sign in to view your profile.</p>
          <Link href="/signin" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Go to Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">User Profile</h2>
        <div className="space-y-4">
          {user.displayName && (
            <div>
              <p className="text-sm font-medium text-gray-500">Display Name</p>
              <p className="text-lg text-gray-900">{user.displayName}</p>
            </div>
          )}
          <div>
            <p className="text-sm font-medium text-gray-500">Email</p>
            <p className="text-lg text-gray-900">{user.email || 'Not available'}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">User ID (UID)</p>
            <p className="text-lg text-gray-900">{user.uid}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Email Verified</p>
            <p className={`text-lg ${user.emailVerified ? 'text-green-600' : 'text-red-600'}`}>
              {user.emailVerified ? 'Yes' : 'No'}
            </p>
          </div>
          {/* Add more user details as needed */}
        </div>
        {/* Example: Link to settings or other user-specific pages */}
        {/* <div className="mt-8 text-center">
          <Link href="/settings" className="text-indigo-600 hover:text-indigo-500 font-medium">
            Go to Settings
          </Link>
        </div> */}
      </div>
    </div>
  );
}
