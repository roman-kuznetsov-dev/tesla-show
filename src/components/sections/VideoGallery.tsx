'use client';

import Image from 'next/image';
import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import useEmblaCarousel from 'embla-carousel-react';
import { Play } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import { useInView } from '@/hooks/useInView';
import { videos, type Video } from '@/data/videos';
import { galleryPhotos } from '@/data/gallery';

function VideoPoster({
  video,
  priority = false,
  sizes = '100vw',
  alt = '',
}: {
  video: Video;
  priority?: boolean;
  sizes?: string;
  alt?: string;
}) {
  return (
    <div className="absolute inset-0">
      <Image
        src={video.poster}
        alt=""
        fill
        sizes={sizes}
        aria-hidden="true"
        className="object-cover blur-2xl scale-110 opacity-60"
      />
      <Image
        src={video.poster}
        alt={alt || video.title}
        fill
        sizes={sizes}
        priority={priority}
        className="object-contain"
      />
    </div>
  );
}



export default function VideoGallery() {
  const { ref, inView } = useInView<HTMLElement>();

  // Состояние: открытое видео (в модалке)
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);

  // Состояние: индекс фото в лайтбоксе (-1 = закрыто)
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  // Слайдер фото (для мобилки)
  const [emblaRef] = useEmblaCarousel({ loop: true, align: 'start' });

  const openVideo = (video: Video) => setActiveVideo(video);
  const closeVideo = () => setActiveVideo(null);

  const activeAspect = activeVideo?.orientation === 'portrait'
    ? 'max-h-[85vh] w-auto aspect-[9/16]'
    : 'w-full aspect-video';

  return (
    <section
      id="gallery"
      ref={ref}
      className={`relative py-20 md:py-32 reveal ${
        inView ? 'reveal--visible' : ''
      }`}
    >
      {/* Подсветка в углу */}
      <div
        className="pointer-events-none absolute -top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px]"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 relative">
        {/* Метка */}
        <p className="text-primary font-semibold tracking-widest text-sm uppercase text-center mb-4">
          Галерея
        </p>

        {/* Заголовок */}
        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-center max-w-3xl mx-auto mb-16">
          Как это выглядит <span className="text-primary">вживую</span>
        </h2>

        {/* === ВИДЕО — СЕТКА === */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 md:mb-24">
          {videos.map((video, index) => (
            <button
              key={video.id}
              onClick={() => openVideo(video)}
              className={`group relative block w-full aspect-video rounded-2xl overflow-hidden border border-white/10 transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_40px_rgba(0,217,255,0.15)] ${
                index === 2
                  ?'md:col-span-2 md:max-w-[calc(50%-0.75rem)] md:mx-auto lg:col-span-1 lg:max-w-none'
                  : ''
              }`}
              aria-label={`Смотреть видео: ${video.title}`}
            >
              <VideoPoster
                video={video}
                priority={index === 0}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-primary/90 text-background flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  <Play size={24} fill="currentColor" className="ml-0.5" />
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-5 text-left">
                <h3 className="font-heading text-lg font-bold">{video.title}</h3>
              </div>
            </button>
          ))}
        </div>

        {/* === ФОТО === */}
        {/* Слайдер — только на мобилке */}
        <div className="md:hidden overflow-hidden -mx-4" ref={emblaRef}>
          <div className="flex gap-4 pl-4">
            {galleryPhotos.map((photo, index) => (
              <button
                key={photo.src}
                onClick={() => setLightboxIndex(index)}
                className="group relative shrink-0 w-[80vw] max-w-[400px] aspect-[4/3] rounded-2xl overflow-hidden border border-white/10"
                aria-label={`Открыть фото: ${photo.alt}`}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="80vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 text-white text-3xl transition-opacity duration-300">
                    🔍
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Сетка — на планшете и десктопе */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryPhotos.map((photo, index) => (
            <button
              key={photo.src}
              onClick={() => setLightboxIndex(index)}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 transition-all duration-300 hover:border-primary/40"
              aria-label={`Открыть фото: ${photo.alt}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 1024px) 50vw, 400px"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 text-white text-3xl transition-opacity duration-300">
                  🔍
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* === МОДАЛКА ВИДЕО === */}
      <Modal
        isOpen={activeVideo !== null}
        onClose={closeVideo}
        ariaLabel={activeVideo ? `Видео: ${activeVideo.title}` : 'Видео'}
      >
        {activeVideo && (
          <div className="flex items-center justify-center">
            <video
            src={activeVideo.src}
            poster={activeVideo.poster}
            controls
            autoPlay
            playsInline
            className={`rounded-2xl bg-black ${activeAspect}`}
          >
            Ваш браузер не поддерживает видео.
            </video>
          </div>
        )}
      </Modal>

      {/* === ЛАЙТБОКС ФОТО === */}
      <Lightbox
        open={lightboxIndex >= 0}
        index={lightboxIndex}
        close={() => setLightboxIndex(-1)}
        slides={galleryPhotos.map((photo) => ({ src: photo.src, alt: photo.alt }))}
      />
    </section>
  );
}