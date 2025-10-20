
export enum IssueSeverity {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
}

export enum IssueCategory {
    UI_UX = "UI/UX",
    Functionality = "Functionality",
    Performance = "Performance",
    Accessibility = "Accessibility",
    Content = "Content/Copy",
}

export interface Issue {
  id: string;
  category: IssueCategory;
  description: string;
  severity: IssueSeverity;
  recommendation: string;
}

export interface TestReport {
  overallSummary: string;
  issues: Issue[];
}
