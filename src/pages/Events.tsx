import { Calendar, MapPin, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  venue: string;
  description: string;
  imageUrl: string;
  ticketUrl: string;
}

// Updated with actual World Cup qualifying matches and Nations League matches
const events: Event[] = [
  {
    id: 'usa-nov-14',
    title: 'Jamaica vs USA - CONCACAF Nations League Quarter Finals',
    date: '2024-11-14',
    time: '8:00 PM',
    location: 'Kingston, Jamaica',
    venue: 'National Stadium',
    description: 'First leg of the Quarter Finals. Join the Reggae Boyz as we take on the USA!',
    imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80',
    ticketUrl: 'https://ussoccer.spinzo.com/JFF',
  },
  {
    id: 'usa-nov-18',
    title: 'USA vs Jamaica - CONCACAF Nations League Quarter Finals',
    date: '2024-11-18',
    time: '7:00 PM',
    location: 'Austin, TX',
    venue: 'City Park',
    description: 'Second leg of the Quarter Finals. Support the Reggae Boyz on American soil!',
    imageUrl: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?auto=format&fit=crop&q=80',
    ticketUrl: 'https://ussoccer.spinzo.com/JFF',
  },
  {
    id: 'wcq-jun-2024',
    title: 'World Cup 2026 Qualifiers - First Round',
    date: '2024-06-03',
    time: 'TBA',
    location: 'Kingston, Jamaica',
    venue: 'National Stadium',
    description: 'First round of World Cup 2026 Qualifiers begins!',
    imageUrl: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&q=80',
    ticketUrl: '#',
  },
  {
    id: 'wcq-jun-2024-away',
    title: 'World Cup 2026 Qualifiers - Away Match',
    date: '2024-06-11',
    time: 'TBA',
    location: 'TBA',
    venue: 'TBA',
    description: 'Support the Reggae Boyz in their first away World Cup 2026 Qualifier!',
    imageUrl: 'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?auto=format&fit=crop&q=80',
    ticketUrl: '#',
  },
  {
    id: 'wcq-sep-2024',
    title: 'World Cup 2026 Qualifiers - Second Round',
    date: '2024-09-05',
    time: 'TBA',
    location: 'Kingston, Jamaica',
    venue: 'National Stadium',
    description: 'Second round of World Cup 2026 Qualifiers. The road to the World Cup continues!',
    imageUrl: 'https://images.unsplash.com/photo-1550881111-7cfde14b8073?auto=format&fit=crop&q=80',
    ticketUrl: '#',
  },
  {
    id: 'wcq-sep-2024-away',
    title: 'World Cup 2026 Qualifiers - Away Match',
    date: '2024-09-10',
    time: 'TBA',
    location: 'TBA',
    venue: 'TBA',
    description: 'Another crucial away match in our World Cup 2026 qualification campaign!',
    imageUrl: 'https://images.unsplash.com/photo-1518604666860-9ed391f76460?auto=format&fit=crop&q=80',
    ticketUrl: '#',
  },
];

export default function Events() {
  return (
    <div className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Upcoming Matches
          </h1>
          <p className="mt-4 text-lg text-gray-300">
            Support the Reggae Boyz in upcoming fixtures
          </p>
        </div>
        <div className="mt-12 space-y-8">
          {events.map((event) => (
            <div
              key={event.id}
              className="flex flex-col md:flex-row overflow-hidden rounded-lg shadow-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
            >
              <div className="md:w-1/3">
                <img
                  className="h-48 w-full md:h-full object-cover"
                  src={event.imageUrl}
                  alt={event.title}
                />
              </div>
              <div className="flex-1 p-6">
                <h2 className="text-2xl font-semibold text-white">
                  {event.title}
                </h2>
                <div className="mt-4 flex flex-wrap gap-4">
                  <div className="flex items-center text-gray-300">
                    <Calendar className="h-5 w-5 flex-shrink-0" />
                    <span className="ml-2">
                      {new Date(event.date).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <MapPin className="h-5 w-5 flex-shrink-0" />
                    <span className="ml-2">{event.venue}, {event.location}</span>
                  </div>
                </div>
                <p className="mt-4 text-gray-300">{event.description}</p>
                <div className="mt-6 flex gap-4">
                  <Link 
                    to={`/events/${event.id}`}
                    className="btn-primary"
                  >
                    I'm Interested
                  </Link>
                  {event.ticketUrl !== '#' && (
                    <a
                      href={event.ticketUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary"
                    >
                      Buy Tickets
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}