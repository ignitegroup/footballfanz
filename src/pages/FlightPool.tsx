import { useState } from 'react';
import { Plane, Calendar, Users } from 'lucide-react';

interface Flight {
  id: string;
  from: string;
  to: string;
  date: string;
  airline: string;
  currentPassengers: number;
  maxPassengers: number;
  price: number;
}

const flights: Flight[] = [
  {
    id: '1',
    from: 'New York (JFK)',
    to: 'Kingston (KIN)',
    date: '2024-11-14',
    airline: 'Caribbean Airlines',
    currentPassengers: 8,
    maxPassengers: 15,
    price: 450,
  },
  {
    id: '2',
    from: 'Miami (MIA)',
    to: 'Austin (AUS)',
    date: '2024-11-18',
    airline: 'American Airlines',
    currentPassengers: 12,
    maxPassengers: 20,
    price: 380,
  },
];

export default function FlightPool() {
  const [searchFrom, setSearchFrom] = useState('');
  const [searchTo, setSearchTo] = useState('');
  const [isAdmin] = useState(false); // This would come from auth context in a real app

  return (
    <div className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Flight Pool
          </h1>
          <p className="mt-4 text-lg text-gray-300">
            Join group flights and save on travel
          </p>
        </div>

        <div className="mt-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  From
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md bg-white/5 border border-gray-600 text-white px-3 py-2"
                  placeholder="Departure City"
                  value={searchFrom}
                  onChange={(e) => setSearchFrom(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  To
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md bg-white/5 border border-gray-600 text-white px-3 py-2"
                  placeholder="Arrival City"
                  value={searchTo}
                  onChange={(e) => setSearchTo(e.target.value)}
                />
              </div>
              <div className="flex items-end">
                <button className="w-full btn-primary">Search Flights</button>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-6">
            {flights.map((flight) => (
              <div
                key={flight.id}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="flex items-center">
                      <span className="text-xl font-semibold text-white">
                        {flight.from}
                      </span>
                      <Plane className="mx-4 h-5 w-5 text-jamaican-yellow" />
                      <span className="text-xl font-semibold text-white">
                        {flight.to}
                      </span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-4">
                      <div className="flex items-center text-gray-300">
                        <Calendar className="h-5 w-5" />
                        <span className="ml-2">
                          {new Date(flight.date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <Users className="h-5 w-5" />
                        <span className="ml-2">
                          {flight.currentPassengers}/{flight.maxPassengers} Passengers
                        </span>
                      </div>
                      <div className="text-jamaican-yellow font-semibold">
                        ${flight.price} USD
                      </div>
                    </div>
                    <div className="mt-2 text-gray-300">{flight.airline}</div>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <button className="btn-primary">Join Flight</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {isAdmin && (
            <div className="mt-8 text-center">
              <button className="btn-secondary">Create New Flight Pool</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}