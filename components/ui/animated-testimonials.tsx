"use client";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useCallback } from "react";

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = true,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActive((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, testimonials.length]);

  const handlePrev = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, testimonials.length]);

  useEffect(() => {
    if (!autoplay) return;
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, [autoplay, handleNext]);

  const isActive = (index: number) => index === active;

  const randomRotateY = () => Math.floor(Math.random() * 21) - 10;

  return (
    <div className="max-w-sm md:max-w-4xl mx-auto px-4 md:px-8 lg:px-12 py-20">
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Image stack */}
        <div className="relative h-80 w-full">
          <AnimatePresence>
            {testimonials.map((t, index) => (
              <motion.div
                key={t.src}
                initial={{ opacity: 0, scale: 0.9, z: -100, rotate: randomRotateY() }}
                animate={{
                  opacity: isActive(index) ? 1 : 0.7,
                  scale: isActive(index) ? 1 : 0.95,
                  z: isActive(index) ? 0 : -100,
                  rotate: isActive(index) ? 0 : randomRotateY(),
                  zIndex: isActive(index) ? 40 : testimonials.length + 2 - index,
                  y: isActive(index) ? [0, -80, 0] : 0,
                }}
                exit={{ opacity: 0, scale: 0.9, z: 100 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="absolute inset-0 origin-bottom"
              >
                <img
                  src={t.src}
                  alt={t.name}
                  draggable={false}
                  onDragStart={(e) => e.preventDefault()}
                  className="h-full w-full rounded-3xl object-cover object-top select-none"
                  style={{ filter: "brightness(0.9)" }}
                />
                {/* Overlay for non-active */}
                {!isActive(index) && (
                  <div className="absolute inset-0 rounded-3xl bg-black/40" />
                )}
                {/* Pink glow on active */}
                {isActive(index) && (
                  <div className="absolute inset-0 rounded-3xl ring-1 ring-pink-500/30 shadow-[0_0_40px_rgba(236,72,153,0.15)]" />
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Content */}
        <div className="flex flex-col justify-between py-4">
          {/* Dots */}
          <div className="flex gap-2 mb-8 flex-wrap">
            {testimonials.map((_, i) => (
              <button
  key={i}
  aria-label={`Go to testimonial ${i + 1}`}
  onClick={() => { if (!isAnimating) { setIsAnimating(true); setActive(i); setTimeout(() => setIsAnimating(false), 500); } }}
  className={`rounded-full border-none transition-all duration-300 ${
    i === active ? "w-6 h-1.5 bg-pink-500" : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40"
  }`}
/>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className="w-4 h-4 fill-pink-400 text-pink-400" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 18.77l-6.18 2.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                ))}
              </div>

              <motion.p className="text-lg text-white/80 font-light leading-relaxed italic mb-8 relative">
                <span className="text-5xl text-pink-500/20 absolute -top-5 -left-2 font-serif leading-none select-none">"</span>
                {testimonials[active].quote}
              </motion.p>

              <div className="flex items-center gap-4 mb-8">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 border-2 overflow-hidden"
                  style={{ borderColor: "rgba(236,72,153,0.35)", background: "linear-gradient(135deg,rgba(236,72,153,.2),rgba(59,130,246,.2))", color: "#f9a8d4" }}
                >
                  {testimonials[active].name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <div className="font-semibold text-white">{testimonials[active].name}</div>
                  <div className="text-pink-400 text-sm font-mono">{testimonials[active].designation}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Arrow controls */}
          <div className="flex gap-3">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full border border-white/10 bg-[#111] text-white/50 flex items-center justify-center transition-all duration-250 hover:border-white/28 hover:text-white hover:scale-[1.08]"
            >
              <IconArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full border border-white/10 bg-[#111] text-white/50 flex items-center justify-center transition-all duration-250 hover:border-white/28 hover:text-white hover:scale-[1.08]"
            >
              <IconArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};