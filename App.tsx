
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { InputForm } from './components/InputForm';
import { ReportDisplay } from './components/ReportDisplay';
import { Loader } from './components/Loader';
import { analyzeApp } from './services/geminiService';
import type { TestReport } from './types';
import { sampleReport } from './constants';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<TestReport | null>(null);

  const handleAnalysis = useCallback(async (url: string, description: string, imageFile: File | null) => {
    setIsLoading(true);
    setError(null);
    setReport(null);

    try {
      if (!url || !description) {
        throw new Error("URL and description are required.");
      }

      let imageBase64: string | null = null;
      if (imageFile) {
        imageBase64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            if (typeof reader.result === 'string') {
              resolve(reader.result.split(',')[1]);
            } else {
              reject(new Error("Failed to read file as base64 string"));
            }
          };
          reader.onerror = error => reject(error);
          reader.readAsDataURL(imageFile);
        });
      }

      const generatedReport = await analyzeApp(url, description, imageBase64, imageFile?.type);
      setReport(generatedReport);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "An unknown error occurred. Using sample data for demonstration.");
      setReport(sampleReport);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <p className="text-center text-slate-400 mb-8">
          Enter the details of your Streamlit application below. Our AI will perform a heuristic evaluation and generate a comprehensive QA report.
        </p>
        <InputForm onAnalyze={handleAnalysis} isLoading={isLoading} />
        {error && (
          <div className="mt-6 bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        {isLoading && <Loader />}
        {report && !isLoading && <ReportDisplay report={report} />}
      </main>
    </div>
  );
};

export default App;
