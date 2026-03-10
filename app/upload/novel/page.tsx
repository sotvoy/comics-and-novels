'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Icons = {
  ArrowLeft: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z" clipRule="evenodd" />
    </svg>
  ),
  Image: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h17.25A2.25 2.25 0 0121.75 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
    </svg>
  ),
};

const GENRES = [
  'Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 
  'Mystery', 'Romance', 'Sci-Fi', 'Sports', 'Slice of Life', 'Supernatural',
  'Historical', 'Psychological', 'Thriller'
];

const STATUS_OPTIONS = [
  { id: 'ongoing', label: 'Ongoing' },
  { id: 'completed', label: 'Completed' },
  { id: 'hiatus', label: 'Hiatus' },
];

export default function UploadNovelPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    alternativeTitle: '',
    author: '',
    synopsis: '',
    description: '',
    genres: [] as string[],
    status: 'ongoing',
    tags: '',
  });

  const handleGenreToggle = (genre: string) => {
    setFormData(prev => ({
      ...prev,
      genres: prev.genres.includes(genre)
        ? prev.genres.filter(g => g !== genre)
        : [...prev.genres, genre]
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    router.push('/write-stories');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pb-20 md:pb-4">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
              <Icons.ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-xl font-bold">Upload Novel</h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Step {step} of 3</span>
            <button
              onClick={() => step < 3 ? setStep(step + 1) : handleSubmit()}
              disabled={isSubmitting}
              className="px-4 py-2 bg-red-500 text-white rounded-lg font-medium disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : step < 3 ? 'Next' : 'Publish'}
            </button>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="flex gap-1 px-4 pb-3">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1 flex-1 rounded-full ${s <= step ? 'bg-red-500' : 'bg-gray-200 dark:bg-gray-700'}`}
            />
          ))}
        </div>
      </div>

      <div className="p-4 max-w-4xl mx-auto">
        {/* Step 1: Basic Info */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-4">Novel Information</h2>
              
              {/* Cover Image */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Cover Image *</label>
                <div className="flex gap-4">
                  <div className="relative w-32 aspect-[3/4] rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600">
                    {coverImage ? (
                      <Image src={coverImage} alt="Cover" fill className="object-cover" />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <Icons.Image className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <button className="w-full py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 hover:border-red-500 hover:text-red-500 transition-colors">
                      Upload Cover Image
                    </button>
                    <p className="text-xs text-gray-500 mt-2">Recommended: 600x800px</p>
                  </div>
                </div>
              </div>

              {/* Title */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter novel title"
                  className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                />
              </div>

              {/* Alternative Title */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Alternative Title</label>
                <input
                  type="text"
                  value={formData.alternativeTitle}
                  onChange={(e) => setFormData({ ...formData, alternativeTitle: e.target.value })}
                  placeholder="Also known as..."
                  className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                />
              </div>

              {/* Author */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Author *</label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  placeholder="Author name"
                  className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Details */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-4">Novel Details</h2>

              {/* Synopsis */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Synopsis * (Short teaser)</label>
                <textarea
                  value={formData.synopsis}
                  onChange={(e) => setFormData({ ...formData, synopsis: e.target.value })}
                  placeholder="A brief summary to hook readers..."
                  rows={3}
                  className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-lg focus:ring-2 focus:ring-red-500 outline-none resize-none"
                />
                <p className="text-xs text-gray-500 mt-1">{formData.synopsis.length}/300 characters</p>
              </div>

              {/* Description */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Full Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detailed story description..."
                  rows={5}
                  className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-lg focus:ring-2 focus:ring-red-500 outline-none resize-none"
                />
              </div>

              {/* Genres */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Genres * (Select up to 3)</label>
                <div className="flex flex-wrap gap-2">
                  {GENRES.map((genre) => (
                    <button
                      key={genre}
                      onClick={() => handleGenreToggle(genre)}
                      disabled={!formData.genres.includes(genre) && formData.genres.length >= 3}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        formData.genres.includes(genre)
                          ? 'bg-red-500 text-white'
                          : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50'
                      }`}
                    >
                      {genre}
                    </button>
                  ))}
                </div>
              </div>

              {/* Status */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Status</label>
                <div className="flex gap-2">
                  {STATUS_OPTIONS.map((status) => (
                    <button
                      key={status.id}
                      onClick={() => setFormData({ ...formData, status: status.id })}
                      className={`px-4 py-2 rounded-lg text-sm font-medium ${
                        formData.status === status.id
                          ? 'bg-red-500 text-white'
                          : 'bg-gray-100 dark:bg-gray-800'
                      }`}
                    >
                      {status.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Tags</label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="Powerful protagonist, System, Reincarnation (comma separated)"
                  className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Preview & Publish */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-4">Preview</h2>

              {/* Preview Card */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                <div className="flex gap-4">
                  <div className="relative w-24 aspect-[3/4] rounded-lg overflow-hidden flex-shrink-0 bg-gray-200">
                    {coverImage ? (
                      <Image src={coverImage} alt="Cover" fill className="object-cover" />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400">
                        <Icons.Image className="w-8 h-8" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{formData.title || 'Untitled'}</h3>
                    <p className="text-sm text-gray-500">{formData.author || 'Unknown Author'}</p>
                    <span className={`inline-block px-2 py-0.5 mt-2 text-xs rounded ${formData.status === 'ongoing' ? 'bg-green-500' : 'bg-blue-500'} text-white`}>{formData.status}</span>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {formData.genres.map((g) => (
                        <span key={g} className="px-2 py-0.5 bg-gray-200 dark:bg-gray-700 text-xs rounded">{g}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                  <span className="font-medium">Synopsis:</span> {formData.synopsis || 'No synopsis provided.'}
                </p>
              </div>

              {/* Guidelines */}
              <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">📋 Before you publish:</h4>
                <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                  <li>• Ensure you have the rights to publish this content</li>
                  <li>• Original novels are encouraged</li>
                  <li>• No plagiarized or copyrighted material</li>
                  <li>• You can add chapters after publishing</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
