import { ShoppingBag, X } from 'lucide-react';
import { useAuthStore } from '../lib/store';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Cart({ isOpen, onClose }: CartProps) {
  const { cart, removeFromCart, updateQuantity } = useAuthStore();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute inset-y-0 right-0 w-full max-w-md bg-gray-900 shadow-xl">
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between px-4 py-6 sm:px-6">
            <h2 className="text-lg font-medium text-white">Shopping Cart</h2>
            <button
              type="button"
              className="text-gray-400 hover:text-white"
              onClick={onClose}
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {cart.length === 0 ? (
            <div className="flex flex-1 items-center justify-center">
              <div className="text-center">
                <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-white">
                  Your cart is empty
                </h3>
                <p className="mt-1 text-sm text-gray-400">
                  Start adding some items to your cart!
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                <div className="space-y-8">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="h-24 w-24 flex-none rounded-md object-cover object-center"
                      />
                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-white">
                            <h3>{item.name}</h3>
                            <p className="ml-4">${item.price}</p>
                          </div>
                          {item.size && (
                            <p className="mt-1 text-sm text-gray-400">
                              Size: {item.size}
                            </p>
                          )}
                          {item.color && (
                            <p className="mt-1 text-sm text-gray-400">
                              Color: {item.color}
                            </p>
                          )}
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <div className="flex items-center">
                            <label htmlFor={`quantity-${item.id}`} className="sr-only">
                              Quantity
                            </label>
                            <select
                              id={`quantity-${item.id}`}
                              value={item.quantity}
                              onChange={(e) =>
                                updateQuantity(item.id, Number(e.target.value))
                              }
                              className="rounded-md border border-gray-600 bg-white/5 text-white py-1 pl-3 pr-8 text-sm"
                            >
                              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                                <option key={n} value={n} className="bg-gray-800">
                                  {n}
                                </option>
                              ))}
                            </select>
                          </div>
                          <button
                            type="button"
                            className="font-medium text-jamaican-yellow hover:text-jamaican-green"
                            onClick={() => removeFromCart(item.id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-white/10 px-4 py-6 sm:px-6">
                <div className="flex justify-between text-base font-medium text-white">
                  <p>Subtotal</p>
                  <p>${total.toFixed(2)}</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-400">
                  Shipping and taxes calculated at checkout.
                </p>
                <div className="mt-6">
                  <button className="w-full btn-primary">
                    Checkout
                  </button>
                </div>
                <div className="mt-6 flex justify-center text-center text-sm text-gray-400">
                  <p>
                    or{' '}
                    <button
                      type="button"
                      className="font-medium text-jamaican-yellow hover:text-jamaican-green"
                      onClick={onClose}
                    >
                      Continue Shopping
                    </button>
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}