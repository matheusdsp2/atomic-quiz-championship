
import React from 'react';

export interface Player {
  name: string;
  score: number;
}

interface ScoreBoardProps {
  players: Player[];
  limit?: number;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ players, limit = 5 }) => {
  // Sort players by score (descending)
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
  // Limit number of players shown
  const topPlayers = sortedPlayers.slice(0, limit);
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-bold mb-3 text-center">Ranking</h2>
      {topPlayers.length > 0 ? (
        <div className="space-y-2">
          {topPlayers.map((player, index) => (
            <div 
              key={index} 
              className={`flex justify-between items-center p-2 rounded ${
                index === 0 ? 'bg-yellow-100' : 
                index === 1 ? 'bg-gray-100' : 
                index === 2 ? 'bg-amber-50' : ''
              }`}
            >
              <div className="flex items-center">
                <span className="font-bold mr-2">{index + 1}.</span>
                <span className="truncate max-w-[150px]">{player.name}</span>
              </div>
              <span className="font-semibold">{player.score}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">Nenhum jogador ainda</p>
      )}
    </div>
  );
};

export default ScoreBoard;
