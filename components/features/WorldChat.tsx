'use client';

import { useState, useRef, useEffect } from 'react';
import Icons from '@/components/ui/Icons';

interface ChatMessage {
  id: number;
  user: string;
  message: string;
  time: string;
}

const initialMessages: ChatMessage[] = [
  { id: 1, user: 'User123', message: 'Solo Leveling chapter 180 was amazing!', time: '2m ago' },
  { id: 2, user: 'AnimeFan', message: 'Anyone reading Tower of God?', time: '5m ago' },
  { id: 3, user: 'ReaderPro', message: 'New series dropped on comics section', time: '8m ago' },
];

export default function WorldChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [position, setPosition] = useState({ x: 16, y: 80 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<HTMLButtonElement>(null);
  const dragOffset = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragOffset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.current.x,
          y: e.clientY - dragOffset.current.y,
        });
      }
    };
    const handleMouseUp = () => setIsDragging(false);

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, {
        id: Date.now(),
        user: 'You',
        message: newMessage,
        time: 'now'
      }]);
      setNewMessage('');
    }
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          ref={dragRef}
          onMouseDown={handleMouseDown}
          onClick={() => setIsOpen(true)}
          className="fixed z-40 bottom-20 right-4 w-14 h-14 bg-red-500 rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors cursor-move"
          style={{ left: position.x, top: position.y }}
        >
          <Icons.Chat className="w-6 h-6 text-white" />
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">3</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          className="fixed z-50 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-72 sm:w-80 overflow-hidden border border-gray-200 dark:border-gray-700"
          style={{ left: position.x, top: position.y }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between p-3 bg-red-500 text-white cursor-move"
            onMouseDown={handleMouseDown}
          >
            <div className="flex items-center gap-2">
              <Icons.Chat className="w-5 h-5" />
              <span className="font-semibold">World Chat</span>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => alert('Super Chat coming soon!')} className="p-1 hover:bg-red-600 rounded" title="Super Chat">
                ⭐
              </button>
              <button onClick={() => setPosition({ x: 16, y: 80 })} className="p-1 hover:bg-red-600 rounded">
                <Icons.Minimize className="w-4 h-4" />
              </button>
              <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-red-600 rounded">
                <Icons.Close className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="h-64 overflow-y-auto p-3 space-y-3 bg-gray-50 dark:bg-gray-800">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex flex-col ${msg.user === 'You' ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-[80%] px-3 py-2 rounded-xl ${
                  msg.user === 'You'
                    ? 'bg-red-500 text-white'
                    : 'bg-white dark:bg-gray-700'
                }`}>
                  {msg.user !== 'You' && <span className="text-xs font-semibold text-red-500">{msg.user}</span>}
                  <p className="text-sm">{msg.message}</p>
                </div>
                <span className="text-xs text-gray-400 mt-1">{msg.time}</span>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Say something..."
                className="flex-1 px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button
                onClick={sendMessage}
                className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
              >
                <Icons.Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
