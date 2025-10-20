
import React from 'react';
import { RobotIcon } from './icons/RobotIcon';

export const Header: React.FC = () => {
  return (
    <header className="bg-slate-900/50 backdrop-blur-sm border-b border-slate-700/50 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-center">
        <RobotIcon className="w-8 h-8 mr-3 text-cyan-400" />
        <h1 className="text-2xl font-bold text-slate-100 tracking-tight">
          AI QA Assistant
        </h1>
      </div>
    </header>
  );
};
