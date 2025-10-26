
import React, { useState } from 'react';
import { Idea } from '../types';
import { ThumbsUpIcon, SparklesIcon, ChevronDownIcon } from './Icons';

interface IdeaCardProps {
  idea: Idea;
  onVote: (id: string) => void;
  hasVoted: boolean;
}

const IdeaCard: React.FC<IdeaCardProps> = ({ idea, onVote, hasVoted }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const ratingColor = idea.rating > 85 ? 'text-green-400' : idea.rating > 75 ? 'text-yellow-400' : 'text-orange-400';

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg dark:hover:shadow-gray-700/50">
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div className="flex-grow">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{idea.name}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{idea.tagline}</p>
          </div>
          <div className="flex flex-col items-center ml-4 text-center">
            <div className={`text-3xl font-bold ${ratingColor}`}>{idea.rating}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">AI Rating</div>
          </div>
        </div>

        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <h4 className="font-semibold text-gray-700 dark:text-gray-300">Description</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{idea.description}</p>
            <div className="mt-4 p-3 bg-indigo-50 dark:bg-gray-700/50 rounded-lg">
                <div className="flex items-center text-sm font-semibold text-indigo-600 dark:text-indigo-300">
                    <SparklesIcon className="w-5 h-5 mr-2" />
                    Sparky's Take
                </div>
                <p className="text-sm text-indigo-800 dark:text-indigo-200 mt-1 italic">"{idea.feedback}"</p>
            </div>
          </div>
        )}

        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center text-sm font-medium text-brand-primary dark:text-indigo-400 hover:underline"
          >
            {isExpanded ? 'Show Less' : 'Read More'}
            <ChevronDownIcon className={`w-5 h-5 ml-1 transition-transform duration-300 ${isExpanded ? 'transform rotate-180' : ''}`} />
          </button>

          <div className="flex items-center space-x-4">
            <span className="flex items-center text-gray-600 dark:text-gray-300 font-bold">
              <ThumbsUpIcon className="w-5 h-5 mr-1.5" />
              {idea.votes}
            </span>
            <button
              onClick={() => onVote(idea.id)}
              disabled={hasVoted}
              className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 ${
                hasVoted
                  ? 'bg-green-500 text-white cursor-not-allowed'
                  : 'bg-indigo-100 dark:bg-indigo-800/50 text-brand-primary dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-800'
              }`}
            >
              {hasVoted ? 'Voted' : 'Upvote'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdeaCard;
