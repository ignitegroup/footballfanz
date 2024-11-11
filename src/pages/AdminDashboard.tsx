import { useState } from 'react';
import { useAuthStore } from '../lib/store';
import {
  Users,
  Plane,
  MessageCircle,
  Calendar,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface Request {
  id: string;
  type: 'flight' | 'whatsapp' | 'ticket';
  status: 'pending' | 'approved' | 'rejected';
  user: {
    name: string;
    email: string;
  };
  details: string;
  date: string;
}

const pendingRequests: Request[] = [
  {
    id: '1',
    type: 'flight',
    status: 'pending',
    user: {
      name: 'John Smith',
      email: 'john@example.com',
    },
    details: 'Flight pool request for USA vs Jamaica match',
    date: '2024-11-18',
  },
  {
    id: '2',
    type: 'whatsapp',
    status: 'pending',
    user: {
      name: 'Sarah Wilson',
      email: 'sarah@example.com',
    },
    details: 'New York Reggae Boyz Fanz group access',
    date: '2024-03-15',
  },
];

const stats = [
  { label: 'Total Users', value: '2,500+', icon: Users },
  { label: 'Flight Requests', value: '150+', icon: Plane },
  { label: 'WhatsApp Groups', value: '25+', icon: MessageCircle },
  { label: 'Upcoming Matches', value: '10', icon: Calendar },
];

export default function AdminDashboard() {
  const { user } = useAuthStore();
  const [expandedRequest, setExpandedRequest] = useState<string | null>(null);

  if (!user) {
    return null;
  }

  const handleRequestAction = (requestId: string, action: 'approve' | 'reject') => {
    // Handle request approval/rejection
    console.log(`${action} request ${requestId}`);
  };

  return (
    <div className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <p className="mt-2 text-gray-300">
            Manage user requests and community updates
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6"
            >
              <div className="flex items-center">
                <stat.icon className="h-8 w-8 text-jamaican-yellow" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-300">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-semibold text-white">
                    {stat.value}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-6">
            Pending Requests
          </h2>
          <div className="space-y-4">
            {pendingRequests.map((request) => (
              <div
                key={request.id}
                className="bg-white/5 rounded-lg overflow-hidden"
              >
                <button
                  className="w-full p-4 text-left flex items-center justify-between"
                  onClick={() =>
                    setExpandedRequest(
                      expandedRequest === request.id ? null : request.id
                    )
                  }
                >
                  <div className="flex items-center">
                    {request.type === 'flight' && (
                      <Plane className="h-5 w-5 text-jamaican-yellow" />
                    )}
                    {request.type === 'whatsapp' && (
                      <MessageCircle className="h-5 w-5 text-jamaican-yellow" />
                    )}
                    {request.type === 'ticket' && (
                      <Calendar className="h-5 w-5 text-jamaican-yellow" />
                    )}
                    <span className="ml-3 text-white">{request.details}</span>
                  </div>
                  {expandedRequest === request.id ? (
                    <ChevronUp className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  )}
                </button>

                {expandedRequest === request.id && (
                  <div className="px-4 pb-4">
                    <div className="mb-4">
                      <p className="text-sm text-gray-300">
                        User: {request.user.name}
                      </p>
                      <p className="text-sm text-gray-300">
                        Email: {request.user.email}
                      </p>
                      <p className="text-sm text-gray-300">
                        Date: {new Date(request.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <button
                        className="px-4 py-2 bg-jamaican-green text-white rounded-md hover:bg-green-600"
                        onClick={() => handleRequestAction(request.id, 'approve')}
                      >
                        Approve
                      </button>
                      <button
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                        onClick={() => handleRequestAction(request.id, 'reject')}
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}