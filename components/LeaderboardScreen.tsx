
import React, { useMemo } from 'react';
import { Idea } from '../types';
import LeaderboardCard from './LeaderboardCard';

interface LeaderboardScreenProps {
  ideas: Idea[];
}

const LeaderboardScreen: React.FC<LeaderboardScreenProps> = ({ ideas }) => {
  const topIdeas = useMemo(() => {
    return [...ideas].sort((a, b) => b.votes - a.votes).slice(0, 5);
  }, [ideas]);

  return (
    <div className="pt-12 animate-fade-in">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500">
          Leaderboard 🏆
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">The best of the best, chosen by you.</p>
      </header>

      {topIdeas.length > 0 ? (
        <div className="space-y-4">
          {topIdeas.map((idea, index) => (
            <LeaderboardCard key={idea.id} idea={idea} rank={index + 1} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-inner">
          <p className="text-gray-500 dark:text-gray-400">The leaderboard is empty.</p>
          <p className="text-gray-400 dark:text-gray-500 mt-1">Vote for some ideas to see them here!</p>
        </div>
      )}
    </div>
  );
};

export default LeaderboardScreen;
