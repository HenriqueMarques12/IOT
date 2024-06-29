import React from 'react'
import useFetchCompetitions from '../hooks/useFetchCompetitions'
import SearchComponent from '../components/Search'
import MatchTable from '../components/MatchTable'
import Pagination from '../components/Pagination'
import { Spinner } from '../components/Spinner'
import useHandleSearch from '../hooks/useHandleSearch'

const HomePage: React.FC = () => {
  const {
    data: competitions,
    error: competitionsError,
    isLoading: isLoadingCompetitions
  } = useFetchCompetitions()

  const {
    championshipId,
    currentPage,
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
    paginate
  } = useHandleSearch(competitions)

  const indexOfLastMatch = currentPage * matchesPerPage
  const indexOfFirstMatch = indexOfLastMatch - matchesPerPage
  const currentMatches = filteredMatches.slice(
    indexOfFirstMatch,
    indexOfLastMatch
  )
  const totalPages = Math.ceil(filteredMatches.length / matchesPerPage)

  if (isLoadingCompetitions || isLoadingTeams || isLoadingMatches) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Spinner />
      </div>
    )
  }

  if (competitionsError || teamsError || matchesError) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <p className='text-red-500'>
          Erro ao carregar dados:{' '}
          {competitionsError?.message ||
            teamsError?.message ||
            matchesError?.message}
        </p>
      </div>
    )
  }

  return (
    <div className='flex flex-col w-full mx-auto py-8 px-4'>
      <div className='max-w-4xl mx-auto'>
        <h1 className='text-center font-bold text-3xl mb-5 text-black'>
          Tabela do Campeonato
        </h1>
        <div className='mt-4'>
          <SearchComponent
            onSearch={handleSearch}
            competitions={competitions}
            teams={teams}
            rounds={rounds.map(round => ({
              id: round.toString(),
              name: `Rodada ${round}`
            }))}
            initialChampionship={championshipId}
          />
        </div>
      </div>
      {championshipId && (
        <div className='mt-8 max-w-4xl mx-auto'>
          {selectedCompetition && (
            <p className='text-xl font-bold text-center text-black mt-2'>
              {selectedCompetition}
            </p>
          )}
          <div className='mt-6'>
            <MatchTable matches={currentMatches} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              paginate={paginate}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default HomePage
