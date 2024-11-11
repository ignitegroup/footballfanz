import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../lib/store';

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
    try {
      setIsLoading(true);

      // For demo purposes, we'll simulate the login
      if (isAdmin && data.email === ADMIN_EMAIL && data.password === ADMIN_PASSWORD) {
        // Simulate admin login
        setStoreAdmin(true);
        setUser({ email: ADMIN_EMAIL, displayName: 'Admin User' } as any);
        toast.success('Successfully logged in as admin');
        navigate('/admin');
        return;
      } else if (!isAdmin && data.email === FAN_EMAIL && data.password === FAN_PASSWORD) {
        // Simulate fan login
        setStoreAdmin(false);
        setUser({ email: FAN_EMAIL, displayName: 'Demo Fan' } as any);
        toast.success('Successfully logged in');
        navigate('/dashboard');
        return;
      }

      // If not using demo credentials, try Firebase auth
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      const isAdminUser = userCredential.user.email === ADMIN_EMAIL;
      setStoreAdmin(isAdminUser);
      setUser(userCredential.user);
      
      toast.success('Successfully logged in');
      navigate(isAdminUser ? '/admin' : '/dashboard');
    } catch (error) {
      toast.error('Invalid credentials');
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
        className="w-full btn-primary"
      >
        {isLoading ? 'Logging in...' : isAdmin ? 'Admin Login' : 'Log In'}
      </button>

      <div className="text-sm text-gray-400">
        <p>Demo credentials:</p>
        <code className="block mt-1 p-2 bg-black/30 rounded">
          Email: {isAdmin ? ADMIN_EMAIL : FAN_EMAIL}<br />
          Password: {isAdmin ? ADMIN_PASSWORD : FAN_PASSWORD}
        </code>
        <button
          type="button"
          onClick={fillDemoCredentials}
          className="mt-2 text-jamaican-yellow hover:text-jamaican-green"
        >
          Fill demo credentials
        </button>
      </div>
    </form>
  );
}