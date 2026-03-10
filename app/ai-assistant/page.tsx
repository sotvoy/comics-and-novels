import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Assistant - Comics & Novels',
  description: 'AI-powered assistant for Comics & Novels',
};

export default function AIAssistantPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-4">
      <h1 className="text-2xl font-bold mb-4">AI Assistant</h1>
      <p className="text-gray-600 dark:text-gray-400">
        AI Assistant feature coming soon! This will help you discover content, 
        get recommendations, and answer questions about comics and novels.
      </p>
    </div>
  );
}
