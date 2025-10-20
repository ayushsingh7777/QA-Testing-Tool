
import React from 'react';
import type { Issue } from '../types';
import { IssueSeverity } from '../types';

interface IssueCardProps {
  issue: Issue;
}

const severityStyles: Record<IssueSeverity, { badge: string; border: string }> = {
  [IssueSeverity.High]: { badge: 'bg-red-500/20 text-red-400', border: 'border-l-4 border-red-500' },
  [IssueSeverity.Medium]: { badge: 'bg-yellow-500/20 text-yellow-400', border: 'border-l-4 border-yellow-500' },
  [IssueSeverity.Low]: { badge: 'bg-blue-500/20 text-blue-400', border: 'border-l-4 border-blue-500' },
};

export const IssueCard: React.FC<IssueCardProps> = ({ issue }) => {
  const styles = severityStyles[issue.severity];

  return (
    <div className={`bg-slate-800 rounded-lg p-5 transition-shadow hover:shadow-xl ${styles.border}`}>
      <div className="flex justify-between items-start mb-2">
        <h4 className="text-md font-semibold text-slate-100 pr-4">Issue</h4>
        <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${styles.badge}`}>
          {issue.severity} Severity
        </span>
      </div>
      <p className="text-slate-300 mb-4">{issue.description}</p>
      
      <div className="border-t border-slate-700 pt-3">
          <h5 className="text-sm font-semibold text-cyan-400 mb-1">Recommendation</h5>
          <p className="text-slate-400 text-sm">{issue.recommendation}</p>
      </div>
    </div>
  );
};
