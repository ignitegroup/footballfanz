import { useState } from 'react';
import { Calendar, MapPin, Plane, Users, Clock, Mail, Phone } from 'lucide-react';
import { toast } from 'sonner';
import AirportAutocomplete from './AirportAutocomplete';
import GroupContactForm from './GroupContactForm';
import type { Airport } from '../types';

interface MatchDetailsProps {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  venue: string;
  ticketUrl: string;
  imageUrl: string;
}

export default function MatchDetails({ 
  title,
  date,
  time,
  location,
  venue,
  ticketUrl,
  imageUrl
}: MatchDetailsProps) {
  const [isInterested, setIsInterested] = useState(false);
  const [needsFlight, setNeedsFlight] = useState(false);
  const [flightPreference, setFlightPreference] = useState<'pool' | 'direct' | null>(null);
  const [showGroupForm, setShowGroupForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAirport, setSelectedAirport] = useState<Airport | null>(null);

  const handleFlightSelection = (preference: 'pool' | 'direct') => {
    setFlightPreference(preference);
    if (preference === 'direct' && selectedAirport) {
      window.location.href = `/flights?to=${location}&date=${date}&from=${selectedAirport.code}`;
    }
  };

  const handleAirportSelect = (airport: Airport) => {
    setSelectedAirport(airport);
    setSearchTerm(`${airport.city} (${airport.code})`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden">
        <div className="relative h-96">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <h1 className="text-4xl font-bold text-white mb-4">{title}</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-white">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                <span>{new Date(date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                <span>{time}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{venue}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">Are you interested in attending?</h2>
              <div className="flex gap-4">
                <button
                  className={`px-4 py-2 rounded-md ${
                    isInterested
                      ? 'bg-jamaican-green text-white'
                      : 'bg-white/10 text-white'
                  }`}
                  onClick={() => setIsInterested(true)}
                >
                  Yes
                </button>
                <button
                  className={`px-4 py-2 rounded-md ${
                    isInterested === false
                      ? 'bg-red-500 text-white'
                      : 'bg-white/10 text-white'
                  }`}
                  onClick={() => {
                    setIsInterested(false);
                    setNeedsFlight(false);
                    setFlightPreference(null);
                  }}
                >
                  No
                </button>
              </div>
            </div>

            {isInterested && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-white mb-4">Do you need flight arrangements?</h2>
                  <div className="flex gap-4">
                    <button
                      className={`px-4 py-2 rounded-md ${
                        needsFlight
                          ? 'bg-jamaican-green text-white'
                          : 'bg-white/10 text-white'
                      }`}
                      onClick={() => setNeedsFlight(true)}
                    >
                      Yes
                    </button>
                    <button
                      className={`px-4 py-2 rounded-md ${
                        needsFlight === false
                          ? 'bg-jamaican-yellow text-black'
                          : 'bg-white/10 text-white'
                      }`}
                      onClick={() => {
                        setNeedsFlight(false);
                        setFlightPreference(null);
                      }}
                    >
                      No
                    </button>
                  </div>
                </div>

                {needsFlight && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Departure City
                      </label>
                      <AirportAutocomplete
                        value={searchTerm}
                        onChange={setSearchTerm}
                        onSelect={handleAirportSelect}
                      />
                    </div>

                    <div>
                      <h2 className="text-xl font-semibold text-white mb-4">Choose your flight booking preference</h2>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white/5 rounded-lg p-6 border border-gray-600">
                          <div className="flex items-center mb-4">
                            <Users className="h-6 w-6 text-jamaican-yellow mr-2" />
                            <h3 className="text-lg font-medium text-white">Join Flight Pool</h3>
                          </div>
                          <p className="text-gray-300 mb-4">
                            Join a group of fans traveling together. We'll negotiate group rates and coordinate travel arrangements.
                          </p>
                          <button
                            className={`w-full btn-secondary ${
                              flightPreference === 'pool' ? 'bg-jamaican-yellow text-black' : ''
                            }`}
                            onClick={() => handleFlightSelection('pool')}
                          >
                            Select Pool Option
                          </button>
                        </div>

                        <div className="bg-white/5 rounded-lg p-6 border border-gray-600">
                          <div className="flex items-center mb-4">
                            <Plane className="h-6 w-6 text-jamaican-yellow mr-2" />
                            <h3 className="text-lg font-medium text-white">Book Direct</h3>
                          </div>
                          <p className="text-gray-300 mb-4">
                            Search and book your own flight immediately through our flight booking system.
                          </p>
                          <button
                            className={`w-full btn-secondary ${
                              flightPreference === 'direct' ? 'bg-jamaican-yellow text-black' : ''
                            }`}
                            onClick={() => handleFlightSelection('direct')}
                            disabled={!selectedAirport}
                          >
                            Book Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-8 space-y-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <a
                      href={ticketUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary text-center"
                    >
                      Purchase Match Tickets
                    </a>
                    <button
                      onClick={() => setShowGroupForm(true)}
                      className="btn-secondary"
                    >
                      Contact for Group Arrangements
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {showGroupForm && (
        <GroupContactForm onClose={() => setShowGroupForm(false)} matchTitle={title} />
      )}

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-white mb-6">Official Merchandise</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1580087256394-dc596e1c8f4f?auto=format&fit=crop&q=80"
              alt="Jamaica National Team Jersey"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-white">Official Match Jersey 2024</h3>
              <p className="text-gray-300 mt-1">$89.99</p>
              <button className="w-full btn-primary mt-4">Add to Cart</button>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1542652694-40abf526446e?auto=format&fit=crop&q=80"
              alt="Supporter Scarf"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-white">Reggae Boyz Supporter Scarf</h3>
              <p className="text-gray-300 mt-1">$24.99</p>
              <button className="w-full btn-primary mt-4">Add to Cart</button>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1556306535-0f09a537f0a3?auto=format&fit=crop&q=80"
              alt="Training Jersey"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-white">Training Jersey</h3>
              <p className="text-gray-300 mt-1">$59.99</p>
              <button className="w-full btn-primary mt-4">Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}