"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Scissors, ChevronDown, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ServiceItem = { name: string; price: number; desc: string };

export const ExpandableServiceCards = ({ services, bookUrl }: { services: ServiceItem[]; bookUrl: string }) => {
  const [open, setOpen] = useState<number | null>(null);

  const toggle = (i: number) => setOpen(open === i ? null : i);

  return (
    <div className="flex flex-col max-w-[780px] mx-auto overflow-hidden rounded-[18px] border border-white/[.06]">
      {services.map((s, i) => {
        const isOpen = open === i;
        const isFirst = i === 0;
        const isLast = i === services.length - 1;
        return (
          <div
            key={s.name}
            className={cn(
              "relative bg-[#111] overflow-hidden transition-all duration-350",
              !isFirst && "border-t border-white/[.06]",
              isOpen && "bg-pink-500/[.03]"
            )}
          >
            {/* Top glow line when open */}
            <motion.div
              animate={{ opacity: isOpen ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-pink-500 to-blue-500"
            />

            {/* Header row — clickable */}
            <button
              onClick={() => toggle(i)}
              className="w-full flex items-center justify-between px-6 py-[18px] hover:bg-white/[.015] transition-colors duration-250"
            >
              <div className="flex items-center gap-4">
                <div
                  className={cn(
                    "w-9 h-9 rounded-[10px] border flex items-center justify-center transition-colors duration-300",
                    isOpen
                      ? "border-pink-500/40 bg-pink-500/10"
                      : "border-pink-500/18 bg-pink-500/[.05]"
                  )}
                >
                  <Scissors className="w-3.5 h-3.5 text-pink-400 -rotate-45" />
                </div>
                <span
                  className="font-bold text-white text-[.72rem] uppercase tracking-[.05em]"
                  style={{ fontFamily: "'Syncopate', sans-serif" }}
                >
                  {s.name}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span
                  className="text-[1.3rem] font-bold bg-gradient-to-br from-pink-300 to-blue-400 bg-clip-text text-transparent"
                  style={{ fontFamily: "'Syncopate', sans-serif" }}
                >
                  ${s.price}
                </span>
                <ChevronDown
                  className={cn(
                    "w-4 h-4 text-white/30 transition-all duration-300",
                    isOpen && "rotate-180 text-pink-400"
                  )}
                />
              </div>
            </button>

            {/* Expandable body */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-5 flex items-center justify-between gap-5 flex-wrap">
                    <p className="text-white/50 text-[.85rem] leading-[1.65] max-w-[480px]">{s.desc}</p>
                    <a
                      href={bookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-[.8rem] font-semibold text-white bg-gradient-to-r from-[#be185d] to-pink-500 shadow-[0_0_14px_rgba(236,72,153,.3)] hover:from-pink-500 hover:to-blue-500 hover:shadow-[0_0_22px_rgba(236,72,153,.5)] hover:-translate-y-0.5 transition-all duration-350 whitespace-nowrap flex-shrink-0"
                    >
                      Book This <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};