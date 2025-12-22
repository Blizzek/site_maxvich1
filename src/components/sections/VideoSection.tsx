"use client";

import { useEffect, useState } from "react";

interface ProjectWithVideos {
  id: string;
  title: string;
  videos?: string[];
}

export function VideoSection() {
  const [items, setItems] = useState<ProjectWithVideos[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/projects');
        if (res.ok) {
          const data = await res.json();
          const filtered = data.filter((p: any) => p.videos && p.videos.length > 0);
          setItems(filtered);
        }
      } catch (err) {
        console.error('Error loading videos:', err);
      }
    };
    load();
  }, []);

  if (!items || items.length === 0) return null;

  return (
    <section id="videos" className="section-padding bg-white">
      <div className="container-custom">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase text-primary-500">Видео</p>
          <h2 className="heading-2">Наши работы — видео</h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <div key={p.id} className="rounded-lg overflow-hidden shadow">
              <video controls className="w-full h-56 object-cover bg-black">
                <source src={p.videos![0]} />
                Ваш браузер не поддерживает видео.
              </video>
              <div className="p-4">
                <h3 className="font-semibold">{p.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
