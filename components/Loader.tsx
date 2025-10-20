
import React from 'react';

export const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center my-12 text-center">
      <div className="relative h-16 w-16">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-500"></div>
        <div className="absolute top-0 left-0 h-16 w-16 rounded-full border-t-2 border-b-2 border-slate-600 opacity-20"></div>
      </div>
      <p className="mt-4 text-slate-400">AI is analyzing your application...</p>
    </div>
  );
};
