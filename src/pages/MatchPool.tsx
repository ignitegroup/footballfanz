import { useState } from 'react';
import { Users, Calendar, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Match {
  id: string;
  title: string;
  date: string;
  location: string;
  currentPlayers: number;
  maxPlayers: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  interested: boolean;
}

const matches: Match[] = [
  {
    id: '1',
    title: 'Jamaica vs USA - CONCACAF Nations League Quarter Finals',
    date: '2024-11-14',
    location: 'National Stadium, Kingston',
    currentPlayers: 14,
    maxPlayers: 22,
    level: 'Advanced',
    interested: false,
  },
  {
    id: '2',
    title: 'USA vs Jamaica - CONCACAF Nations League Quarter Finals',
    date: '2024-11-18',
    location: 'City Park, Austin TX',
    currentPlayers: 18,
    maxPlayers: 22,
    level: 'Advanced',
    interested: false,
  },
];

export default function MatchPool() {
  const [activeTab, setActiveTab] = useState('available');
  const [isAdmin] = useState(false); // This would come from auth context in a real app
  const [showInterestModal, setShowInterestModal] = useState<string | null>(null);

  const handleInterest = (matchId: string) => {
    setShowInterestModal(matchId);
  };

  return (
    <div className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Match Pool
          </h1>
          <p className="mt-4 text-lg text-gray-300">
            Find upcoming matches and show your interest
          </p>
        </div>

        <div className="mt-12">
          <div className="border-b border-gray-700">
            <nav className="-mb-px flex gap-6">
              <button
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'available'
                    ? 'border-jamaican-yellow text-jamaican-yellow'
                    : 'border-transparent text-gray-400 hover:text-gray-300'
                }`}
                onClick={() => setActiveTab('available')}
              >
                Available Matches
              </button>
              <button
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'my-matches'
                    ? 'border-jamaican-yellow text-jamaican-yellow'
                    : 'border-transparent text-gray-400 hover:text-gray-300'
                }`}
                onClick={() => setActiveTab('my-matches')}
              >
                My Matches
              </button>
            </nav>
          </div>

          <div className="mt-8 grid gap-6">
            {matches.map((match) => (
              <div
                key={match.id}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      {match.title}
                    </h3>
                    <div className="mt-2 flex flex-wrap gap-4">
                      <div className="flex items-center text-gray-300">
                        <Calendar className="h-5 w-5" />
                        <span className="ml-2">
                          {new Date(match.date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <MapPin className="h-5 w-5" />
                        <span className="ml-2">{match.location}</span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <Users className="h-5 w-5" />
                        <span className="ml-2">
                          {match.currentPlayers} interested
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <Link 
                      to={`/events/${match.id}`}
                      className="btn-primary"
                    >
                      I'm Interested
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {isAdmin && (
            <div className="mt-8 text-center">
              <button className="btn-secondary">Create New Match</button>
            </div>
          )}
        </div>
      </div>

      {/* Interest Modal would be implemented here */}
    </div>
  );
}