import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { Team } from '../types/types';

const useFetchTeams = (championshipId: string) => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchTeams = async () => {
      if (!championshipId) return;
      setIsLoading(true);
      try {
        const response = await axios.get(
          `/api/v4/competitions/${championshipId}/teams`,
          {
            headers: {
              'X-Auth-Token': import.meta.env.VITE_API_TOKEN as string,
            },
          }
        );
        setTeams(
          response.data.teams.map((team: any) => ({
            id: team.id,
            name: team.name,
          }))
        );
        setError(null);
      } catch (error) {
        setError(error as AxiosError);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeams();
  }, [championshipId]);

  return { teams, isLoading, error };
};

export default useFetchTeams;
