import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../lib/store';
import ConnectionTest from '../ConnectionTest';
import FirebaseSetup from '../FirebaseSetup';
import { Loader2 } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  isAdmin?: boolean;
}

// Demo credentials
const ADMIN_EMAIL = 'admin@reggaefootballfanz.com';
const ADMIN_PASSWORD = 'admin123';
const FAN_EMAIL = 'fan@reggaefootballfanz.com';
const FAN_PASSWORD = 'fan123';

export default function LoginForm({ isAdmin = false }: LoginFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser, setIsAdmin: setStoreAdmin } = useAuthStore();
  
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const fillDemoCredentials = () => {
    if (isAdmin) {
      setValue('email', ADMIN_EMAIL);
      setValue('password', ADMIN_PASSWORD);
    } else {
      setValue('email', FAN_EMAIL);
      setValue('password', FAN_PASSWORD);
    }
  };

  const onSubmit = async (data: LoginFormData) => {
    if (!navigator.onLine) {
      toast.error('No internet connection available');
      return;
    }

    try {
      setIsLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      const isAdminUser = userCredential.user.email === ADMIN_EMAIL;
      setStoreAdmin(isAdminUser);
      setUser(userCredential.user);
      
      toast.success('Successfully logged in');
      navigate(isAdminUser ? '/admin' : '/dashboard');
    } catch (error: any) {
      console.error('Login error:', error);
      
      if (error.code === 'auth/network-request-failed') {
        toast.error('Network error - please check your connection');
      } else if (error.code === 'auth/invalid-credential') {
        toast.error('Invalid email or password');
      } else {
        toast.error(error.message || 'Login failed');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-300">
          Email
        </label>
        <input
          type="email"
          disabled={isLoading}
          {...register('email')}
          className="mt-1 block w-full rounded-md bg-white/5 border border-gray-600 text-white px-3 py-2"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300">
          Password
        </label>
        <input
          type="password"
          disabled={isLoading}
          {...register('password')}
          className="mt-1 block w-full rounded-md bg-white/5 border border-gray-600 text-white px-3 py-2"
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
      >
        {isLoading && <Loader2 className="h-5 w-5 animate-spin" />}
        {isLoading ? 'Logging in...' : isAdmin ? 'Admin Login' : 'Log In'}
      </button>

      <div className="text-sm text-gray-400">
        <p>Demo credentials:</p>
        <code className="block mt-1 p-2 bg-black/30 rounded">
          Email: {isAdmin ? ADMIN_EMAIL : FAN_EMAIL}<br />
          Password: {isAdmin ? ADMIN_PASSWORD : FAN_PASSWORD}
        </code>
        <div className="mt-2 flex flex-col gap-2">
          <button
            type="button"
            onClick={fillDemoCredentials}
            className="text-jamaican-yellow hover:text-jamaican-green"
            disabled={isLoading}
          >
            Fill demo credentials
          </button>
          <div className="flex justify-between">
            <ConnectionTest />
            <FirebaseSetup />
          </div>
        </div>
      </div>
    </form>
  );
}