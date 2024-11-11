import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { CarouselSlide } from '../types';

const slides: CarouselSlide[] = [
  {
    id: 1,
    imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80',
    title: 'Jamaica vs USA',
    description: 'CONCACAF Nations League Quarter Finals - November 14, 2024',
  },
  {
    id: 2,
    imageUrl: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?auto=format&fit=crop&q=80',
    title: 'Reggae Boyz Supporters',
    description: 'Join us in supporting our national team across the globe',
  },
  {
    id: 3,
    imageUrl: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&q=80',
    title: 'Get Your Tickets',
    description: 'Secure your spot in the Jamaican supporters section',
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[calc(100vh-4rem)]">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30" />
          <img
            src={slide.imageUrl}
            alt={slide.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="max-w-2xl text-center text-white px-4">
              <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-6xl">
                {slide.title}
              </h1>
              <p className="text-xl">{slide.description}</p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  to="/signup"
                  className="btn-primary"
                >
                  Join the Movement
                </Link>
                <a
                  href="https://ussoccer.spinzo.com/JFF"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold leading-6 text-white hover:text-jamaican-yellow transition-colors"
                >
                  Get Tickets <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full ${
              index === currentSlide ? 'bg-jamaican-yellow' : 'bg-white/50'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}