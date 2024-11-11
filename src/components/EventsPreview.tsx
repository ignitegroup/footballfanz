import { Calendar, MapPin } from 'lucide-react';
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
}

const upcomingEvents: Event[] = [
  {
    id: 'usa-nov-14',
    title: 'Jamaica vs USA',
    date: '2024-11-14',
    time: '8:00 PM',
    location: 'Kingston, Jamaica',
    venue: 'National Stadium',
    description: 'CONCACAF Nations League Quarter Finals - First Leg',
    imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80',
  },
  {
    id: 'usa-nov-18',
    title: 'USA vs Jamaica',
    date: '2024-11-18',
    time: '7:00 PM',
    location: 'Austin, TX',
    venue: 'City Park',
    description: 'CONCACAF Nations League Quarter Finals - Second Leg',
    imageUrl: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?auto=format&fit=crop&q=80',
  },
];

export default function EventsPreview() {
  return (
    <section className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Upcoming Matches
          </h2>
          <p className="mt-4 text-lg text-gray-300">
            Support the Reggae Boyz in their journey
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {upcomingEvents.map((event) => (
            <div
              key={event.id}
              className="flex flex-col overflow-hidden rounded-lg shadow-lg bg-white/10 backdrop-blur-sm transition-transform hover:scale-105"
            >
              <div className="flex-shrink-0">
                <img
                  className="h-48 w-full object-cover"
                  src={event.imageUrl}
                  alt={event.title}
                />
              </div>
              <div className="flex flex-1 flex-col justify-between p-6">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white">
                    {event.title}
                  </h3>
                  <div className="mt-3 flex items-center text-gray-300">
                    <Calendar className="h-5 w-5 flex-shrink-0" />
                    <span className="ml-2">
                      {new Date(event.date).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center text-gray-300">
                    <MapPin className="h-5 w-5 flex-shrink-0" />
                    <span className="ml-2">{event.venue}, {event.location}</span>
                  </div>
                  <p className="mt-3 text-base text-gray-300">
                    {event.description}
                  </p>
                </div>
                <div className="mt-6">
                  <Link
                    to={`/events/${event.id}`}
                    className="text-jamaican-yellow hover:text-jamaican-green transition-colors font-semibold"
                  >
                    Register Now →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            to="/events"
            className="inline-block rounded-md border border-jamaican-yellow px-4 py-2 text-base font-medium text-jamaican-yellow hover:bg-jamaican-yellow hover:text-black transition-colors"
          >
            View All Matches
          </Link>
        </div>
      </div>
    </section>
  );
}