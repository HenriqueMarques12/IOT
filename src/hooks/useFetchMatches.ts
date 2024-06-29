import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { Match } from '../types/types';

const useFetchMatches = (championshipId: string) => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchMatches = async () => {
      if (!championshipId) return;
      setIsLoading(true);
      try {
        const response = await axios.get(
          `/api/v4/competitions/${championshipId}/matches`,
          {
            headers: {
              'X-Auth-Token': import.meta.env.VITE_API_TOKEN as string,
            },
          }
        );
        setMatches(response.data.matches);
        setError(null);
      } catch (error) {
        setError(error as AxiosError);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMatches();
  }, [championshipId]);

  return { matches, isLoading, error };
};

export default useFetchMatches;
