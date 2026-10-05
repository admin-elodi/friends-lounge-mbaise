// src/pages/Gallery.jsx
import React, { useState, useEffect, useMemo } from 'react';
// import GalleryHeader from '@/components/gallery/GalleryHeader';
// import GalleryGrid from '@/components/gallery/GalleryGrid';
// import GalleryUploadModal from '@/components/gallery/GalleryUploadModal';

// Initial default categories (fallback before dynamic database fetch)
const DEFAULT_CATEGORIES = [
  { id: 'all', name: 'All Media', slug: 'all' },
  { id: 'the-place', name: 'The Place', slug: 'the-place' },
  { id: 'food-drinks', name: 'Food & Drinks', slug: 'food-drinks' },
  { id: 'friday-nights', name: 'Friday Nights', slug: 'friday-nights' },
  { id: 'saturday-nights', name: 'Saturday Nights', slug: 'saturday-nights' },
  { id: 'entertainment', name: 'Entertainment', slug: 'entertainment' },
  { id: 'community', name: 'Mbaise & Community', slug: 'community' },
];

export default function Gallery() {
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest'); // 'newest' | 'oldest' | 'alphabetical' | 'featured'
  const [searchQuery, setSearchQuery] = useState('');
  const [mediaItems, setMediaItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // Can be tied to Appwrite auth context

  // Fetch Media and Categories (Appwrite or Local API)
  useEffect(() => {
    let isMounted = true;
    async function loadGalleryData() {
      setIsLoading(true);
      try {
        // TODO: Replace with Appwrite database queries
        // const fetchedCategories = await appwrite.databases.listDocuments(...);
        // const fetchedMedia = await appwrite.databases.listDocuments(...);
        
        if (isMounted) {
          setMediaItems([]); // Hydrated with database records
        }
      } catch (error) {
        console.error('Failed to load gallery data:', error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadGalleryData();
    return () => { isMounted = false; };
  }, []);

  // Filter & Sort Pipeline
  const filteredAndSortedMedia = useMemo(() => {
    return mediaItems
      .filter((item) => {
        const matchesCategory =
          selectedCategory === 'all' || item.categoryId === selectedCategory;
        const matchesSearch =
          !searchQuery ||
          item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description?.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'newest') return new Date(b.eventDate || b.$createdAt) - new Date(a.eventDate || a.$createdAt);
        if (sortBy === 'oldest') return new Date(a.eventDate || a.$createdAt) - new Date(b.eventDate || b.$createdAt);
        if (sortBy === 'alphabetical') return (a.title || '').localeCompare(b.title || '');
        if (sortBy === 'featured') return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        return 0;
      });
  }, [mediaItems, selectedCategory, searchQuery, sortBy]);

  const handleMediaUploaded = (newMediaBatch) => {
    setMediaItems((prev) => [...newMediaBatch, ...prev]);
  };

  const handleCategoryCreated = (newCategory) => {
    setCategories((prev) => [...prev, newCategory]);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header & Controls Section */}
        <GalleryHeader
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          sortBy={sortBy}
          onSortChange={setSortBy}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          isAdmin={isAdmin}
          onOpenUpload={() => setIsUploadModalOpen(true)}
        />

        {/* Media Grid Section */}
        <GalleryGrid
          items={filteredAndSortedMedia}
          isLoading={isLoading}
        />

        {/* Upload Modal (Admin / Management) */}
        {isUploadModalOpen && (
          <GalleryUploadModal
            categories={categories}
            onClose={() => setIsUploadModalOpen(false)}
            onMediaUploaded={handleMediaUploaded}
            onCategoryCreated={handleCategoryCreated}
          />
        )}
      </div>
    </div>
  );
}