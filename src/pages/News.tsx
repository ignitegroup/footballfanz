import { useState } from 'react';
import { Calendar, Heart, MessageSquare, Share2 } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: string;
  imageUrl: string;
  likes: number;
  comments: number;
}

const posts: BlogPost[] = [
  {
    id: '1',
    title: 'Kingston Charity Cup Raises Record Funds',
    excerpt: 'Annual tournament exceeds expectations with community support.',
    content: 'The Kingston Charity Cup has set new records this year...',
    date: '2024-03-15',
    author: 'Marcus Thompson',
    category: 'Event Highlights',
    imageUrl: 'https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?auto=format&fit=crop&q=80',
    likes: 124,
    comments: 45,
  },
  {
    id: '2',
    title: 'Rising Stars: Youth Development Program Success',
    excerpt: 'Local talent shines in community football initiative.',
    content: 'Our youth development program continues to produce...',
    date: '2024-03-10',
    author: 'Sarah Williams',
    category: 'Player Spotlights',
    imageUrl: 'https://images.unsplash.com/photo-1515238152791-8216bfdf89a7?auto=format&fit=crop&q=80',
    likes: 89,
    comments: 32,
  },
];

const categories = ['All', 'Event Highlights', 'Player Spotlights', 'Charity News', 'Fan Stories'];

export default function News() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});

  const handleLike = (postId: string) => {
    setLikedPosts((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  return (
    <div className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Latest News
          </h1>
          <p className="mt-4 text-lg text-gray-300">
            Stay updated with the latest stories from our community
          </p>
        </div>

        <div className="mt-12">
          <div className="flex justify-center space-x-4">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  selectedCategory === category
                    ? 'bg-jamaican-yellow text-black'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden"
            >
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-400">
                  <Calendar className="h-4 w-4" />
                  <span className="ml-2">
                    {new Date(post.date).toLocaleDateString()}
                  </span>
                  <span className="mx-2">•</span>
                  <span>{post.category}</span>
                </div>
                <h2 className="mt-4 text-xl font-semibold text-white">
                  {post.title}
                </h2>
                <p className="mt-2 text-gray-300">{post.excerpt}</p>
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      className="flex items-center text-gray-400 hover:text-jamaican-yellow"
                      onClick={() => handleLike(post.id)}
                    >
                      <Heart
                        className={`h-5 w-5 ${
                          likedPosts[post.id] ? 'fill-jamaican-yellow text-jamaican-yellow' : ''
                        }`}
                      />
                      <span className="ml-2">{post.likes}</span>
                    </button>
                    <button className="flex items-center text-gray-400 hover:text-jamaican-yellow">
                      <MessageSquare className="h-5 w-5" />
                      <span className="ml-2">{post.comments}</span>
                    </button>
                    <button className="flex items-center text-gray-400 hover:text-jamaican-yellow">
                      <Share2 className="h-5 w-5" />
                    </button>
                  </div>
                  <button className="text-jamaican-yellow hover:text-jamaican-green">
                    Read more →
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}