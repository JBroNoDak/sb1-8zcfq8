import { useState } from 'react';
import { subscribeEmail } from '../services/emailService';

interface UseEmailSubscriptionReturn {
  isSubmitting: boolean;
  error: string | null;
  subscribe: (email: string) => Promise<boolean>;
}

export function useEmailSubscription(): UseEmailSubscriptionReturn {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const subscribe = async (email: string): Promise<boolean> => {
    setIsSubmitting(true);
    setError(null);

    try {
      const success = await subscribeEmail(email);
      if (!success) {
        setError('Failed to subscribe. Please try again later.');
      }
      return success;
    } catch (err) {
      setError('An error occurred. Please try again later.');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    error,
    subscribe,
  };
}