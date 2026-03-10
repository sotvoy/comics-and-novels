'use client';

import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import Icons from '@/components/ui/Icons';

interface NovelEditorProps {
  initialContent?: string;
  initialTitle?: string;
  onSave?: (title: string, content: string) => void;
  onPublish?: (title: string, content: string) => void;
}

export default function NovelEditor({
  initialContent = '',
  initialTitle = '',
  onSave,
  onPublish,
}: NovelEditorProps) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [isSaving, setIsSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const editorRef = useRef<HTMLTextAreaElement>(null);

  // Calculate word count
  const updateWordCount = useCallback((text: string) => {
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
  }, []);

  // Handle content change
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    updateWordCount(newContent);
  };

  // Handle save
  const handleSave = async () => {
    if (!title.trim()) {
      alert('Please enter a title');
      return;
    }
    setIsSaving(true);
    await onSave?.(title, content);
    setTimeout(() => setIsSaving(false), 1000);
  };

  // Handle publish
  const handlePublish = async () => {
    if (!title.trim()) {
      alert('Please enter a title');
      return;
    }
    if (!content.trim()) {
      alert('Please write some content');
      return;
    }
    await onPublish?.(title, content);
  };

  // Insert text at cursor
  const insertText = (before: string, after: string = '') => {
    const textarea = editorRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    const newText = content.substring(0, start) + before + selectedText + after + content.substring(end);
    
    setContent(newText);
    updateWordCount(newText);

    // Set cursor position after insertion
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length);
    }, 0);
  };

  // Formatting buttons
  const formatButtons = [
    { icon: Icons.Star, action: () => insertText('**', '**'), label: 'Bold' },
    { icon: Icons.Zap, action: () => insertText('*', '*'), label: 'Italic' },
    { icon: Icons.Flame, action: () => insertText('~~', '~~'), label: 'Strikethrough' },
    { type: 'divider' },
    { icon: Icons.Newspaper, action: () => insertText('## '), label: 'Heading' },
    { icon: Icons.List, action: () => insertText('- '), label: 'Bullet List' },
    { icon: Icons.List, action: () => insertText('1. '), label: 'Numbered List' },
    { type: 'divider' },
    { icon: Icons.Chat, action: () => insertText('> '), label: 'Quote' },
    { icon: Icons.ExternalLink, action: () => insertText('[', '](url)'), label: 'Link' },
    { icon: Icons.Folder, action: () => insertText('![alt](', ')'), label: 'Image' },
  ];

  return (
    <div className={`h-full flex flex-col ${isFullscreen ? 'fixed inset-0 z-50 bg-white dark:bg-gray-900' : ''}`}>
      {/* Toolbar */}
      <div className="flex items-center gap-2 p-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 flex-wrap">
        {/* Title Input */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Chapter Title..."
          className="flex-1 px-3 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-red-500"
        />

        <div className="w-px h-8 bg-gray-300 dark:bg-gray-600" />

        {/* Formatting Buttons */}
        <div className="flex items-center gap-1">
          {formatButtons.map((btn, index) => 
            btn.type === 'divider' ? (
              <div key={index} className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" />
            ) : (
              <button
                key={index}
                onClick={btn.action}
                title={btn.label}
                className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                {btn.icon && <btn.icon className="w-4 h-4" />}
              </button>
            )
          )}
        </div>

        <div className="w-px h-8 bg-gray-300 dark:bg-gray-600" />

        {/* Preview Toggle */}
        <button
          onClick={() => setShowPreview(!showPreview)}
          className={`p-2 rounded transition-colors ${
            showPreview ? 'bg-red-500 text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          <Icons.Eye className="w-4 h-4" />
        </button>

        {/* Fullscreen Toggle */}
        <button
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          {isFullscreen ? (
            <Icons.Minimize className="w-4 h-4" />
          ) : (
            <Icons.Maximize className="w-4 h-4" />
          )}
        </button>

        <div className="w-px h-8 bg-gray-300 dark:bg-gray-600" />

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors flex items-center gap-2"
        >
          {isSaving ? (
            <div className="w-4 h-4 border-2 border-gray-500 border-t-transparent rounded-full animate-spin" />
          ) : (
            <Icons.Bookmark className="w-4 h-4" />
          )}
          Save Draft
        </button>

        {/* Publish Button */}
        <button
          onClick={handlePublish}
          className="px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors flex items-center gap-2"
        >
          <Icons.Send className="w-4 h-4" />
          Publish
        </button>
      </div>

      {/* Editor / Preview Split */}
      <div className="flex-1 flex overflow-hidden">
        {/* Editor */}
        <div className={`flex-1 ${showPreview ? 'w-1/2' : 'w-full'} flex flex-col`}>
          <textarea
            ref={editorRef}
            value={content}
            onChange={handleContentChange}
            placeholder="Start writing your story...

Tips:
- Use **bold** for emphasis
- Use *italic* for thoughts/inner dialogue
- Use ## for chapter headings
- Use > for dialogue or quotes
- Use - for bullet points"
            className="flex-1 p-6 resize-none focus:outline-none font-serif text-lg leading-relaxed bg-white dark:bg-gray-900"
            style={{ lineHeight: '1.8' }}
          />
        </div>

        {/* Preview */}
        {showPreview && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-1/2 border-l border-gray-200 dark:border-gray-700 overflow-y-auto bg-gray-50 dark:bg-gray-800"
          >
            <div className="p-6 font-serif text-lg leading-relaxed prose dark:prose-invert max-w-none">
              {content ? (
                <div dangerouslySetInnerHTML={{ __html: content
                  .replace(/^## (.+)$/gm, '<h2>$1</h2>')
                  .replace(/^### (.+)$/gm, '<h3>$1</h3>')
                  .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                  .replace(/\*(.+?)\*/g, '<em>$1</em>')
                  .replace(/~~(.+?)~~/g, '<del>$1</del>')
                  .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
                  .replace(/^- (.+)$/gm, '<li>$1</li>')
                  .replace(/^(\d+)\. (.+)$/gm, '<li>$2</li>')
                  .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')
                  .replace(/!\[(.+?)\]\((.+?)\)/g, '<img alt="$1" src="$2" />')
                  .replace(/\n/g, '<br />')
                }} />
              ) : (
                <p className="text-gray-400 italic">Nothing to preview yet...</p>
              )}
            </div>
          </motion.div>
        )}
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between px-4 py-2 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-500">
        <div className="flex items-center gap-4">
          <span>{wordCount} words</span>
          <span>{content.length} characters</span>
        </div>
        <div className="flex items-center gap-4">
          <span>{content.split('\n').length} lines</span>
          <span className="text-green-500">Auto-saved</span>
        </div>
      </div>
    </div>
  );
}
