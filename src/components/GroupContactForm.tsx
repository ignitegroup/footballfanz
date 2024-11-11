import { useState } from 'react';
import { X } from 'lucide-react';
import { toast } from 'sonner';

interface GroupContactFormProps {
  onClose: () => void;
  matchTitle: string;
}

export default function GroupContactForm({ onClose, matchTitle }: GroupContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    groupSize: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    toast.success('Request submitted successfully! We will contact you shortly.');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-lg max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X className="h-6 w-6" />
        </button>

        <h2 className="text-xl font-semibold text-white mb-4">
          Group Arrangement Request
        </h2>
        <p className="text-gray-300 mb-6">
          For {matchTitle}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Name
            </label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md bg-white/5 border border-gray-600 text-white px-3 py-2"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              type="email"
              required
              className="mt-1 block w-full rounded-md bg-white/5 border border-gray-600 text-white px-3 py-2"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">
              Phone
            </label>
            <input
              type="tel"
              required
              className="mt-1 block w-full rounded-md bg-white/5 border border-gray-600 text-white px-3 py-2"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">
              Estimated Group Size
            </label>
            <input
              type="number"
              required
              min="5"
              className="mt-1 block w-full rounded-md bg-white/5 border border-gray-600 text-white px-3 py-2"
              value={formData.groupSize}
              onChange={(e) => setFormData({ ...formData, groupSize: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">
              Additional Information
            </label>
            <textarea
              className="mt-1 block w-full rounded-md bg-white/5 border border-gray-600 text-white px-3 py-2"
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
          </div>

          <button type="submit" className="w-full btn-primary">
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
}