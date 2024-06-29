import React, { useState, useEffect } from 'react';
import { Competition, Team } from '../types/types';

interface SearchProps {
  onSearch: (selectedChampionship: string, team: string, round: string) => void;
  competitions: Competition[];
  teams: Team[];
  rounds: { id: string, name: string }[];
  initialChampionship: string;
}

const SearchComponent: React.FC<SearchProps> = ({ onSearch, competitions, teams, rounds, initialChampionship }) => {
  const [selectedChampionship, setSelectedChampionship] = useState<string>(initialChampionship);
  const [team, setTeam] = useState<string>('all');
  const [round, setRound] = useState<string>('all');

  useEffect(() => {
    setSelectedChampionship(initialChampionship);
  }, [initialChampionship]);

  useEffect(() => {
    onSearch(selectedChampionship, team, round);
  }, [selectedChampionship, team, round]);

  const handleChampionshipChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedChampionship(e.target.value);
    setTeam('all');
  };

  const handleSearch = () => {
    onSearch(selectedChampionship, team, round);
  };

  return (
    <div className="search-component p-4 bg-white shadow-lg rounded-lg flex flex-col gap-4 md:flex-row md:items-end">
      <div className="flex flex-col w-full md:w-1/3">
        <label className="mb-1 text-sm font-medium text-gray-700">Campeonato</label>
        <select
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedChampionship}
          onChange={handleChampionshipChange}
        >
          {competitions.map((comp) => (
            <option key={comp.id} value={comp.id}>
              {comp.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col w-full md:w-1/3">
        <label className="mb-1 text-sm font-medium text-gray-700">Time</label>
        <select
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={team}
          onChange={(e) => setTeam(e.target.value)}
        >
          <option value="all">Todos os Times</option>
          {teams.map((team) => (
            <option key={team.id} value={team.name}>
              {team.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col w-full md:w-1/3">
        <label className="mb-1 text-sm font-medium text-gray-700">Rodada</label>
        <select
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={round}
          onChange={(e) => setRound(e.target.value)}
        >
          <option value="all">Todas as Rodadas</option>
          {rounds.map((round) => (
            <option key={round.id} value={round.id}>
              {round.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex w-full md:w-auto">
        <button
          onClick={handleSearch}
          className="w-full md:w-auto p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Buscar
        </button>
      </div>
    </div>
  );
};

export default SearchComponent;

