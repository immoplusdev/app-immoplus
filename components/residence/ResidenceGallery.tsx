"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import { getImageUrl } from '../../providers/api';
import { Residence } from '../../models/residence.model';

interface ResidenceGalleryProps {
  residence: Residence;
}

const ResidenceGallery: React.FC<ResidenceGalleryProps> = ({ residence }) => {
  const images = residence.images;
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const slides = images.map((imgId) => ({
    src: getImageUrl(imgId),
  }));

  const openLightbox = (idx: number) => {
    setIndex(idx);
    setOpen(true);
  };

  React.useEffect(() => {
    if (!emblaApi) return;

    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    });
  }, [emblaApi]);

  return (
    <>
      {/* Mobile: Embla Carousel */}
      <div className="md:hidden relative group">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {images.map((imgId, idx) => (
              <div key={imgId} className="relative flex-[0_0_100%] min-w-0 aspect-4/3">
                <Image
                  src={getImageUrl(imgId)}
                  alt={`${residence.nom} ${idx + 1}`}
                  fill
                  className="object-cover"
                  unoptimized
                  onClick={() => openLightbox(idx)}
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Carousel Indicators (Dots) */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
          {scrollSnaps.map((_, snapIndex) => (
            <div
              key={snapIndex}
              className={`w-2 h-2 rounded-full transition-all shadow-sm ${
                snapIndex === selectedIndex ? "bg-white scale-125" : "bg-white/50"
              }`}
            />
          ))}
        </div>
        
        {/* Optional: Simple "1/X" counter if preferred over dots for many images */}
        <div className="absolute bottom-4 right-4 bg-black/50 text-white text-xs px-2 py-1 rounded-md backdrop-blur-sm z-10">
           {selectedIndex + 1} / {images.length}
        </div>
      </div>

      {/* Desktop: Grid Layout */}
      <div className="hidden md:block max-w-7xl mx-auto px-6 mb-8">
        <div className="grid grid-cols-4 grid-rows-2 gap-2 rounded-xl overflow-hidden h-[500px]">
          {/* Main image */}
          <div 
            className="col-span-2 row-span-2 relative cursor-pointer hover:brightness-90 transition-all"
            onClick={() => openLightbox(0)}
          >
            <Image
              src={getImageUrl(images[0])}
              alt={residence.nom}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          
          {/* Small images */}
          {images.slice(1, 5).map((imgId, idx) => (
            <div 
              key={imgId} 
              className="relative cursor-pointer hover:brightness-90 transition-all"
              onClick={() => openLightbox(idx + 1)}
            >
              <Image
                src={getImageUrl(imgId)}
                alt={`${residence.nom} ${idx + 2}`}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          ))}

          {/* Connect remaining slots if any (optional, but good for grid stability) */}
           {images.length < 5 && Array.from({ length: 5 - images.length }).map((_, i) => (
              <div key={`placeholder-${i}`} className="bg-gray-100 relative"></div>
          ))}
        </div>
      </div>

      {/* Lightbox Component */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
        plugins={[Zoom]}
        animation={{ fade: 0 }}
        controller={{ closeOnBackdropClick: true }}
      />
    </>
  );
};

export default ResidenceGallery;
