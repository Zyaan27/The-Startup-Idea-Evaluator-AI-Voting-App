
import React, { useState, useEffect, useCallback } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Idea, Screen, ToastMessage } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import { generateFeedback } from './services/geminiService';
import SubmissionScreen from './components/SubmissionScreen';
import IdeaListingScreen from './components/IdeaListingScreen';
import LeaderboardScreen from './components/LeaderboardScreen';
import BottomNavBar from './components/BottomNavBar';
import Toast from './components/Toast';
import ThemeToggle from './components/ThemeToggle';

const App: React.FC = () => {
  const [ideas, setIdeas] = useLocalStorage<Idea[]>('startup-ideas', []);
  const [votedIdeas, setVotedIdeas] = useLocalStorage<string[]>('voted-ideas', []);
  const [activeScreen, setActiveScreen] = useState<Screen>(Screen.SUBMIT);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const [isDarkMode, setIsDarkMode] = useLocalStorage('dark-mode', false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleIdeaSubmit = async (name: string, tagline: string, description: string) => {
    setIsLoading(true);
    try {
      const feedback = await generateFeedback(name, tagline, description);
      const newIdea: Idea = {
        id: new Date().toISOString(),
        name,
        tagline,
        description,
        rating: Math.floor(Math.random() * 31) + 70, // Rating between 70-100
        feedback,
        votes: 0,
      };
      setIdeas([newIdea, ...ideas]);
      showToast('Idea submitted successfully!', 'success');
      setActiveScreen(Screen.LIST);
    } catch (error) {
      console.error('Error generating feedback:', error);
      showToast('Failed to get AI feedback. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVote = useCallback((ideaId: string) => {
    if (votedIdeas.includes(ideaId)) {
      showToast("You've already upvoted this idea!", 'info');
      return;
    }

    setIdeas(
      ideas.map((idea) =>
        idea.id === ideaId ? { ...idea, votes: idea.votes + 1 } : idea
      )
    );
    setVotedIdeas([...votedIdeas, ideaId]);
    showToast('Vote counted!', 'success');
  }, [ideas, votedIdeas, setIdeas, setVotedIdeas]);

  const renderScreen = () => {
    switch (activeScreen) {
      case Screen.SUBMIT:
        return <SubmissionScreen onSubmit={handleIdeaSubmit} isLoading={isLoading} />;
      case Screen.LIST:
        return <IdeaListingScreen ideas={ideas} onVote={handleVote} votedIdeas={votedIdeas} />;
      case Screen.LEADERBOARD:
        return <LeaderboardScreen ideas={ideas} />;
      default:
        return <SubmissionScreen onSubmit={handleIdeaSubmit} isLoading={isLoading} />;
    }
  };

  return (
    <div className="min-h-screen font-sans text-gray-800 dark:text-gray-200 transition-colors duration-300">
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      </div>
      <main className="max-w-md mx-auto pb-24 px-4">
        {renderScreen()}
      </main>
      <BottomNavBar activeScreen={activeScreen} setActiveScreen={setActiveScreen} />
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default App;
