'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icons from '@/components/ui/Icons';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const quickActions = [
  { icon: '📖', label: 'Recommend', prompt: 'Can you recommend some good ' },
  { icon: '🔍', label: 'Search', prompt: 'Search for ' },
  { icon: '📝', label: 'Summarize', prompt: 'Summarize ' },
  { icon: '💡', label: 'Explain', prompt: 'Explain ' },
];

export default function AIAssistant({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: 'Hello! I\'m your C&N AI Assistant. I can help you:\n\n📚 Find comics & novels\n💬 Discuss story plots\n📖 Get recommendations\n🔍 Search for specific series\n\nHow can I help you today?', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEnd = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEnd.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const simulateStreamingResponse = (content: string) => {
    let index = 0;
    const words = content.split(' ');
    const interval = setInterval(() => {
      if (index >= words.length) {
        clearInterval(interval);
        setIsTyping(false);
        return;
      }
      const currentMessage = messages[messages.length - 1];
      const newContent = currentMessage.content + (index === 0 ? '' : ' ') + words[index];
      setMessages(prev => prev.map((msg, i) => 
        i === prev.length - 1 ? { ...msg, content: newContent } : msg
      ));
      index++;
    }, 50);
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    const userInput = input;
    setInput('');
    setIsTyping(true);

    // Add empty assistant message for streaming
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: '',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, assistantMessage]);

    // Simulate AI response with streaming
    setTimeout(() => {
      const responses = [
        `I found some great ${userInput} series for you! Here are my top picks:\n\n1. **Solo Leveling** - The ultimate hunter story\n2. **Tower of God** - An epic tower climb\n3. **Omniscient Reader** - A webtoon masterpiece\n\nWould you like more details on any of these?`,
        `Great question! Based on your interest in "${userInput}", I recommend checking out the "Popular" section or using the advanced filters. You can also follow creators who specialize in this genre!`,
        `Here's what I found about "${userInput}":\n\nThis is a popular genre with many amazing series. Some reader favorites include action-packed adventures, heartwarming romances, and mind-bending mysteries!`,
      ];
      
      const response = responses[Math.floor(Math.random() * responses.length)];
      simulateStreamingResponse(response);
    }, 500);
  };

  const handleQuickAction = (prompt: string) => {
    setInput(prompt);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const regenerateResponse = () => {
    const lastUserMessage = [...messages].reverse().find(m => m.role === 'user');
    if (lastUserMessage) {
      setMessages(prev => prev.filter(m => m.role === 'assistant' || m.id !== prev[prev.length - 1].id));
      setInput(lastUserMessage.content);
      handleSend();
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className={`fixed inset-0 bg-black/90 z-50 flex ${isExpanded ? 'items-center justify-center' : 'items-start justify-center pt-16'}`}
      onClick={onClose}
    >
      <motion.div 
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className={`bg-gray-900 w-full flex flex-col ${isExpanded ? 'h-screen max-w-4xl rounded-0' : 'rounded-t-3xl h-[70vh] max-w-xl mt-16'}`}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700 bg-gray-800/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
              <Icons.Chat className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm">C&N AI</h3>
              <p className="text-green-400 text-xs">Online</p>
            </div>
          </div>
          <div className="flex gap-1">
            <button 
              onClick={() => setIsExpanded(!isExpanded)} 
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
              title={isExpanded ? 'Minimize' : 'Expand'}
            >
              {isExpanded ? <Icons.Minimize className="w-4 h-4" /> : <Icons.Maximize2 className="w-4 h-4" />}
            </button>
            <button onClick={onClose} className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
              <Icons.X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} group`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                  msg.role === 'user'
                    ? 'bg-gray-700 text-white'
                    : 'bg-transparent text-gray-100'
                }`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center mb-2">
                    <Icons.Chat className="w-3 h-3 text-white" />
                  </div>
                )}
                <div className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</div>
                <p className="text-xs opacity-50 mt-2">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
                {msg.role === 'assistant' && msg.content && (
                  <div className="flex gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => copyToClipboard(msg.content)}
                      className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
                      title="Copy"
                    >
                      <Icons.Copy className="w-3.5 h-3.5" />
                    </button>
                    <button 
                      onClick={regenerateResponse}
                      className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
                      title="Regenerate"
                    >
                      <Icons.Refresh className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-transparent rounded-2xl px-4 py-2">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEnd} />
        </div>

        {/* Quick Actions */}
        <div className="px-4 pb-2">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {quickActions.map((action, i) => (
              <button
                key={i}
                onClick={() => handleQuickAction(action.prompt)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-gray-600 rounded-lg text-xs text-gray-300 whitespace-nowrap transition-colors"
              >
                <span>{action.icon}</span>
                {action.label}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-700 bg-gray-800/30">
          <div className="relative bg-gray-800 rounded-xl border border-gray-700 focus-within:border-green-500 transition-colors">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message C&N AI..."
              rows={1}
              className="w-full bg-transparent text-white px-4 py-3 pr-12 focus:outline-none resize-none max-h-32"
              style={{ minHeight: '48px' }}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="absolute right-2 bottom-2 w-8 h-8 bg-green-600 hover:bg-green-500 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg flex items-center justify-center text-white transition-colors"
            >
              <Icons.Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
