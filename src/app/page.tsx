import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Features from '@/components/sections/Features';
import VideoGallery from '@/components/sections/VideoGallery';
import Reviews from '@/components/sections/Reviews';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Features />
      <VideoGallery />
      <Reviews />
    </>
  );
}