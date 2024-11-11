import { useState } from 'react';
import { useAuthStore } from '../lib/store';
import { Calendar, Plane, MessageCircle, Bell } from 'lucide-react';

interface Request {
  id: string;
  type: 'flight' | 'whatsapp' | 'ticket';
  status: 'pending' | 'approved' | 'rejected';
  details: string;
  date: string;
}

const userRequests: Request[] = [
  {
    id: '1',
    type: 'flight',
    status: 'pending',
    details: 'Flight pool request for USA vs Jamaica match',
    date: '2024-11-18',
  },
  {
    id: '2',
    type: 'whatsapp',
    status: 'approved',
    details: 'New York Reggae Boyz Fanz group access',
    date: '2024-03-15',
  },
];

const upcomingMatches = [
  {
    id: 'usa-nov-14',
    title: 'Jamaica vs USA',
    date: '2024-11-14',
    venue: 'National Stadium, Kingston',
  },
  {
    id: 'usa-nov-18',
    title: 'USA vs Jamaica',
    date: '2024-11-18',
    venue: 'City Park, Austin TX',
  },
];

export default function Dashboard() {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState('overview');

  if (!user) {
    return null;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-400/10 text-green-400';
      case 'rejected':
        return 'bg-red-400/10 text-red-400';
      default:
        return 'bg-yellow-400/10 text-yellow-400';
    }
  };

  const getRequestIcon = (type: string) => {
    switch (type) {
      case 'flight':
        return <Plane className="h-5 w-5" />;
      case 'whatsapp':
        return <MessageCircle className="h-5 w-5" />;
      case 'ticket':
        return <Calendar className="h-5 w-5" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  return (
    <div className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">
            Welcome, {user.displayName}
          </h1>
          <p className="mt-2 text-gray-300">
            Manage your match registrations and requests
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              Upcoming Matches
            </h2>
            <div className="space-y-4">
              {upcomingMatches.map((match) => (
                <div
                  key={match.id}
                  className="p-4 bg-white/5 rounded-lg"
                >
                  <h3 className="font-medium text-white">{match.title}</h3>
                  <div className="mt-2 text-sm text-gray-300">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      {new Date(match.date).toLocaleDateString()}
                    </div>
                    <div className="mt-1">{match.venue}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              Recent Requests
            </h2>
            <div className="space-y-4">
              {userRequests.map((request) => (
                <div
                  key={request.id}
                  className="p-4 bg-white/5 rounded-lg"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {getRequestIcon(request.type)}
                      <span className="ml-2 text-white">{request.details}</span>
                    </div>
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(
                        request.status
                      )}`}
                    >
                      {request.status}
                    </span>
                  </div>
                  <div className="mt-2 text-sm text-gray-300">
                    {new Date(request.date).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              WhatsApp Groups
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-white/5 rounded-lg">
                <h3 className="font-medium text-white">
                  RFF Official Announcements
                </h3>
                <p className="mt-1 text-sm text-gray-300">
                  Official updates and important information
                </p>
              </div>
              <div className="p-4 bg-white/5 rounded-lg">
                <h3 className="font-medium text-white">
                  New York Reggae Boyz Fanz
                </h3>
                <p className="mt-1 text-sm text-gray-300">
                  Local supporter group discussions
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}