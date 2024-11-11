import { useParams } from 'react-router-dom';
import MatchDetailsComponent from '../components/MatchDetails';

const matches = {
  'usa-nov-14': {
    id: 'usa-nov-14',
    title: 'Jamaica vs USA - CONCACAF Nations League Quarter Finals',
    date: '2024-11-14',
    time: '8:00 PM',
    location: 'Kingston, Jamaica',
    venue: 'National Stadium',
    ticketUrl: 'https://ussoccer.spinzo.com/JFF',
    imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80',
  },
  'usa-nov-18': {
    id: 'usa-nov-18',
    title: 'USA vs Jamaica - CONCACAF Nations League Quarter Finals',
    date: '2024-11-18',
    time: '7:00 PM',
    location: 'Austin, TX',
    venue: 'City Park',
    ticketUrl: 'https://ussoccer.spinzo.com/JFF',
    imageUrl: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?auto=format&fit=crop&q=80',
  },
};

export default function MatchDetails() {
  const { id } = useParams();
  const match = id ? matches[id as keyof typeof matches] : null;

  if (!match) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Match Not Found</h1>
          <p className="text-gray-300">The match you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return <MatchDetailsComponent {...match} />;
}