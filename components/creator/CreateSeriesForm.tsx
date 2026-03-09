'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';

interface SeriesFormData {
  title: string;
  slug: string;
  description: string;
  type: 'comic' | 'novel';
  status: 'ongoing' | 'completed' | 'hiatus';
  contentType: 'manga' | 'manhwa' | 'manhua';
  genres: string[];
  tags: string;
  cover: File | null;
  isNsfw: boolean;
  ageRating: number;
}

const GENRES = [
  'Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror',
  'Mystery', 'Romance', 'Sci-Fi', 'Slice of Life', 'Sports',
  'Supernatural', 'Psychological', 'Thriller', 'Historical'
];

export default function CreateSeriesForm() {
  const router = useRouter();
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<SeriesFormData>({
    title: '',
    slug: '',
    description: '',
    type: 'comic',
    status: 'ongoing',
    contentType: 'manhwa',
    genres: [],
    tags: '',
    cover: null,
    isNsfw: false,
    ageRating: 0
  });

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: generateSlug(title)
    }));
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, cover: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleGenre = (genre: string) => {
    setFormData(prev => ({
      ...prev,
      genres: prev.genres.includes(genre)
        ? prev.genres.filter(g => g !== genre)
        : [...prev.genres, genre]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!user) {
      setError('You must be logged in to create a series');
      return;
    }

    if (!formData.title || !formData.description || !formData.cover) {
      setError('Please fill in all required fields');
      return;
    }

    if (formData.genres.length === 0) {
      setError('Please select at least one genre');
      return;
    }

    setLoading(true);

    try {
      let coverUrl = '';
      
      if (formData.cover) {
        const fileName = `${user.id}/${formData.slug}/${Date.now()}-${formData.cover.name}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('covers')
          .upload(fileName, formData.cover);

        if (uploadError) {
          console.warn('Cover upload failed, using placeholder:', uploadError);
          coverUrl = `https://picsum.photos/seed/${formData.slug}/300/450`;
        } else {
          const { data: { publicUrl } } = supabase.storage
            .from('covers')
            .getPublicUrl(fileName);
          coverUrl = publicUrl;
        }
      }

      const { data: series, error: seriesError } = await supabase
        .from('series')
        .insert({
          title: formData.title,
          slug: formData.slug,
          description: formData.description,
          type: formData.type,
          status: formData.status,
          content_type: formData.contentType,
          cover: coverUrl || `https://picsum.photos/seed/${formData.slug}/300/450`,
          user_id: user.id,
          author: user.user_metadata?.username || 'Anonymous',
          is_nsfw: formData.isNsfw,
          age_rating: formData.ageRating
        })
        .select()
        .single();

      if (seriesError) throw seriesError;

      if (formData.genres.length > 0) {
        const { data: genreData } = await supabase
          .from('genres')
          .select('id, name')
          .in('name', formData.genres);

        if (genreData) {
          const seriesGenres = genreData.map(g => ({
            series_id: series.id,
            genre_id: g.id
          }));
          await supabase.from('series_genres').insert(seriesGenres);
        }
      }

      if (formData.tags) {
        const tags = formData.tags.split(',').map(t => t.trim()).filter(Boolean);
        const seriesTags = tags.map(tag => ({
          series_id: series.id,
          tag
        }));
        await supabase.from('series_tags').insert(seriesTags);
      }

      router.push(`/series/${formData.slug}`);
    } catch (err: any) {
      console.error('Error creating series:', err);
      setError(err.message || 'Failed to create series. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 pb-24">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Create New Series</h1>

        {error && (
          <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Cover Image *</label>
            <div className="flex gap-4 items-start">
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="w-32 h-48 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 overflow-hidden"
              >
                {coverPreview ? (
                  <img src={coverPreview} alt="Cover preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center p-4">
                    <svg className="w-8 h-8 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span className="text-xs text-gray-500">Upload Cover</span>
                  </div>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleCoverChange}
                className="hidden"
              />
              <div className="text-sm text-gray-500">
                <p>Recommended: 300x450 pixels</p>
                <p>Formats: JPG, PNG, WebP</p>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
              placeholder="Enter series title"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description *</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
              rows={4}
              placeholder="Describe your series..."
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Type *</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as 'comic' | 'novel' }))}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
              >
                <option value="comic">Comic</option>
                <option value="novel">Novel</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Status *</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as any }))}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
              >
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
                <option value="hiatus">On Hiatus</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Content Type *</label>
            <div className="flex gap-2">
              {(['manga', 'manhwa', 'manhua'] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, contentType: type }))}
                  className={`px-4 py-2 rounded-lg border capitalize ${
                    formData.contentType === type
                      ? 'border-red-500 bg-red-50 dark:bg-red-900/30 text-red-500'
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Genres *</label>
            <div className="flex flex-wrap gap-2">
              {GENRES.map((genre) => (
                <button
                  key={genre}
                  type="button"
                  onClick={() => toggleGenre(genre)}
                  className={`px-3 py-1.5 rounded-full text-sm border ${
                    formData.genres.includes(genre)
                      ? 'border-red-500 bg-red-50 dark:bg-red-900/30 text-red-500'
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Tags</label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
              placeholder="e.g. isekai, reincarnation, magic"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Series'}
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
