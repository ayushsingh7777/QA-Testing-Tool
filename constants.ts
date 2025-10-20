
import type { TestReport } from './types';
import { IssueSeverity, IssueCategory } from './types';

export const sampleReport: TestReport = {
  overallSummary: "The application has a clean interface but suffers from several moderate UI/UX and accessibility issues that could hinder user experience. The core functionality appears to be present, but performance under load is a potential concern. Addressing the identified issues will significantly improve the application's quality.",
  issues: [
    {
      id: '1',
      category: IssueCategory.UI_UX,
      description: "The primary call-to-action (CTA) button lacks sufficient visual contrast against the background, making it difficult for users to spot immediately.",
      severity: IssueSeverity.Medium,
      recommendation: "Increase the button's color contrast to meet WCAG AA standards. Consider using a brighter, more saturated color that aligns with the brand but stands out."
    },
    {
      id: '2',
      category: IssueCategory.Accessibility,
      description: "The main chart graphic is missing descriptive alternative text (alt text), making it inaccessible to screen reader users.",
      severity: IssueSeverity.High,
      recommendation: "Add a descriptive alt attribute to the image tag. The description should convey the chart's key message and data insights."
    },
    {
      id: '3',
      category: IssueCategory.Functionality,
      description: "The date input field does not validate user input, allowing for impossible dates (e.g., February 30th) to be submitted, which may cause downstream errors.",
      severity: IssueSeverity.Medium,
      recommendation: "Implement frontend and backend validation for the date field to ensure only valid dates can be processed."
    },
    {
      id: '4',
      category: IssueCategory.Performance,
      description: "The application loads a large, unoptimized dataset on initial page load, which could lead to slow startup times for users on slower connections.",
      severity: IssueSeverity.Low,
      recommendation: "Consider implementing lazy loading or pagination for the dataset. Only load the data required for the initial view and fetch more as the user scrolls or navigates."
    },
     {
      id: '5',
      category: IssueCategory.Content,
      description: "There is a typographical error in the footer section ('Copyright 2023' instead of the current year).",
      severity: IssueSeverity.Low,
      recommendation: "Correct the typo in the footer. Implement a dynamic year display to prevent this issue in the future."
    }
  ]
};
