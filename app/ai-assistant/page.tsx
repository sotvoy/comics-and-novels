import AIAssistant from '@/components/features/AIAssistant';

export default function AIAssistantPage() {
  return <AIAssistant onClose={() => window.history.back()} />;
}
