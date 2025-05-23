'use client';

import { useState, useEffect } from 'react';
import { useAuth } from './UserContext'; // Adjust path as necessary
import { auth } from './firebase'; // Adjust path as necessary
import { updateProfile, updateEmail, updatePassword, User } from 'firebase/auth';
import Link from 'next/link';

export default function SettingsPage() {
  const { user, loading, error: authError } = useAuth();
  
  const [displayName, setDisplayName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user?.displayName) {
      setDisplayName(user.displayName);
    }
  }, [user]);

  const handleUpdateDisplayName = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setMessage(null);
    if (!auth.currentUser) {
      setError("No user is currently signed in.");
      return;
    }
    try {
      await updateProfile(auth.currentUser, { displayName });
      setMessage('Display name updated successfully!');
      // Optionally, force refresh user state in UserContext or rely on onAuthStateChanged
    } catch (err: any) {
      setError(err.message || 'Failed to update display name.');
    }
  };

  const handleUpdateEmail = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setMessage(null);
    if (!auth.currentUser) {
      setError("No user is currently signed in.");
      return;
    }
    try {
      await updateEmail(auth.currentUser, newEmail);
      setMessage('Email updated successfully! Please verify your new email.');
      setNewEmail(''); 
      // Firebase automatically sends a verification email.
      // User object in context will update on next auth state change or token refresh.
    } catch (err: any)      setError(err.message || 'Failed to update email. You may need to sign in again recently.');
    }
  };

  const handleUpdatePassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setMessage(null);
    if (!auth.currentUser) {
      setError("No user is currently signed in.");
      return;
    }
    if (newPassword.length < 6) {
      setError("Password should be at least 6 characters long.");
      return;
    }
    try {
      await updatePassword(auth.currentUser, newPassword);
      setMessage('Password updated successfully!');
      setNewPassword('');
    } catch (err: any) {
      setError(err.message || 'Failed to update password. You may need to sign in again recently.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
          <p className="text-lg text-gray-700">Loading settings...</p>
        </div>
      </div>
    );
  }

  if (authError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
          <h2 className="text-2xl font-bold mb-4 text-red-600">Authentication Error</h2>
          <p className="text-gray-700 mb-4">{authError}</p>
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
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Access Denied</h2>
          <p className="text-gray-700 mb-6">Please sign in to access settings.</p>
          <Link href="/signin" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Go to Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Account Settings</h2>

        {message && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6" role="alert">
            <span className="block sm:inline">{message}</span>
          </div>
        )}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {/* Update Display Name Form */}
        <form onSubmit={handleUpdateDisplayName} className="mb-8 pb-8 border-b border-gray-200">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Update Display Name</h3>
          <div className="mb-4">
            <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 mb-1">
              Display Name
            </label>
            <input
              type="text"
              id="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Update Display Name
          </button>
        </form>

        {/* Update Email Form */}
        <form onSubmit={handleUpdateEmail} className="mb-8 pb-8 border-b border-gray-200">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Update Email</h3>
          <p className="text-sm text-gray-500 mb-2">Current Email: {user.email}</p>
          <div className="mb-4">
            <label htmlFor="newEmail" className="block text-sm font-medium text-gray-700 mb-1">
              New Email
            </label>
            <input
              type="email"
              id="newEmail"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Update Email
          </button>
          <p className="text-xs text-gray-500 mt-2">Updating email may require you to sign in again recently.</p>
        </form>

        {/* Update Password Form */}
        <form onSubmit={handleUpdatePassword}>
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Update Password</h3>
          <div className="mb-6">
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              minLength={6}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Update Password
          </button>
          <p className="text-xs text-gray-500 mt-2">Updating password may require you to sign in again recently.</p>
        </form>
      </div>
    </div>
  );
}
