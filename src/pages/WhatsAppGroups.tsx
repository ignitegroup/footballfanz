import { useState } from 'react';
import { MessageCircle, Users, MapPin, Shield, Bell } from 'lucide-react';

interface WhatsAppGroup {
  id: string;
  name: string;
  description: string;
  members: number;
  maxMembers: number;
  category: string;
  region: string;
  requirements?: string[];
  isRecommended?: boolean;
  isAnnouncementOnly?: boolean;
}

const groups: WhatsAppGroup[] = [
  {
    id: 'announcements',
    name: 'RFF Official Announcements',
    description: 'Official updates, match announcements, and important information. Admin posts only.',
    members: 2500,
    maxMembers: 5000,
    category: 'Announcements',
    region: 'Global',
    isRecommended: true,
    isAnnouncementOnly: true,
  },
  {
    id: 'nyc',
    name: 'New York Reggae Boyz Fanz',
    description: 'Match meetups, watch parties, and travel coordination for NYC area supporters',
    members: 156,
    maxMembers: 256,
    category: 'Regional',
    region: 'New York',
    isRecommended: true,
  },
  {
    id: 'miami',
    name: 'Miami Reggae Boyz Fanz',
    description: 'South Florida supporters group for match coordination and meetups',
    members: 189,
    maxMembers: 256,
    category: 'Regional',
    region: 'Miami',
    isRecommended: true,
  },
  {
    id: 'atlanta',
    name: 'ATL Reggae Boyz Fanz',
    description: 'Atlanta area supporters connecting for matches and events',
    members: 145,
    maxMembers: 256,
    category: 'Regional',
    region: 'Atlanta',
  },
  {
    id: 'connecticut',
    name: 'Connecticut Reggae Boyz Fanz',
    description: 'New England supporters group for match coordination',
    members: 98,
    maxMembers: 256,
    category: 'Regional',
    region: 'Connecticut',
  },
  {
    id: 'london',
    name: 'London Reggae Boyz Fanz',
    description: 'UK-based supporters group for match viewing and travel coordination',
    members: 167,
    maxMembers: 256,
    category: 'Regional',
    region: 'London, UK',
  },
  {
    id: 'manchester',
    name: 'Manchester Reggae Boyz Fanz',
    description: 'Northern England supporters group',
    members: 89,
    maxMembers: 256,
    category: 'Regional',
    region: 'Manchester, UK',
  },
  {
    id: 'travel',
    name: 'Away Days Travel Group',
    description: 'Coordinate travel arrangements for away matches',
    members: 234,
    maxMembers: 256,
    category: 'Travel',
    region: 'Global',
  },
];

const categories = ['All', 'Announcements', 'Regional', 'Travel'];
const regions = [
  'Global',
  'New York',
  'Miami',
  'Atlanta',
  'Connecticut',
  'London, UK',
  'Manchester, UK',
];

export default function WhatsAppGroups() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedRegion, setSelectedRegion] = useState('Global');
  const [showRequested, setShowRequested] = useState<Record<string, boolean>>({});

  const filteredGroups = groups.filter((group) => {
    const categoryMatch =
      selectedCategory === 'All' || group.category === selectedCategory;
    const regionMatch =
      selectedRegion === 'Global' || group.region === selectedRegion;
    return categoryMatch && (regionMatch || group.region === 'Global');
  });

  const handleJoinRequest = (groupId: string) => {
    setShowRequested((prev) => ({ ...prev, [groupId]: true }));
  };

  return (
    <div className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            WhatsApp Groups
          </h1>
          <p className="mt-4 text-lg text-gray-300">
            Join your local supporters group and stay connected
          </p>
        </div>

        <div className="mt-12 bg-white/10 backdrop-blur-sm rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Category
              </label>
              <select
                className="mt-1 block w-full rounded-md bg-white/5 border border-gray-600 text-white px-3 py-2"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category} className="bg-gray-800">
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Region
              </label>
              <select
                className="mt-1 block w-full rounded-md bg-white/5 border border-gray-600 text-white px-3 py-2"
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
              >
                {regions.map((region) => (
                  <option key={region} value={region} className="bg-gray-800">
                    {region}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredGroups.map((group) => (
            <div
              key={group.id}
              className={`bg-white/10 backdrop-blur-sm rounded-lg p-6 ${
                group.isRecommended
                  ? 'ring-2 ring-jamaican-yellow'
                  : 'ring-1 ring-white/10'
              }`}
            >
              {group.isRecommended && (
                <div className="mb-4 inline-flex items-center rounded-full bg-jamaican-yellow/10 px-2.5 py-1 text-xs font-medium text-jamaican-yellow">
                  <Shield className="mr-1 h-3 w-3" />
                  Recommended for you
                </div>
              )}
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-white">
                  {group.name}
                </h3>
                {group.isAnnouncementOnly ? (
                  <Bell className="h-6 w-6 text-jamaican-green" />
                ) : (
                  <MessageCircle className="h-6 w-6 text-jamaican-green" />
                )}
              </div>
              <p className="mt-2 text-gray-300">{group.description}</p>
              
              <div className="mt-4 space-y-2">
                <div className="flex items-center text-gray-300">
                  <Users className="h-5 w-5" />
                  <span className="ml-2">
                    {group.members}/{group.maxMembers} members
                  </span>
                </div>
                <div className="flex items-center text-gray-300">
                  <MapPin className="h-5 w-5" />
                  <span className="ml-2">{group.region}</span>
                </div>
              </div>

              {group.requirements && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-300">Requirements:</h4>
                  <ul className="mt-2 list-disc list-inside text-sm text-gray-400">
                    {group.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-6">
                {showRequested[group.id] ? (
                  <button
                    className="w-full rounded-md bg-green-500/20 px-3.5 py-2.5 text-sm font-semibold text-green-400 cursor-default"
                    disabled
                  >
                    Request Sent
                  </button>
                ) : (
                  <button
                    className="btn-primary w-full"
                    onClick={() => handleJoinRequest(group.id)}
                  >
                    {group.isAnnouncementOnly ? 'Join Channel' : 'Request to Join'}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}