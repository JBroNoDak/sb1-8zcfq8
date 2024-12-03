import { useState, useEffect } from 'react';

export function useLastUpdated() {
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleString());

  useEffect(() => {
    // In a real application, this would be fetched from the server
    // For now, we'll just use the current time
    setLastUpdated(new Date().toLocaleString());
  }, []);

  return lastUpdated;
}