import { useState } from 'react';
import { testConnection } from '../lib/firebase';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

export default function ConnectionTest() {
  const [isLoading, setIsLoading] = useState(false);

  const handleTest = async () => {
    if (!navigator.onLine) {
      toast.error('No internet connection available');
      return;
    }

    setIsLoading(true);
    try {
      await testConnection();
      toast.success('Firebase connection successful!');
    } catch (error: any) {
      toast.error(error.message || 'Connection test failed');
      console.error('Connection test error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleTest}
      disabled={isLoading}
      className="text-sm text-jamaican-yellow hover:text-jamaican-green disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
    >
      {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
      {isLoading ? 'Testing Connection...' : 'Test Connection'}
    </button>
  );
}