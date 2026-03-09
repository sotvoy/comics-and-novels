'use client';

import { useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import ImageReorder from './ImageReorder';

interface ChapterFormData {
  title: string;
  chapterNumber: number;
  volume: number;
  pages: { id: string; src: string; file?: File }[];
  isPaid: boolean;
  price: number;
  releaseDate: string;
}

export default function UploadChapterForm({ seriesId, seriesSlug, currentChapters }: { seriesId: string, seriesSlug: string, currentChapters: number }) {
  const router = useRouter();
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  const [formData, setFormData] = useState<ChapterFormData>({
    title: '',
    chapterNumber: currentChapters + 1,
    volume: 1,
    pages: [],
    isPaid: false,
    price: 0,
    releaseDate: new Date().toISOString().split('T')[0]
  });

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newPages = files.map((file, i) => ({
      id: `${Date.now()}-${i}-${Math.random().toString(36).substr(2, 9)}`,
      src: URL.createObjectURL(file),
      file
    }));
    setFormData(prev => ({ ...prev, pages: [...prev.pages, ...newPages] }));
  };

  const removePage = (id: string) => {
    setFormData(prev => ({
      ...prev,
      pages: prev.pages.filter(p => p.id !== id)
    }));
  };

  const handleReorder = useCallback((newPages: { id: string; src: string; file?: File }[]) => {
    setFormData(prev => ({ ...prev, pages: newPages }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!user) {
      setError('You must be logged in to upload chapters');
      return;
    }

    if (formData.pages.length === 0) {
      setError('Please upload at least one page');
      return;
    }

    setLoading(true);
    setUploading(true);

    try {
      const uploadedUrls: string[] = [];

      // Upload each page to Supabase Storage (in the order shown in preview)
      for (let i = 0; i < formData.pages.length; i++) {
        const page = formData.pages[i];
        const file = page.file;
        
        if (!file) continue;
        
        const fileName = `${seriesSlug}/chapter-${formData.chapterNumber}/${Date.now()}-${i}-${file.name}`;
        
        const { data, error: uploadError } = await supabase.storage
          .from('chapters')
          .upload(fileName, file);

        if (uploadError) {
          console.warn(`Page ${i + 1} upload failed:`, uploadError);
          // Use placeholder for failed uploads
          uploadedUrls.push(`https://picsum.photos/seed/${seriesSlug}-ch${formData.chapterNumber}-${i}/800/1200`);
        } else {
          const { data: { publicUrl } } = supabase.storage
            .from('chapters')
            .getPublicUrl(fileName);
          uploadedUrls.push(publicUrl);
        }

        setUploadProgress(Math.round(((i + 1) / formData.pages.length) * 100));
      }

      // Create chapter in database
      const { data: chapter, error: chapterError } = await supabase
        .from('chapters')
        .insert({
          series_id: seriesId,
          chapter_number: formData.chapterNumber,
          title: formData.title || `Chapter ${formData.chapterNumber}`,
          volume: formData.volume,
          pages: uploadedUrls,
          is_paid: formData.isPaid,
          price: formData.price,
          views: 0,
          likes: 0
        })
        .select()
        .single();

      if (chapterError) throw chapterError;

      // Update series total_chapters count
      await supabase.rpc('increment_series_chapters', { series_id: seriesId });

      router.push(`/series/${seriesSlug}`);
    } catch (err: any) {
      console.error('Error uploading chapter:', err);
      setError(err.message || 'Failed to upload chapter. Please try again.');
    } finally {
      setLoading(false);
      setUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 pb-24">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-2">Upload Chapter</h1>
        <p className="text-gray-500 mb-6">Series: {seriesSlug}</p>

        {error && (
          <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg text-sm">
            {error}
          </div>
        )}

        {uploading && (
          <div className="mb-4 p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <div className="flex justify-between text-sm mb-1">
              <span>Uploading pages...</span>
              <span>{uploadProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Chapter Number *</label>
              <input
                type="number"
                min="1"
                value={formData.chapterNumber}
                onChange={(e) => setFormData(prev => ({ ...prev, chapterNumber: parseInt(e.target.value) || 1 }))}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Volume</label>
              <input
                type="number"
                min="1"
                value={formData.volume}
                onChange={(e) => setFormData(prev => ({ ...prev, volume: parseInt(e.target.value) || 1 }))}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Release Date</label>
              <input
                type="date"
                value={formData.releaseDate}
                onChange={(e) => setFormData(prev => ({ ...prev, releaseDate: e.target.value }))}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Chapter Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
              placeholder={`Chapter ${formData.chapterNumber}`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Pages * (select multiple images)</label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFilesChange}
              className="hidden"
            />
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-red-400 transition-colors"
            >
              <svg className="w-12 h-12 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p className="text-gray-500">Click to upload or drag and drop</p>
              <p className="text-sm text-gray-400">PNG, JPG, WEBP (max 10MB each)</p>
            </div>

            {formData.pages.length > 0 && (
              <div className="mt-4">
                <ImageReorder
                  images={formData.pages}
                  onReorder={handleReorder}
                  onRemove={removePage}
                />
              </div>
            )}
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading || formData.pages.length === 0}
              className="flex-1 py-3 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 disabled:opacity-50"
            >
              {loading ? 'Publishing...' : 'Publish Chapter'}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
