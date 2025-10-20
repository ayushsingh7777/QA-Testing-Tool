import { GoogleGenAI, Type } from "@google/genai";
// FIX: Import enums as values for runtime access, and interfaces as types.
import { IssueSeverity, IssueCategory, type TestReport, type Issue } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // This will be handled by the environment, but it's good practice to check.
  console.warn("API_KEY environment variable not set. Using fallback for UI rendering.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        overallSummary: {
            type: Type.STRING,
            description: "A brief, high-level summary of the application's quality and the key findings of the QA analysis."
        },
        issues: {
            type: Type.ARRAY,
            description: "A list of all identified issues.",
            items: {
                type: Type.OBJECT,
                properties: {
                    id: { 
                        type: Type.STRING,
                        description: "A unique identifier for the issue (e.g., 'ui-001')."
                    },
                    category: {
                        type: Type.STRING,
                        description: "The category of the issue. Must be one of: 'UI/UX', 'Functionality', 'Performance', 'Accessibility', 'Content/Copy'.",
                    },
                    description: {
                        type: Type.STRING,
                        description: "A detailed description of the issue found."
                    },
                    severity: {
                        type: Type.STRING,
                        description: "The severity of the issue. Must be one of: 'Low', 'Medium', 'High'.",
                    },
                    recommendation: {
                        type: Type.STRING,
                        description: "A concrete, actionable recommendation to fix the issue."
                    }
                },
                required: ["id", "category", "description", "severity", "recommendation"]
            }
        }
    },
    required: ["overallSummary", "issues"]
};


export const analyzeApp = async (
  url: string,
  description: string,
  imageBase64: string | null,
  mimeType: string | undefined
): Promise<TestReport> => {
  const model = 'gemini-2.5-flash';

  const systemInstruction = `You are a world-class Senior QA Engineer and Web Accessibility Expert tasked with auditing a web application.
Your task is to perform a comprehensive heuristic evaluation and identify potential issues. Analyze the provided information to find problems in the following categories: UI/UX, Functionality, Performance, Accessibility, and Content/Copy. For each issue, provide a clear description, its severity (Low, Medium, High), and a concrete recommendation for fixing it.
You MUST return your findings as a valid JSON object that adheres to the provided schema. Do not include any text, markdown, or code block fences before or after the JSON object.`;

  const userPrompt = `Please analyze the following web application:
- URL: ${url}
- Description: ${description}
- Analyze the attached screenshot for visual issues.`;

  // FIX: Define parts array with a union type to allow both text and image data, preventing a type error when pushing the image part.
  const parts: ({ text: string } | { inlineData: { mimeType: string, data: string } })[] = [
    { text: userPrompt }
  ];

  if (imageBase64 && mimeType) {
    parts.push({
      inlineData: {
        mimeType: mimeType,
        data: imageBase64,
      },
    });
  }

  const contents = {
    parts
  };

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema,
        temperature: 0.2,
      },
    });

    const jsonString = response.text;
    const report = JSON.parse(jsonString) as TestReport;

    // Validate and sanitize the response data to match enums
    report.issues = report.issues.map((issue: any) => ({
      ...issue,
      severity: Object.values(IssueSeverity).includes(issue.severity) ? issue.severity : IssueSeverity.Low,
      category: Object.values(IssueCategory).includes(issue.category) ? issue.category : IssueCategory.UI_UX,
    }));

    return report;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get analysis from AI. Please check the console for more details.");
  }
};
