
import React, { useState, useMemo } from 'react';
import { Idea } from '../types';
import IdeaCard from './IdeaCard';

interface IdeaListingScreenProps {
  ideas: Idea[];
  onVote: (id: string) => void;
  votedIdeas: string[];
}

type SortKey = 'rating' | 'votes' | 'newest';

const IdeaListingScreen: React.FC<IdeaListingScreenProps> = ({ ideas, onVote, votedIdeas }) => {
  const [sortKey, setSortKey] = useState<SortKey>('newest');

  const sortedIdeas = useMemo(() => {
    const ideasCopy = [...ideas];
    switch (sortKey) {
      case 'rating':
        return ideasCopy.sort((a, b) => b.rating - a.rating);
      case 'votes':
        return ideasCopy.sort((a, b) => b.votes - a.votes);
      case 'newest':
      default:
        return ideasCopy; // Already newest first from submission
    }
  }, [ideas, sortKey]);

  return (
    <div className="pt-12 animate-fade-in">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white">All Ideas</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Browse, judge, and vote on the next big thing.</p>
      </header>
      
      <div className="flex justify-center space-x-2 mb-6 bg-gray-200 dark:bg-gray-800 p-1 rounded-full">
        {(['newest', 'rating', 'votes'] as SortKey[]).map(key => (
          <button
            key={key}
            onClick={() => setSortKey(key)}
            className={`capitalize w-full px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-300 ${
              sortKey === key 
                ? 'bg-white dark:bg-gray-700 text-brand-primary shadow' 
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-300/50 dark:hover:bg-gray-700/50'
            }`}
          >
            {key}
          </button>
        ))}
      </div>
      
      {sortedIdeas.length > 0 ? (
        <div className="space-y-4">
          {sortedIdeas.map((idea) => (
            <IdeaCard key={idea.id} idea={idea} onVote={onVote} hasVoted={votedIdeas.includes(idea.id)} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-inner">
          <p className="text-gray-500 dark:text-gray-400">No ideas have been submitted yet.</p>
          <p className="text-gray-400 dark:text-gray-500 mt-1">Be the first to share a brilliant (or crazy) idea!</p>
        </div>
      )}
    </div>
  );
};

export default IdeaListingScreen;
