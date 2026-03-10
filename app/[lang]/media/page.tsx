'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { useParams } from 'next/navigation';
import en from '@/dictionaries/en.json';
import fr from '@/dictionaries/fr.json';
import ar from '@/dictionaries/ar.json';

const dictionaries = { en, fr, ar } as const;
type Locale = keyof typeof dictionaries;

type CategoryKey = 'Tournament' | 'Training' | 'Team' | 'Highlights';

interface MediaItem {
  id: string;
  title: string;
  type: 'image' | 'video';
  url: string;
  thumbnail: string;
  category: CategoryKey;
  date: string;
}

const MEDIA: MediaItem[] = [
  { id: '1', title: 'MENA Cup Championship 2025', type: 'image', url: '/Cups/600px-Asia_Cup_Lidoma_allmode.png', thumbnail: '/Cups/600px-Asia_Cup_Lidoma_allmode.png', category: 'Tournament', date: '2025-02-10' },
  { id: '2', title: 'WEC Championship Finals', type: 'image', url: '/Cups/600px-WEC_allmode_full.png', thumbnail: '/Cups/600px-WEC_allmode_full.png', category: 'Tournament', date: '2025-01-28' },
  { id: '3', title: 'C.O.P.A. Free Fire 2025', type: 'image', url: '/Cups/C.O.P.A._Free_Fire_2025_allmode.png', thumbnail: '/Cups/C.O.P.A._Free_Fire_2025_allmode.png', category: 'Tournament', date: '2025-01-20' },
  { id: '4', title: 'Free Fire Clash Cup Morocco', type: 'image', url: '/Cups/Free_Fire_Clash_Cup_Morocco_lightmode.png', thumbnail: '/Cups/Free_Fire_Clash_Cup_Morocco_lightmode.png', category: 'Tournament', date: '2024-12-15' },
  { id: '5', title: 'Clash Squad SEA Cup', type: 'image', url: '/Cups/Free_Fire_Clash_Squad_SEA_Cup_allmode.png', thumbnail: '/Cups/Free_Fire_Clash_Squad_SEA_Cup_allmode.png', category: 'Tournament', date: '2024-12-10' },
  { id: '6', title: 'MAX India Cup 2025', type: 'image', url: '/Cups/Free_Fire_MAX_India_Cup_2025_allmode.png', thumbnail: '/Cups/Free_Fire_MAX_India_Cup_2025_allmode.png', category: 'Tournament', date: '2024-11-28' },
  { id: '7', title: 'MEA Championship 2024', type: 'image', url: '/Cups/Free_Fire_MEA_Championship_2024_base_lightmode.png', thumbnail: '/Cups/Free_Fire_MEA_Championship_2024_base_lightmode.png', category: 'Tournament', date: '2024-11-15' },
  { id: '8', title: 'Free Fire World Cup 2019', type: 'image', url: '/Cups/Free_Fire_World_Cup_2019_allmode.png', thumbnail: '/Cups/Free_Fire_World_Cup_2019_allmode.png', category: 'Tournament', date: '2024-10-20' },
  { id: '9', title: 'World Esports Cup 2021', type: 'image', url: '/Cups/Indias-Free-Fire-team-Total-Gaming-wins-the-World-Esports-Cup-2021-Title.jpg', thumbnail: '/Cups/Indias-Free-Fire-team-Total-Gaming-wins-the-World-Esports-Cup-2021-Title.jpg', category: 'Tournament', date: '2024-10-05' },
  { id: '10', title: 'Championship Celebration', type: 'image', url: '/Cups/776d2b84f52ac9e99a856dab9beac1bf.jpeg', thumbnail: '/Cups/776d2b84f52ac9e99a856dab9beac1bf.jpeg', category: 'Highlights', date: '2024-09-28' },
  { id: '11', title: 'Victory Moment', type: 'image', url: '/Cups/maxresdefault.jpg', thumbnail: '/Cups/maxresdefault.jpg', category: 'Highlights', date: '2024-09-15' },
  { id: '12', title: 'Tournament Highlights', type: 'image', url: '/Cups/maxresdefault%20(1).jpg', thumbnail: '/Cups/maxresdefault%20(1).jpg', category: 'Highlights', date: '2024-09-01' },
];

export default function MediaPage() {
  const params = useParams();
  const currentLang = (params?.lang as Locale) || 'en';
  const t = dictionaries[currentLang]?.media || dictionaries.en.media;

  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Build unique category keys from the data
  const uniqueCategories: CategoryKey[] = [...new Set(MEDIA.map((m) => m.category))];

  // Get translated label for a category key
  const getCategoryLabel = (key: CategoryKey) => t.categories[key] ?? key;

  const filteredMedia = activeCategory === 'all' ? MEDIA : MEDIA.filter((m) => m.category === activeCategory);

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="text-accent">{t.title}</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">{t.description}</p>
        </div>

        {/* Filter */}
        <div className="flex gap-3 overflow-x-auto pb-8 mb-12">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-6 py-2 rounded-full font-semibold transition-smooth whitespace-nowrap ${
              activeCategory === 'all' ? 'bg-accent text-accent-foreground' : 'glass border border-border hover:border-accent/30'
            }`}
          >
            {t.all}
          </button>
          {uniqueCategories.map((key) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`px-6 py-2 rounded-full font-semibold transition-smooth whitespace-nowrap ${
                activeCategory === key ? 'bg-accent text-accent-foreground' : 'glass border border-border hover:border-accent/30'
              }`}
            >
              {getCategoryLabel(key)}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {filteredMedia.map((media) => (
            <button
              key={media.id}
              onClick={() => setSelectedMedia(media)}
              className="group relative aspect-square rounded-lg overflow-hidden cursor-pointer transition-smooth"
            >
              <img src={media.thumbnail} alt={media.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 transition-transform">
                <p className="text-white font-semibold text-sm line-clamp-2">{media.title}</p>
              </div>
            </button>
          ))}
        </div>

        {filteredMedia.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">{t.noMedia}</p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {selectedMedia && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedMedia(null)}>
          <div className="relative max-w-4xl w-full max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSelectedMedia(null)} className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black rounded-lg transition-colors" aria-label="Close">
              <X size={24} className="text-white" />
            </button>
            <div className="flex-1 flex items-center justify-center overflow-auto">
              <img src={selectedMedia.url} alt={selectedMedia.title} className="max-w-full max-h-full object-contain" />
            </div>
            <div className="glass p-6 border-t border-border">
              <h3 className="text-xl font-bold mb-2">{selectedMedia.title}</h3>
              <div className="flex gap-4 text-sm text-muted-foreground">
                <span className="px-2 py-1 bg-accent/20 text-accent rounded">{getCategoryLabel(selectedMedia.category)}</span>
                <span>{new Date(selectedMedia.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
