import React, { useState } from 'react';
import { Instagram, Heart } from 'lucide-react';

const DEFAULT_POSTS = [
  {
    id: 'p1',
    slotNumber: 1,
    title: 'Velocity Pro',
    defaultImg: '/social-p1.jpg',
    likes: '1.4k',
    caption: 'Velocity Runner on the asphalt. #TheNextMove #FOUR5Shoes',
  },
  {
    id: 'p2',
    slotNumber: 2,
    title: 'Street Movement',
    defaultImg: '/social-p2.jpg',
    likes: '2.1k',
    caption: 'Street Pro in monochrome. Made for daily movement.',
  },
  {
    id: 'p3',
    slotNumber: 3,
    title: 'Hometown 45',
    defaultImg: '/story-shoe.jpg',
    likes: '980',
    caption: 'Urban X architectural lines. #ChikhliToWorld',
  },
  {
    id: 'p4',
    slotNumber: 4,
    title: 'Training Essentials',
    defaultImg: '/social-p4.jpg',
    likes: '1.7k',
    caption: 'Kinetic power training gear. #Brand45',
  },
  {
    id: 'p5',
    slotNumber: 5,
    title: 'Classic Court',
    defaultImg: '/social-p5.jpg',
    likes: '3.2k',
    caption: 'Legacy Sneaker. Timeless heritage court vibes.',
  },
  {
    id: 'p6',
    slotNumber: 6,
    title: 'Performance Fit',
    defaultImg: '/social-p6.jpg',
    likes: '840',
    caption: 'Apex Trainer in cloud white. Featherweight engineering.',
  },
];

export const SocialSection: React.FC = () => {
  const [customImages] = useState<Record<string, string>>(() => {
    const map: Record<string, string> = {};
    try {
      const savedSocial = localStorage.getItem('four5_social_images');
      if (savedSocial) {
        const parsed = JSON.parse(savedSocial);
        Object.assign(map, parsed);
      }
    } catch {
      // ignore
    }
    return map;
  });

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#FAFAFB] border-t border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10 space-y-2.5 sm:space-y-3">
          <div className="flex items-center justify-center gap-2.5 sm:gap-3 flex-wrap">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-zinc-200 text-xs font-tech font-bold uppercase tracking-wider text-zinc-800 shadow-xs">
              <Instagram className="w-3.5 h-3.5 text-[#FF4800]" />
              <span>@FOUR5SHOES</span>
            </div>
          </div>

          <h2 className="font-display font-black text-2xl sm:text-4xl lg:text-5xl text-zinc-950 uppercase tracking-tight">
            STEP INTO FOUR5
          </h2>
          <p className="text-zinc-600 text-xs sm:text-sm lg:text-base">
            Follow the movement. Tag <strong className="text-zinc-900">#TheNextMove</strong> and <strong className="text-zinc-900">#FOUR5Shoes</strong> to be featured on our official drop wall.
          </p>
        </div>

        {/* 6-Grid Gallery */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {DEFAULT_POSTS.map((post) => {
            const currentImg = customImages[post.id] || post.defaultImg;

            return (
              <div
                key={post.id}
                className="group relative aspect-square rounded-2xl overflow-hidden bg-zinc-950 shadow-xs border border-zinc-200 hover:border-[#FF4800] hover:shadow-lg transition-all duration-300"
              >
                {/* Image */}
                <img
                  src={currentImg}
                  alt={`FOUR5 Social Post ${post.slotNumber}`}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />

                {/* Slot Number Tag */}
                <div className="absolute top-2 left-2 z-20">
                  <span className="px-1.5 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-white font-tech text-[10px] font-bold border border-white/10">
                    #{post.slotNumber}
                  </span>
                </div>

                {/* Hover overlay with Instagram details */}
                <div className="absolute inset-0 bg-black/65 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-3 text-white pointer-events-none z-10">
                  <div className="flex justify-end">
                    <Instagram className="w-4 h-4 text-white/80" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-xs font-bold text-rose-400">
                      <Heart className="w-3.5 h-3.5 fill-current" />
                      <span>{post.likes}</span>
                    </div>
                    <p className="text-[10px] text-zinc-300 mt-0.5 line-clamp-2">
                      {post.caption}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
