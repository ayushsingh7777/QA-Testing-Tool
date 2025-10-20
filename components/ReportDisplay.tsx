import React from 'react';
// FIX: Import IssueCategory as a value because it's used to define the categoryOrder array.
import { IssueCategory, type TestReport, type Issue } from '../types';
import { IssueCard } from './IssueCard';
import { ClipboardIcon } from './icons/ClipboardIcon';

interface ReportDisplayProps {
  report: TestReport;
}

const categoryOrder: IssueCategory[] = [
    IssueCategory.Accessibility,
    IssueCategory.Functionality,
    IssueCategory.UI_UX,
    IssueCategory.Performance,
    IssueCategory.Content,
];

export const ReportDisplay: React.FC<ReportDisplayProps> = ({ report }) => {
  const groupedIssues = report.issues.reduce((acc, issue) => {
    (acc[issue.category] = acc[issue.category] || []).push(issue);
    return acc;
  }, {} as Record<IssueCategory, Issue[]>);
    
  return (
    <div className="mt-10 space-y-8 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-slate-100 flex items-center mb-4">
          <ClipboardIcon className="w-6 h-6 mr-3 text-cyan-400"/>
          Overall Summary
        </h2>
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-5">
          <p className="text-slate-300 leading-relaxed">{report.overallSummary}</p>
        </div>
      </div>
      
      <div>
        <h2 className="text-2xl font-bold text-slate-100 mb-4">Detailed Findings</h2>
        <div className="space-y-6">
            {categoryOrder.map(category => (
                groupedIssues[category] && (
                    <div key={category}>
                        <h3 className="text-xl font-semibold text-cyan-400 mb-3 capitalize">{category}</h3>
                        <div className="grid grid-cols-1 gap-4">
                            {groupedIssues[category].map(issue => (
                                <IssueCard key={issue.id} issue={issue} />
                            ))}
                        </div>
                    </div>
                )
            ))}
        </div>
      </div>
    </div>
  );
};
