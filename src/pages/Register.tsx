import { Link } from 'react-router-dom';
import RegisterForm from '../components/auth/RegisterForm';

export default function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">Create an account</h2>
          <p className="mt-2 text-gray-300">
            Join the Reggae Football Fanz community
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
          <RegisterForm />

          <div className="mt-6 text-center">
            <p className="text-gray-300">
              Already have an account?{' '}
              <Link to="/login" className="text-jamaican-yellow hover:text-jamaican-green">
                Log in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}