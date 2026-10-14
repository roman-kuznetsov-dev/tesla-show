'use client';

import { useEffect, useRef, useState } from 'react';
import Lightning from './Lightning';

export default function Hero() {
  const [strikeKey, setStrikeKey] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Первый удар при загрузке страницы
  useEffect(() => {
    setStrikeKey(1);
  }, []);

  const handleSoundToggle = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (soundEnabled) {
      audio.pause();
      audio.currentTime = 0;
      setSoundEnabled(false);
    } else {
      audio.currentTime = 0;
      audio.play();
      setSoundEnabled(true);
      // Перезапуск молний синхронно со звуком
      setStrikeKey((prev) => prev + 1);
    }
  };

  // Когда звук закончился — обновить состояние
  const handleAudioEnded = () => {
    setSoundEnabled(false);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-background to-[#1a0b2e]">
      {/* Молнии */}
      <Lightning strikeKey={strikeKey} />

      {/* Свечение снизу */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-secondary/10 to-transparent" />

      {/* Контент */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="hero-fade hero-fade-1 font-heading text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
          Это настоящее
          <br />
          <span className="text-primary">научное волшебство!</span>
        </h1>

        <p className="hero-fade hero-fade-2 text-lg md:text-xl text-muted max-w-2xl mx-auto mb-10">
          Музыка, свет и восторг гостей — на Вашем празднике!
        </p>

        <div className="hero-fade hero-fade-3 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#video"
            className="bg-primary text-background px-8 py-4 rounded-full font-semibold text-lg hover:bg-opacity-90 transition-all hover:scale-105"
          >
            Смотреть видео
          </a>

          <button
            onClick={handleSoundToggle}
            className="flex items-center gap-2 border border-white/20 px-6 py-4 rounded-full font-semibold text-lg hover:bg-white/5 transition-all"
            aria-label={soundEnabled ? 'Выключить звук' : 'Включить звук'}
          >
            <span>{soundEnabled ? '🔊' : '⚡'}</span>
            <span>{soundEnabled ? 'Выключить звук' : 'Включить звук'}</span>
          </button>
        </div>
      </div>

      {/* Скрытое аудио */}
      <audio
        ref={audioRef}
        src="/audio/thunder.mp3"
        preload="auto"
        onEnded={handleAudioEnded}
      />
    </section>
  );
}