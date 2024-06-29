import { useState, useEffect } from "react";
import useFetchTeams from "../hooks/useFetchTeams";
import useFetchMatches from "../hooks/useFetchMatches";
import { Match, Competition } from "../types/types";

const useHandleSearch = (competitions: Competition[]) => {
  const [championshipId, setChampionshipId] = useState<string>("");
  const [teamName, setTeamName] = useState<string>("all");
  const [round, setRound] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [matchesPerPage] = useState<number>(10);
  const [filteredMatches, setFilteredMatches] = useState<Match[]>([]);
  const [selectedCompetition, setSelectedCompetition] = useState<string>("");
  const [rounds, setRounds] = useState<number[]>([]);

  const {
    teams,
    isLoading: isLoadingTeams,
    error: teamsError,
  } = useFetchTeams(championshipId);
  const {
    matches,
    isLoading: isLoadingMatches,
    error: matchesError,
  } = useFetchMatches(championshipId);

  useEffect(() => {
    if (competitions.length > 0) {
      const defaultCompetitionId = competitions[0].id;
      setChampionshipId(defaultCompetitionId);
    }
  }, [competitions]);

  useEffect(() => {
    if (championshipId) {
      const selectedComp = competitions.find(
        (comp) => comp.id === championshipId
      );
      setSelectedCompetition(selectedComp ? selectedComp.name : "");

      const uniqueRounds = [
        ...new Set(matches.map((match) => match.matchday)),
      ].sort((a, b) => a - b);
      setRounds(uniqueRounds);
    }
  }, [championshipId, competitions, matches]);

  useEffect(() => {
    let filtered = matches;

    if (teamName && teamName !== "all") {
      filtered = filtered.filter(
        (match) =>
          match?.homeTeam?.name === teamName ||
          match?.awayTeam?.name === teamName
      );
    }

    if (round && round !== "all") {
      filtered = filtered.filter(
        (match) => match.matchday.toString() === round
      );
    }

    setFilteredMatches(filtered);
  }, [teamName, round, matches]);

  const handleSearch = (
    selectedChampionship: string,
    team: string,
    round: string
  ) => {
    setChampionshipId(selectedChampionship);
    setTeamName(team);
    setRound(round);
    setCurrentPage(1);
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return {
    championshipId,
    setChampionshipId,
    teamName,
    setTeamName,
    round,
    setRound,
    currentPage,
    setCurrentPage,
    matchesPerPage,
    filteredMatches,
    selectedCompetition,
    rounds,
    isLoadingTeams,
    isLoadingMatches,
    teamsError,
    matchesError,
    teams,
    handleSearch,
    paginate,
  };
};

export default useHandleSearch;
