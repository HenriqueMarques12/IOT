import { useState, useEffect } from 'react';
import axios from 'axios';
import { Competition } from '../types/types';

const useFetchCompetitions = () => {
  const [data, setData] = useState<Competition[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchCompetitions = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('/api/v4/competitions', {
          headers: {
            'X-Auth-Token': import.meta.env.VITE_API_TOKEN as string,
          },
        });
        setData(response.data.competitions);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompetitions();
  }, []);

  return { data, error, isLoading };
};

export default useFetchCompetitions;
