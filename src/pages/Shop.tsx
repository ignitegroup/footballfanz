import { useState } from 'react';
import { Star, ShoppingCart, Filter, Search } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  sizes?: string[];
  colors?: string[];
  rating: number;
  reviews: number;
  inStock: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
}

const products: Product[] = [
  {
    id: '1',
    name: 'Jamaica National Team Home Jersey 2024',
    description: 'Official match jersey in vibrant yellow with black trim, featuring the JFF crest.',
    price: 89.99,
    imageUrl: 'https://images.unsplash.com/photo-1580087256394-dc596e1c8f4f?auto=format&fit=crop&q=80&w=800',
    category: 'Jerseys',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Yellow', 'Black'],
    rating: 4.8,
    reviews: 156,
    inStock: true,
    isNew: true,
    isBestSeller: true,
  },
  {
    id: '2',
    name: 'Reggae Boyz Anthem Jacket',
    description: 'Premium track jacket in team colors with embroidered badges.',
    price: 79.99,
    imageUrl: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800',
    category: 'Outerwear',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Green', 'Black'],
    rating: 4.6,
    reviews: 89,
    inStock: true,
    isNew: true,
  },
  {
    id: '3',
    name: 'Jamaica Away Jersey 2024',
    description: 'Official away kit in striking green with gold accents.',
    price: 89.99,
    imageUrl: 'https://images.unsplash.com/photo-1577212017184-33e23d7a6668?auto=format&fit=crop&q=80&w=800',
    category: 'Jerseys',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Green', 'Yellow'],
    rating: 4.7,
    reviews: 124,
    inStock: true,
    isNew: true,
  },
  {
    id: '4',
    name: 'Reggae Boyz Training Kit',
    description: 'Complete training set including jersey and shorts.',
    price: 69.99,
    imageUrl: 'https://images.unsplash.com/photo-1516826957135-700dedea698c?auto=format&fit=crop&q=80&w=800',
    category: 'Training',
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.5,
    reviews: 78,
    inStock: true,
  },
  {
    id: '5',
    name: 'Jamaica Football Cap',
    description: 'Adjustable cap with embroidered team crest and Jamaican colors.',
    price: 29.99,
    imageUrl: 'https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?auto=format&fit=crop&q=80&w=800',
    category: 'Accessories',
    colors: ['Black', 'Yellow', 'Green'],
    rating: 4.4,
    reviews: 92,
    inStock: true,
    isBestSeller: true,
  },
  {
    id: '6',
    name: 'Reggae Boyz Supporter Scarf',
    description: 'Premium knitted scarf featuring team colors and crest.',
    price: 24.99,
    imageUrl: 'https://images.unsplash.com/photo-1482053450283-3e0b78b09a70?auto=format&fit=crop&q=80&w=800',
    category: 'Accessories',
    rating: 4.9,
    reviews: 203,
    inStock: true,
    isBestSeller: true,
  },
  {
    id: '7',
    name: 'Jamaica National Team Backpack',
    description: 'Spacious backpack with multiple compartments and team branding.',
    price: 49.99,
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800',
    category: 'Accessories',
    rating: 4.6,
    reviews: 67,
    inStock: true,
  },
  {
    id: '8',
    name: 'Reggae Boyz Football',
    description: 'Official size 5 match ball with team graphics.',
    price: 34.99,
    imageUrl: 'https://images.unsplash.com/photo-1552318965-6e6be7484ada?auto=format&fit=crop&q=80&w=800',
    category: 'Equipment',
    rating: 4.7,
    reviews: 145,
    inStock: true,
  },
];

const categories = ['All', 'Jerseys', 'Outerwear', 'Training', 'Accessories', 'Equipment'];

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<string[]>([]);

  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      selectedCategory === 'All' || product.category === selectedCategory;
    const searchMatch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return categoryMatch && searchMatch;
  });

  const addToCart = (productId: string) => {
    setCart([...cart, productId]);
  };

  return (
    <div className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Official Store
          </h1>
          <p className="mt-4 text-lg text-gray-300">
            Support the Reggae Boyz with official merchandise
          </p>
        </div>

        <div className="mt-12 flex flex-col md:flex-row gap-8">
          {/* Filters */}
          <div className="w-full md:w-64 space-y-6">
            <div>
              <h3 className="text-lg font-medium text-white flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Categories
              </h3>
              <div className="mt-4 space-y-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`block w-full text-left px-3 py-2 rounded-md ${
                      selectedCategory === category
                        ? 'bg-jamaican-yellow text-black'
                        : 'text-gray-300 hover:bg-white/10'
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full rounded-md bg-white/5 border border-gray-600 text-white pl-10 pr-3 py-2"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden group"
                >
                  <div className="relative">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.isNew && (
                      <span className="absolute top-2 left-2 bg-jamaican-green text-white px-2 py-1 rounded text-sm">
                        New
                      </span>
                    )}
                    {product.isBestSeller && (
                      <span className="absolute top-2 right-2 bg-jamaican-yellow text-black px-2 py-1 rounded text-sm">
                        Best Seller
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-white">
                      {product.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-300">
                      {product.description}
                    </p>
                    <div className="mt-2 flex items-center">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(product.rating)
                                ? 'text-jamaican-yellow fill-current'
                                : 'text-gray-400'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-400">
                        ({product.reviews})
                      </span>
                    </div>
                    {product.sizes && (
                      <div className="mt-2">
                        <span className="text-sm text-gray-400">
                          Sizes: {product.sizes.join(', ')}
                        </span>
                      </div>
                    )}
                    {product.colors && (
                      <div className="mt-1">
                        <span className="text-sm text-gray-400">
                          Colors: {product.colors.join(', ')}
                        </span>
                      </div>
                    )}
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xl font-bold text-white">
                        ${product.price}
                      </span>
                      <button
                        className="btn-primary flex items-center"
                        onClick={() => addToCart(product.id)}
                        disabled={!product.inStock}
                      >
                        <ShoppingCart className="h-5 w-5 mr-2" />
                        {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}