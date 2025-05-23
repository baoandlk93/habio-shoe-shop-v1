"use client";
import React, { useState, useEffect } from "react";

type Slide = {
  id: number;
  image: string;
  caption?: string;
  description?: string;
  link?: string;
};

interface CarouselProps {
  slides: Slide[];
  autoPlay?: boolean;
  interval?: number;
}

const Carousel: React.FC<CarouselProps> = ({
  slides,
  autoPlay = true,
  interval = 4000,
}) => {
  const [current, setCurrent] = useState(0);

  // Tự động chuyển slide nếu autoPlay
  useEffect(() => {
    if (!autoPlay) return;
    const timer = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, interval);
    return () => clearTimeout(timer);
  }, [current, autoPlay, interval, slides.length]);

  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);

  if (!slides || slides.length === 0) return null;

  return (
    <div className="relative w-full h-[350px] md:h-[480px] overflow-hidden rounded-b-xl shadow-lg">
      {slides.map((slide, idx) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out
              ${idx === current ? "opacity-100 z-10" : "opacity-0 z-0"}
             `}
        >
          <img
            src={slide.image}
            alt={slide.caption || ""}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 w-full px-6 py-6 bg-gradient-to-t from-black/70 via-black/30 to-transparent text-white">
            <h2 className="text-xl md:text-3xl font-bold">{slide.caption}</h2>
            {slide.description && (
              <p className="mt-1 text-base md:text-lg">{slide.description}</p>
            )}
            {slide.link && (
              <a
                href={slide.link}
                className="inline-block mt-3 px-4 py-2 bg-indigo-600 hover:bg-fuchsia-500 rounded text-white font-medium transition"
              >
                Xem ngay
              </a>
            )}
          </div>
        </div>
      ))}

      {/* Điều hướng */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white rounded-full p-2 z-20"
        onClick={prevSlide}
        aria-label="Slide trước"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white rounded-full p-2 z-20"
        onClick={nextSlide}
        aria-label="Slide sau"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
      {/* Dots indicator */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-6 flex gap-2 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full ${
              idx === current ? "bg-fuchsia-400" : "bg-white/50"
            }`}
            onClick={() => setCurrent(idx)}
            aria-label={`Chuyển đến slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
