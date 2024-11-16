import { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import { toast } from 'sonner';
import { auth } from '../lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function Login() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isTestingConnection, setIsTestingConnection] = useState(false);

  const testConnection = async () => {
    setIsTestingConnection(true);
    try {
      // Try to sign in with test credentials
      await signInWithEmailAndPassword(auth, 'fan@reggaefootballfanz.com', 'fan123');
      toast.success('Firebase connection successful!');
      // Sign out immediately after successful test
      await auth.signOut();
    } catch (error) {
      toast.error('Firebase connection failed. Please check your configuration.');
      console.error('Connection test error:', error);
    } finally {
      setIsTestingConnection(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">Welcome back</h2>
          <p className="mt-2 text-gray-300">
            Log in to your Reggae Football Fanz account
          </p>
          <button
            onClick={testConnection}
            disabled={isTestingConnection}
            className="mt-4 text-sm text-jamaican-yellow hover:text-jamaican-green"
          >
            {isTestingConnection ? 'Testing...' : 'Test Firebase Connection'}
          </button>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
          <div className="mb-6 flex justify-center space-x-4">
            <button
              className={`px-4 py-2 rounded-md ${
                !isAdmin
                  ? 'bg-jamaican-yellow text-black'
                  : 'bg-white/10 text-white'
              }`}
              onClick={() => setIsAdmin(false)}
            >
              Fan Login
            </button>
            <button
              className={`px-4 py-2 rounded-md ${
                isAdmin
                  ? 'bg-jamaican-yellow text-black'
                  : 'bg-white/10 text-white'
              }`}
              onClick={() => setIsAdmin(true)}
            >
              Admin Login
            </button>
          </div>

          <LoginForm isAdmin={isAdmin} />

          {!isAdmin && (
            <div className="mt-6 text-center">
              <p className="text-gray-300">
                Don't have an account?{' '}
                <Link to="/register" className="text-jamaican-yellow hover:text-jamaican-green">
                  Register here
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}