import { useState } from 'react';
import { setupFirebase } from '../lib/setup-firebase';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

export default function FirebaseSetup() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSetup = async () => {
    if (!navigator.onLine) {
      toast.error('No internet connection available');
      return;
    }

    setIsLoading(true);
    try {
      await setupFirebase();
      toast.success('Firebase setup completed successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Setup failed');
      console.error('Setup error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleSetup}
      disabled={isLoading}
      className="text-sm text-jamaican-yellow hover:text-jamaican-green disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
    >
      {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
      {isLoading ? 'Setting up Firebase...' : 'Initialize Firebase Data'}
    </button>
  );
}