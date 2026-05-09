"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

export const FocusCards = ({ cards }: { cards: { title: string; src: string; bio?: string; role?: string; bookHref?: string; accentColor?: "pink" | "blue" }[] }) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-4xl mx-auto w-full">
      {cards.map((card, index) => (
        <div
          key={card.title}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const cx = rect.width / 2;
            const cy = rect.height / 2;
            const rx = ((y - cy) / cy) * -8;
            const ry = ((x - cx) / cx) * 8;
            e.currentTarget.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.02,1.02,1.02)`;
          }}
          onMouseEnter={() => setHovered(index)}
          onMouseLeave={(e) => {
            setHovered(null);
            e.currentTarget.style.transform = "perspective(800px) rotateX(0) rotateY(0) scale3d(1,1,1)";
            e.currentTarget.style.transition = "transform .5s cubic-bezier(.22,1,.36,1)";
          }}
          style={{ transformStyle: "preserve-3d", transition: "transform .1s ease" }}
          className={cn(
            "relative aspect-[3/4] rounded-3xl overflow-hidden cursor-pointer",
            "transition-all duration-500"
          )}
        >
          {/* Ambient glow */}
          <div
            className={cn(
              "absolute -top-10 -right-10 w-44 h-44 rounded-full blur-[60px] pointer-events-none transition-opacity duration-500",
              card.accentColor === "blue" ? "bg-blue-500/50" : "bg-pink-500/50",
              hovered === index ? "opacity-100" : "opacity-0"
            )}
          />

          {/* Photo */}
          <img
            src={card.src}
            alt={card.title}
            className={cn(
              "w-full h-full object-cover object-top block transition-all duration-700",
              hovered === index ? "scale-105 brightness-[0.65]" : "scale-100 brightness-90"
            )}
          />

          {/* Gradient overlay always-on */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />

          {/* Hover tint */}
          <div className={cn("absolute inset-0 bg-black/15 transition-opacity duration-400", hovered === index ? "opacity-100" : "opacity-0")} />

          {/* Content */}
          <div className={cn("absolute bottom-0 left-0 right-0 p-7 transition-transform duration-400", hovered === index ? "translate-y-0" : "translate-y-1")}>
            {/* Role pill */}
            <div
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] font-mono tracking-[.12em] uppercase mb-2.5",
                "transition-all duration-400",
                card.accentColor === "blue"
                  ? "border-blue-500/40 bg-blue-500/12 text-blue-400"
                  : "border-pink-500/40 bg-pink-500/12 text-pink-400",
                hovered === index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              )}
            >
              ✦ {card.role || "Master Barber"}
            </div>

            {/* Name */}
            <h3 className="font-bold text-white text-[1.1rem] mb-2 tracking-[.02em]" style={{ fontFamily: "'Syncopate', sans-serif" }}>
              {card.title}
            </h3>

            {/* Bio */}
            {card.bio && (
              <p
                className={cn(
                  "text-white/70 text-[.82rem] leading-[1.62] max-w-[340px] transition-all duration-400",
                  hovered === index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                )}
              >
                {card.bio}
              </p>
            )}

            {/* Book CTA */}
            {card.bookHref && (
              <a
                href={card.bookHref}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "inline-flex items-center gap-1.5 mt-4 px-5 py-2.5 rounded-full text-[.82rem] font-semibold text-white border-none transition-all duration-400",
                  card.accentColor === "blue"
                    ? "bg-gradient-to-r from-blue-800 to-blue-500 shadow-[0_0_14px_rgba(59,130,246,.38)] hover:shadow-[0_0_24px_rgba(59,130,246,.55)]"
                    : "bg-gradient-to-r from-[#be185d] to-pink-500 shadow-[0_0_14px_rgba(236,72,153,.38)] hover:shadow-[0_0_24px_rgba(236,72,153,.55)]",
                  hovered === index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                )}
                onClick={(e) => e.stopPropagation()}
              >
                Book Now →
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};