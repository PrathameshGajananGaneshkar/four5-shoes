import React from 'react';
import { Instagram, Heart } from 'lucide-react';

export const SocialSection: React.FC = () => {
  const posts = [
    {
      id: 'p1',
      img: '/shoe2.png',
      likes: '1.4k',
      caption: 'Velocity Runner on the asphalt. #TheNextMove #FOUR5Shoes',
    },
    {
      id: 'p2',
      img: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=600&auto=format&fit=crop&q=80',
      likes: '2.1k',
      caption: 'Street Pro in monochrome. Made for daily movement.',
    },
    {
      id: 'p3',
      img: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=600&auto=format&fit=crop&q=80',
      likes: '980',
      caption: 'Urban X architectural lines. #ChikhliToWorld',
    },
    {
      id: 'p4',
      img: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=600&auto=format&fit=crop&q=80',
      likes: '1.7k',
      caption: '45 Street Pro Sneaker in triple onyx. #Brand45',
    },
    {
      id: 'p5',
      img: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600&auto=format&fit=crop&q=80',
      likes: '3.2k',
      caption: 'Legacy Sneaker. Timeless heritage court vibes.',
    },
    {
      id: 'p6',
      img: 'https://images.unsplash.com/photo-1579338559194-a162d19bf842?w=600&auto=format&fit=crop&q=80',
      likes: '840',
      caption: 'Apex Trainer in Volt. Zero slip during heavy lifts.',
    },
  ];

  return (
    <section className="py-20 bg-[#FAFAFB] border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-zinc-200 text-xs font-tech font-bold uppercase tracking-wider text-zinc-800">
            <Instagram className="w-3.5 h-3.5 text-[#FF4800]" />
            <span>@FOUR5SHOES</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-zinc-950 uppercase tracking-tight">
            STEP INTO FOUR5
          </h2>
          <p className="text-zinc-600 text-base">
            Follow the movement. Tag <strong className="text-zinc-900">#TheNextMove</strong> and <strong className="text-zinc-900">#FOUR5Shoes</strong> to be featured on our official drop wall.
          </p>
        </div>

        {/* 6-Grid Gallery */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="group relative aspect-square rounded-2xl overflow-hidden bg-zinc-900 shadow-xs cursor-pointer"
            >
              <img
                src={post.img}
                alt="FOUR5 Community Post"
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
              />

              {/* Hover overlay with instagram icon and likes */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-3.5 text-white">
                <div className="flex justify-end">
                  <Instagram className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-1 text-xs font-bold text-rose-400">
                    <Heart className="w-3.5 h-3.5 fill-current" />
                    <span>{post.likes}</span>
                  </div>
                  <p className="text-[10px] text-zinc-300 mt-1 line-clamp-2">
                    {post.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
