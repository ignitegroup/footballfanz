import { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { airports } from '../data/airports';

interface Airport {
  code: string;
  name: string;
  city: string;
}

interface AirportAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onSelect: (airport: Airport) => void;
}

export default function AirportAutocomplete({ value, onChange, onSelect }: AirportAutocompleteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<Airport[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!value.trim()) {
      setSuggestions([]);
      return;
    }

    const query = value.toLowerCase();
    const filtered = airports.filter(
      airport =>
        airport.city.toLowerCase().includes(query) ||
        airport.code.toLowerCase().includes(query) ||
        airport.name.toLowerCase().includes(query)
    );

    setSuggestions(filtered);
    setIsOpen(filtered.length > 0);
  }, [value]);

  return (
    <div ref={wrapperRef} className="relative">
      <div className="relative">
        <input
          type="text"
          className="w-full rounded-md bg-white/5 border border-gray-600 text-white pl-10 pr-3 py-2"
          placeholder="Enter city or airport"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => value && setIsOpen(true)}
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>

      {isOpen && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-gray-800 rounded-md shadow-lg max-h-60 overflow-auto">
          {suggestions.map((airport) => (
            <button
              key={airport.code}
              className="w-full px-4 py-2 text-left hover:bg-gray-700 text-white"
              onClick={() => {
                onSelect(airport);
                setIsOpen(false);
              }}
            >
              <div className="font-medium">{airport.city}</div>
              <div className="text-sm text-gray-400">
                {airport.code} - {airport.name}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}