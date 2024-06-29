import React from 'react'
import { Match } from '../types/types'

interface MatchTableProps {
  matches: Match[]
}

const MatchTable: React.FC<MatchTableProps> = ({ matches }) => {
  const groupedMatches = matches.reduce((acc, match) => {
    if (!acc[match.matchday]) {
      acc[match.matchday] = []
    }
    acc[match.matchday].push(match)
    return acc
  }, {} as Record<number, Match[]>)

  return (
    <div className='space-y-8'>
      {Object.keys(groupedMatches).map(round => (
        <div key={round} className='overflow-x-auto'>
          <h2 className='text-base text-center font-semibold text-gray-800 mb-4'>
            Rodada {round}
          </h2>
          <table className='min-w-full bg-white border border-gray-200 shadow-md rounded-lg'>
            <tbody>
              {groupedMatches[Number(round)].map(match => (
                <tr key={match.id} className='border-b border-gray-200'>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-800 flex items-center'>
                    <img
                      src={match.homeTeam.crest}
                      alt={match.homeTeam.name ?? 'Home team'}
                      className='h-6 w-6 mr-2'
                    />
                    {match.homeTeam?.name}
                  </td>
                  <td className='px-6 py-4 text-center text-sm text-gray-500'>
                    x
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-800 flex items-center'>
                    <img
                      src={match.awayTeam.crest}
                      alt={match.awayTeam.name ?? 'Away team'}
                      className='h-6 w-6 mr-2'
                    />
                    {match.awayTeam?.name}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  )
}

export default MatchTable
