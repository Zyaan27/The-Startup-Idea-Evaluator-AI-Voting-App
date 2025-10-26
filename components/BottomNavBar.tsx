
import React from 'react';
import { Screen } from '../types';
import { PlusCircleIcon, ListBulletIcon, TrophyIcon } from './Icons';

interface BottomNavBarProps {
  activeScreen: Screen;
  setActiveScreen: (screen: Screen) => void;
}

const NavItem: React.FC<{
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, icon, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center w-full pt-2 pb-1 transition-colors duration-200 ease-in-out focus:outline-none ${
      isActive ? 'text-brand-primary dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400 hover:text-brand-primary dark:hover:text-indigo-400'
    }`}
  >
    {icon}
    <span className="text-xs font-medium">{label}</span>
  </button>
);

const BottomNavBar: React.FC<BottomNavBarProps> = ({ activeScreen, setActiveScreen }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto h-16 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700 flex justify-around items-center shadow-top">
      <NavItem
        label="Submit"
        icon={<PlusCircleIcon className="w-7 h-7 mb-1" />}
        isActive={activeScreen === Screen.SUBMIT}
        onClick={() => setActiveScreen(Screen.SUBMIT)}
      />
      <NavItem
        label="All Ideas"
        icon={<ListBulletIcon className="w-7 h-7 mb-1" />}
        isActive={activeScreen === Screen.LIST}
        onClick={() => setActiveScreen(Screen.LIST)}
      />
      <NavItem
        label="Leaders"
        icon={<TrophyIcon className="w-7 h-7 mb-1" />}
        isActive={activeScreen === Screen.LEADERBOARD}
        onClick={() => setActiveScreen(Screen.LEADERBOARD)}
      />
    </nav>
  );
};

export default BottomNavBar;
