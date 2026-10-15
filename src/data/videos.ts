export type VideoOrientation = 'portrait' | 'landscape';

export type Video = {
  id: string;
  title: string;
  src: string;
  poster: string;
  orientation: VideoOrientation;
};

export const videos: Video[] = [
  {    
    id: 'show-main',
    title: 'Главное выступление',
    src: '/video/show-main.mp4',
    poster: '/images/video/show-main-poster.jpg',
    orientation: 'portrait',
  },
  {
    id: 'show-2',
    title: 'День Рождения',
    src: '/video/show-2.mp4',
    poster: '/images/video/show-2-poster.jpg',
    orientation: 'portrait',
  },
  {
    id: 'show-3',
    title: 'Промо-видео',
    src: '/video/show-3.mp4',
    poster: '/images/video/show-3-poster.jpg',
    orientation: 'portrait',
  },
];