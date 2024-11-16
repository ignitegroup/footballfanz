import { Menu, X, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../lib/store';
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';
import { toast } from 'sonner';
import Cart from './Cart';

const navigation = [
  { label: 'Home', href: '/' },
  { label: 'Events', href: '/events' },
  { label: 'Match Pool', href: '/match-pool' },
  { label: 'Flight Pool', href: '/flight-pool' },
  { label: 'WhatsApp Groups', href: '/whatsapp' },
  { label: 'News', href: '/news' },
  { label: 'Shop', href: '/shop' },
  { label: 'About', href: '/about' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { user, isAdmin, cart } = useAuthStore();
  const navigate = useNavigate();

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      toast.error('Failed to log out');
    }
  };

  return (
    <>
      <header className="fixed w-full h-16 bg-black/95 text-white z-50 border-b border-jamaican-yellow/20">
        <nav className="mx-auto flex h-full max-w-7xl items-center justify-between px-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <Link to="/" className="-m-1.5 p-1.5 flex items-center">
              <img src="/logo.svg" alt="Reggae Football Fanz" className="h-12 w-auto" />
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="text-sm font-semibold leading-6 text-white hover:text-jamaican-yellow transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-4">
            <button 
              onClick={() => setCartOpen(true)}
              className="relative text-white hover:text-jamaican-yellow"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-jamaican-yellow text-black text-xs flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>
            {user ? (
              <>
                <Link
                  to={isAdmin ? '/admin' : '/dashboard'}
                  className="text-sm font-semibold leading-6 text-white hover:text-jamaican-yellow"
                >
                  {isAdmin ? 'Admin Dashboard' : 'Dashboard'}
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-sm font-semibold leading-6 text-white hover:text-jamaican-yellow"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm font-semibold leading-6 text-white hover:text-jamaican-yellow">
                  Log In
                </Link>
                <Link to="/register" className="btn-primary">
                  Join Us
                </Link>
              </>
            )}
          </div>
        </nav>
        <div className={`lg:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-black px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link to="/" className="-m-1.5 p-1.5">
                <img src="/logo.svg" alt="Reggae Football Fanz" className="h-8 w-auto" />
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.label}
                      to={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-jamaican-green/10"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
                <div className="py-6">
                  {user ? (
                    <>
                      <Link
                        to={isAdmin ? '/admin' : '/dashboard'}
                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white hover:bg-jamaican-green/10"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {isAdmin ? 'Admin Dashboard' : 'Dashboard'}
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setMobileMenuOpen(false);
                        }}
                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white hover:bg-jamaican-green/10 w-full text-left"
                      >
                        Log Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white hover:bg-jamaican-green/10"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Log In
                      </Link>
                      <Link
                        to="/register"
                        className="btn-primary w-full text-center mt-4"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Join Us
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}