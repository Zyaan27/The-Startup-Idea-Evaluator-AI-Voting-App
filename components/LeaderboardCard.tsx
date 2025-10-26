
import React from 'react';
import { Idea } from '../types';

interface LeaderboardCardProps {
  idea: Idea;
  rank: number;
}

const rankStyles = [
  { // Rank 1
    badge: '🥇',
    gradient: 'from-amber-400 to-yellow-500',
    shadow: 'shadow-yellow-500/50',
    border: 'border-amber-400',
  },
  { // Rank 2
    badge: '🥈',
    gradient: 'from-slate-300 to-gray-400',
    shadow: 'shadow-gray-500/50',
    border: 'border-slate-400',
  },
  { // Rank 3
    badge: '🥉',
    gradient: 'from-amber-600 to-orange-700',
    shadow: 'shadow-orange-600/50',
    border: 'border-amber-600',
  },
];

const LeaderboardCard: React.FC<LeaderboardCardProps> = ({ idea, rank }) => {
  const style = rank <= 3 ? rankStyles[rank - 1] : {
    badge: `#${rank}`,
    gradient: 'from-gray-700 to-gray-800',
    shadow: 'shadow-gray-900/50',
    border: 'border-gray-600',
  };

  return (
    <div className={`relative bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-md ${style.shadow} border-2 ${style.border} overflow-hidden`}>
      <div className={`absolute top-0 left-0 px-4 py-1 text-white font-bold text-sm bg-gradient-to-br ${style.gradient} rounded-br-lg`}>
        {rank <=3 ? style.badge : `#${rank}`}
      </div>
      <div className="p-5 pl-16">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{idea.name}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{idea.tagline}</p>
          </div>
          <div className="flex flex-col items-center ml-4 text-center">
            <div className={`text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-br ${style.gradient}`}>
              {idea.votes}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Votes</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardCard;
