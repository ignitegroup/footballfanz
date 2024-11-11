import { useState } from 'react';
import { User, Mail, MapPin, Phone } from 'lucide-react';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  interests: string[];
  whatsappConsent: boolean;
}

const interests = [
  'Local Matches',
  'Charity Events',
  'Travel Groups',
  'Equipment Exchange',
  'Youth Development',
];

export default function SignUp() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    interests: [],
    whatsappConsent: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  const handleInterestChange = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  return (
    <div className="py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Join Our Community
          </h1>
          <p className="mt-4 text-lg text-gray-300">
            Become part of our growing family of football and reggae enthusiasts
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-300">
                    First Name
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      required
                      className="block w-full pl-10 rounded-md bg-white/5 border border-gray-600 text-white px-3 py-2"
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          firstName: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300">
                    Last Name
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      required
                      className="block w-full pl-10 rounded-md bg-white/5 border border-gray-600 text-white px-3 py-2"
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          lastName: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Email
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    required
                    className="block w-full pl-10 rounded-md bg-white/5 border border-gray-600 text-white px-3 py-2"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Phone Number
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    required
                    className="block w-full pl-10 rounded-md bg-white/5 border border-gray-600 text-white px-3 py-2"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Location
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    required
                    className="block w-full pl-10 rounded-md bg-white/5 border border-gray-600 text-white px-3 py-2"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        location: e.target.value,
                      }))
                    }
                  >
                    <option value="" className="bg-gray-800">Select location</option>
                    <option value="usa" className="bg-gray-800">United States</option>
                    <option value="jamaica" className="bg-gray-800">Jamaica</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Interests
                </label>
                <div className="space-y-2">
                  {interests.map((interest) => (
                    <label
                      key={interest}
                      className="flex items-center space-x-3 text-gray-300"
                    >
                      <input
                        type="checkbox"
                        className="rounded border-gray-600 text-jamaican-green focus:ring-jamaican-yellow bg-white/5"
                        checked={formData.interests.includes(interest)}
                        onChange={() => handleInterestChange(interest)}
                      />
                      <span>{interest}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    className="rounded border-gray-600 text-jamaican-green focus:ring-jamaican-yellow bg-white/5"
                    checked={formData.whatsappConsent}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        whatsappConsent: e.target.checked,
                      }))
                    }
                  />
                  <span className="text-gray-300">
                    I agree to join relevant WhatsApp groups based on my location
                    and interests
                  </span>
                </label>
              </div>
            </div>

            <div className="mt-8">
              <button type="submit" className="w-full btn-primary">
                Sign Up
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}