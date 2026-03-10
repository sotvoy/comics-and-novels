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
  X: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
    </svg>
  ),
  Plus: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
    </svg>
  ),
  Image: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h17.25A2.25 2.25 0 0121.75 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
    </svg>
  ),
};

const POST_TYPES = [
  { id: 'news', label: 'News', icon: '📰', description: 'Announcements and updates' },
  { id: 'event', label: 'Event', icon: '🎉', description: 'Live events and meetups' },
  { id: 'community', label: 'Community', icon: '💬', description: 'Discussions and posts' },
];

export default function UploadPostPage() {
  const router = useRouter();
  const [postType, setPostType] = useState('community');
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: '',
  });

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    router.push('/community');
  };

  const handleAddImage = () => {
    // Simulate adding an image
    const newImage = `https://picsum.photos/seed/${Date.now()}/800/600`;
    setImages([...images, newImage]);
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
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
            <h1 className="text-xl font-bold">Create Post</h1>
          </div>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !formData.title || !formData.content}
            className="px-4 py-2 bg-red-500 text-white rounded-lg font-medium disabled:opacity-50"
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              'Post'
            )}
          </button>
        </div>
      </div>

      <div className="p-4 max-w-4xl mx-auto">
        {/* Post Type Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Post Type</label>
          <div className="grid grid-cols-3 gap-2">
            {POST_TYPES.map((type) => (
              <button
                key={type.id}
                onClick={() => setPostType(type.id)}
                className={`p-4 rounded-xl text-center transition-colors ${
                  postType === type.id
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <span className="text-2xl mb-1 block">{type.icon}</span>
                <span className="font-medium text-sm">{type.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Cover Image */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Cover Image (optional)</label>
          <div className="relative h-48 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600">
            {coverImage ? (
              <>
                <Image src={coverImage} alt="Cover" fill className="object-cover" />
                <button
                  onClick={() => setCoverImage(null)}
                  className="absolute top-2 right-2 p-2 bg-black/50 rounded-full text-white hover:bg-black/70"
                >
                  <Icons.X className="w-4 h-4" />
                </button>
              </>
            ) : (
              <button onClick={() => setCoverImage('https://picsum.photos/seed/cover/1200/400')} className="flex flex-col items-center justify-center w-full h-full text-gray-500">
                <Icons.Image className="w-10 h-10 mb-2" />
                <span className="text-sm">Tap to add cover image</span>
              </button>
            )}
          </div>
        </div>

        {/* Title */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Title *</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Enter post title..."
            className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-lg focus:ring-2 focus:ring-red-500 outline-none text-lg font-medium"
          />
        </div>

        {/* Content */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Content *</label>
          <textarea
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            placeholder="Write your post content here..."
            rows={8}
            className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-lg focus:ring-2 focus:ring-red-500 outline-none resize-none"
          />
          <p className="text-xs text-gray-500 mt-1">{formData.content.length} characters</p>
        </div>

        {/* Additional Images Gallery */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Gallery (optional)</label>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {images.map((img, index) => (
              <div key={index} className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                <Image src={img} alt={`Image ${index + 1}`} fill className="object-cover" />
                <button
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-1 right-1 p-1 bg-black/50 rounded-full text-white"
                >
                  <Icons.X className="w-3 h-3" />
                </button>
              </div>
            ))}
            <button
              onClick={handleAddImage}
              className="w-24 h-24 flex-shrink-0 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center text-gray-500"
            >
              <Icons.Plus className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Tags */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Tags</label>
          <input
            type="text"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            placeholder="tag1, tag2, tag3 (comma separated)"
            className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
          />
        </div>

        {/* Preview */}
        <div className="mb-6">
          <h3 className="text-sm font-medium mb-2">Preview</h3>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden">
            {coverImage && (
              <div className="relative h-40">
                <Image src={coverImage} alt="Cover" fill className="object-cover" />
              </div>
            )}
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                  postType === 'news' ? 'bg-blue-100 text-blue-600' :
                  postType === 'event' ? 'bg-purple-100 text-purple-600' :
                  'bg-green-100 text-green-600'
                }`}>
                  {POST_TYPES.find(t => t.id === postType)?.label}
                </span>
              </div>
              <h4 className="font-bold text-lg">{formData.title || 'Untitled Post'}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-3">
                {formData.content || 'No content yet...'}
              </p>
            </div>
          </div>
        </div>

        {/* Guidelines */}
        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
          <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">📋 Post Guidelines:</h4>
          <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
            <li>• Be respectful and follow community rules</li>
            <li>• No spam or self-promotion without contribution</li>
            <li>• Use appropriate images and content</li>
            <li>• Tag your post correctly for better visibility</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
