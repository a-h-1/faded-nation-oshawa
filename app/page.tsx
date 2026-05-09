"use client";

/**
 * FADED NATION — v3
 * Next.js 14 · Tailwind CSS · Framer Motion · Aceternity UI
 *
 * Components used:
 *  - TracingBeam     — scrolls on the left side of the page
 *  - FocusCards      — 3D focus-hover staff cards (2 cards, one per barber)
 *  - AnimatedTestimonials — animated stacked-image testimonial carousel
 *  - ExpandableServiceCards — accordion-style service menu
 *
 * Removed: "Where Colombian warmth meets Mexican precision." sentence
 * Staff: Andrea (pink) + Nathanael Daza (blue) — real bios, no tags
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Clock, Phone, Sparkles, ArrowRight, Menu, X } from "lucide-react";

import { TracingBeam } from "@/components/ui/tracing-beam";
import { FocusCards } from "@/components/ui/focus-cards";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { ExpandableServiceCards } from "@/components/ui/expandable-service-cards";

const BOOK_URL = "https://squareup.com/appointments/book/faded-nation";
const IG_URL   = "https://instagram.com/fadednation";
const TT_URL   = "https://tiktok.com/@fadednation";

const SCISSORS_WH = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='22' height='22' viewBox='0 0 24 24'%3E%3Cg transform='rotate(-45 12 12)'%3E%3Cpath d='M6 9C6 9 4 12 4 15A4 4 0 0 0 12 15C12 15 12 12 10 9Z' fill='white' opacity='.9'/%3E%3Crect x='8.5' y='4' width='3' height='8' rx='1.5' fill='white' opacity='.9'/%3E%3Cellipse cx='6' cy='18' rx='2.5' ry='2' fill='white' opacity='.7'/%3E%3Cellipse cx='18' cy='18' rx='2.5' ry='2' fill='white' opacity='.7'/%3E%3C/g%3E%3C/svg%3E") 11 11,crosshair`;
const SCISSORS_PK = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='22' height='22' viewBox='0 0 24 24'%3E%3Cg transform='rotate(-45 12 12)'%3E%3Cpath d='M6 9C6 9 4 12 4 15A4 4 0 0 0 12 15C12 15 12 12 10 9Z' fill='%23ec4899'/%3E%3Crect x='8.5' y='4' width='3' height='8' rx='1.5' fill='%23ec4899'/%3E%3Cellipse cx='6' cy='18' rx='2.5' ry='2' fill='%23ec4899' opacity='.85'/%3E%3Cellipse cx='18' cy='18' rx='2.5' ry='2' fill='%23ec4899' opacity='.85'/%3E%3C/g%3E%3C/svg%3E") 11 11,pointer`;

// ─── DATA ──────────────────────────────────────────────────────

const DATA = {
  en: {
    navBook: "Book Now",
    hero: {
      tagline: "IT'S NOT JUST A CUT",
      headline: ["Elevate Your ", "Image."],
      sub: "Walk in groomed. Walk out legendary.",
      cta: "Reserve Your Seat",
      scroll: "Scroll to explore",
    },
    services: {
      label: "◆ THE MENU ◆",
      headline: "Crafted for the Elite.",
      sub: "Every service includes a complimentary hot towel finish and neck massage.",
      perk: "Free hot towel & massage with every service",
      items: [
        { name: "Men's Cut",        price: 40, desc: "Precision fade, classic cut, or textured crop. Your signature, our craft." },
        { name: "Cut & Beard",      price: 65, desc: "Full service. Sculpted cut paired with a perfectly shaped beard." },
        { name: "Senior Cut",       price: 25, desc: "Timeless craft, earned respect. Premium service, always." },
        { name: "Kid's Cut",        price: 35, desc: "Gentle hands, big results. Raising the next generation of fresh." },
        { name: "Line Up",          price: 20, desc: "Sharp edges, sharper first impressions. Crisp lines that speak for you." },
        { name: "Facial Cleansing", price: 20, desc: "Skin-first luxury. Deep cleanse for a face that matches the cut." },
      ],
    },
    staff: {
      label: "◆ YOUR BARBERS ◆",
      headline: "The Artists Behind the Chair.",
      sub: "Meet the hands behind every cut.",
      cards: [
        {
          title: "Andrea",
          src: "https://images.unsplash.com/photo-1595956553066-fe24a8c33395?q=80&w=1000&auto=format&fit=crop",
          bio: "Colombian lady barber who treats every client like VIP. Precision cuts, clean fades, and an eye for the perfect finish.",
          role: "Master Barber",
          bookHref: BOOK_URL,
          accentColor: "pink" as const,
        },
        {
          title: "Nathanael Daza",
          src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
          bio: "Mexican barber with 5+ years of experience. Scissors cuts, clean fades, and signature designs that speak for themselves.",
          role: "Master Barber",
          bookHref: BOOK_URL,
          accentColor: "blue" as const,
        },
      ],
    },
    testimonials: {
      label: "◆ THE WORD ◆",
      headline: "The Community Speaks.",
      sub: "Real clients. Real cuts. Real love for the craft.",
      items: [
        { quote: "Came in for a line-up and walked out feeling like I owned the city. That hot towel finish? Absolute game changer.", name: "Jordan M.", designation: "@jordan.faded", src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop" },
        { quote: "Professional, precise, and the vibe is immaculate. My go-to before every big interview. Can't recommend enough.", name: "Carlos R.", designation: "@carloscuts", src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop" },
        { quote: "Booked the facial cleansing on a whim and I'm obsessed. Felt like a spa, priced like a steal. I'm a regular now.", name: "Priya S.", designation: "@priya.glows", src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop" },
        { quote: "Best barbershop in Oshawa, no contest. That beard sculpt literally changed my face.", name: "Marcus T.", designation: "@marcusfresh", src: "https://images.unsplash.com/photo-1618641986557-1ecd230959aa?q=80&w=800&auto=format&fit=crop" },
        { quote: "Brought my son and he's never sat so still. Patient, kind, perfect result. This place has heart.", name: "Daniela V.", designation: "@danielav_", src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop" },
      ],
    },
    footer: {
      hours: "Hours of Operation",
      rights: "All rights reserved.",
      motto: "It's not just a cut, it's your cover letter.",
      schedule: [
        { day: "Monday – Friday", time: "9:00 AM – 8:00 PM" },
        { day: "Saturday",        time: "8:00 AM – 6:00 PM" },
        { day: "Sunday",          time: "10:00 AM – 5:00 PM" },
      ],
    },
  },
  es: {
    navBook: "Reservar",
    hero: {
      tagline: "NO ES SOLO UN CORTE",
      headline: ["Eleva Tu ", "Imagen."],
      sub: "Entra con estilo. Sal como leyenda.",
      cta: "Reserva Tu Lugar",
      scroll: "Desplázate para explorar",
    },
    services: {
      label: "◆ EL MENÚ ◆",
      headline: "Creado para la Élite.",
      sub: "Cada servicio incluye toalla caliente y masaje de cuello.",
      perk: "Toalla caliente y masaje gratis con cada servicio",
      items: [
        { name: "Corte de Hombre",  price: 40, desc: "Fade de precisión, corte clásico o texturizado. Tu firma, nuestro oficio." },
        { name: "Corte y Barba",    price: 65, desc: "Servicio completo. Corte esculpido con barba perfectamente perfilada." },
        { name: "Corte Senior",     price: 25, desc: "Arte atemporal, respeto total. Servicio premium, siempre." },
        { name: "Corte de Niños",   price: 35, desc: "Manos gentiles, grandes resultados." },
        { name: "Perfilado",        price: 20, desc: "Bordes nítidos, primeras impresiones aún más nítidas." },
        { name: "Limpieza Facial",  price: 20, desc: "Lujo para la piel. Limpieza profunda para un rostro perfecto." },
      ],
    },
    staff: {
      label: "◆ TUS BARBEROS ◆",
      headline: "Los Artistas Detrás de la Silla.",
      sub: "Conoce las manos detrás de cada corte.",
      cards: [
        {
          title: "Andrea",
          src: "https://images.unsplash.com/photo-1595956553066-fe24a8c33395?q=80&w=1000&auto=format&fit=crop",
          bio: "Barbera colombiana que trata a cada cliente como VIP. Cortes de precisión y un ojo para el acabado perfecto.",
          role: "Maestra Barbera",
          bookHref: BOOK_URL,
          accentColor: "pink" as const,
        },
        {
          title: "Nathanael Daza",
          src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
          bio: "Barbero mexicano con más de 5 años de experiencia. Cortes con tijera, fades limpios y diseños únicos.",
          role: "Maestro Barbero",
          bookHref: BOOK_URL,
          accentColor: "blue" as const,
        },
      ],
    },
    testimonials: {
      label: "◆ LO QUE DICEN ◆",
      headline: "La Comunidad Habla.",
      sub: "Clientes reales. Cortes reales. Amor real por el oficio.",
      items: [
        { quote: "Vine por un perfilado y salí sintiéndome dueño de la ciudad. ¿La toalla caliente? Un cambio total.", name: "Jordan M.", designation: "@jordan.faded", src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop" },
        { quote: "Profesional, preciso—mi lugar antes de cada entrevista importante.", name: "Carlos R.", designation: "@carloscuts", src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop" },
        { quote: "Reservé la limpieza facial por impulso y estoy obsesionada. Se siente como un spa.", name: "Priya S.", designation: "@priya.glows", src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop" },
        { quote: "La mejor barbería en Oshawa, sin duda. Ese perfilado de barba cambió mi cara.", name: "Marcus T.", designation: "@marcusfresh", src: "https://images.unsplash.com/photo-1618641986557-1ecd230959aa?q=80&w=800&auto=format&fit=crop" },
        { quote: "Traje a mi hijo y jamás había estado tan quieto. Pacientes, amables, resultado perfecto.", name: "Daniela V.", designation: "@danielav_", src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop" },
      ],
    },
    footer: {
      hours: "Horario de Atención",
      rights: "Todos los derechos reservados.",
      motto: "No es solo un corte, es tu carta de presentación.",
      schedule: [
        { day: "Lunes – Viernes", time: "9:00 AM – 8:00 PM" },
        { day: "Sábado",          time: "8:00 AM – 6:00 PM" },
        { day: "Domingo",         time: "10:00 AM – 5:00 PM" },
      ],
    },
  },
};

// ─── GEO BACKGROUND ────────────────────────────────────────────
function GeoBg({ opacity = 0.028 }: { opacity?: number }) {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity }} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="geo" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M0 30L30 0L60 30L30 60Z" fill="none" stroke="#fff" strokeWidth=".4" />
          <circle cx="30" cy="30" r="1.2" fill="none" stroke="#fff" strokeWidth=".4" />
          <circle cx="0"  cy="0"  r=".8" fill="#ec4899" />
          <circle cx="60" cy="0"  r=".8" fill="#3b82f6" />
          <circle cx="0"  cy="60" r=".8" fill="#3b82f6" />
          <circle cx="60" cy="60" r=".8" fill="#ec4899" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#geo)" />
    </svg>
  );
}

// ─── NAVBAR ────────────────────────────────────────────────────
function Navbar({ lang, setLang, t }: { lang: string; setLang: (l: "en" | "es") => void; t: typeof DATA.en }) {
  const [scrolled, setScrolled] = useState(false);
  const [mob, setMob] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMob(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 inset-x-0 z-50 h-[60px] flex items-center px-7 transition-all duration-400 ${scrolled ? "bg-[#080808]/96 backdrop-blur-xl border-b border-white/[.06]" : "bg-transparent"}`}
      >
        <div className="max-w-[1180px] w-full mx-auto flex items-center justify-between">
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2.5 group" style={{ cursor: SCISSORS_PK }}>
            <div className="w-[34px] h-[34px] rounded-full p-[2px] bg-gradient-to-br from-pink-500 to-blue-500 group-hover:shadow-[0_0_18px_rgba(236,72,153,.5)] transition-shadow duration-300">
              <div className="w-full h-full rounded-full bg-[#080808] flex items-center justify-center text-[13px] rotate-[-45deg]">✂</div>
            </div>
            <div className="hidden sm:block">
              <div className="font-black text-[13px] text-white leading-none tracking-wide" style={{ fontFamily: "'Syncopate',sans-serif" }}>FADED</div>
              <div className="font-mono text-[9px] text-pink-400 tracking-[.3em] mt-0.5 leading-none">NATION</div>
            </div>
          </button>

          <div className="hidden md:flex gap-7">
            {(["services", "staff", "testimonials"] as const).map((id) => (
              <button key={id} onClick={() => go(id)} style={{ cursor: SCISSORS_PK }}
                className="text-white/50 hover:text-white text-[13px] font-medium tracking-wide transition-colors duration-250 relative after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-gradient-to-r after:from-pink-500 after:to-blue-500 hover:after:w-full after:transition-all after:duration-300">
                {id === "services" ? t.services.label.replace(/◆/g, "").trim()
                  : id === "staff" ? t.staff.label.replace(/◆/g, "").trim()
                  : t.testimonials.label.replace(/◆/g, "").trim()}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2.5">
            <button onClick={() => setLang(lang === "en" ? "es" : "en")} style={{ cursor: SCISSORS_PK }}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 text-[11px] font-mono tracking-wider hover:border-white/25 hover:text-white transition-all duration-250">
              <span className={lang === "en" ? "text-pink-400" : "text-white/30"}>EN</span>
              <span className="text-white/15">/</span>
              <span className={lang === "es" ? "text-pink-400" : "text-white/30"}>ES</span>
            </button>
            <a href={BOOK_URL} target="_blank" rel="noopener noreferrer" style={{ cursor: SCISSORS_PK }}
              className="px-5 py-2 rounded-full text-[13px] font-semibold text-white bg-gradient-to-r from-[#be185d] to-pink-500 hover:from-pink-500 hover:to-blue-500 hover:-translate-y-px hover:scale-[1.03] active:scale-[.97] transition-all duration-450 shadow-[0_0_18px_rgba(236,72,153,.42)]">
              {t.navBook}
            </a>
            <button onClick={() => setMob(!mob)} style={{ cursor: SCISSORS_PK }}
              className="md:hidden p-1 text-white/60 hover:text-white transition-colors">
              {mob ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mob && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.28 }}
            className="fixed inset-x-0 top-[60px] z-40 bg-[#080808]/97 backdrop-blur-xl border-b border-white/[.06] px-7 py-5 flex flex-col gap-4">
            {["services", "staff", "testimonials"].map((id) => (
              <button key={id} onClick={() => go(id)} style={{ cursor: SCISSORS_PK }}
                className="text-left text-white/75 hover:text-white text-[1rem] font-medium transition-colors capitalize">{id}</button>
            ))}
            <div className="pt-4 border-t border-white/[.07] flex items-center justify-between">
              <button onClick={() => setLang(lang === "en" ? "es" : "en")} style={{ cursor: SCISSORS_PK }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 text-[11px] font-mono">
                <span className={lang === "en" ? "text-pink-400" : "text-white/30"}>EN</span>/
                <span className={lang === "es" ? "text-pink-400" : "text-white/30"}>ES</span>
              </button>
              <a href={BOOK_URL} target="_blank" rel="noopener noreferrer" style={{ cursor: SCISSORS_PK }}
                className="px-6 py-2 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-[#be185d] to-pink-500 shadow-[0_0_18px_rgba(236,72,153,.4)]">
                {t.navBook}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── SECTION LABEL ─────────────────────────────────────────────
function SLabel({ text }: { text: string }) {
  return <p className="text-[11px] font-mono tracking-[.35em] text-pink-400 uppercase mb-4">{text}</p>;
}

// ─── ROOT PAGE ─────────────────────────────────────────────────
export default function FadedNation() {
  const [lang, setLang] = useState<"en" | "es">("en");
  const t = DATA[lang];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syncopate:wght@400;700&family=DM+Mono:wght@300;400;500&family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        body{
          background:#080808;color:#fff;font-family:'Inter',sans-serif;
          -webkit-font-smoothing:antialiased;overflow-x:hidden;
          cursor:${SCISSORS_WH}
        }
        ::-webkit-scrollbar{width:3px}
        ::-webkit-scrollbar-track{background:#0a0a0a}
        ::-webkit-scrollbar-thumb{background:#222;border-radius:2px}
        ::-webkit-scrollbar-thumb:hover{background:#ec4899}
        .font-mono{font-family:'DM Mono',monospace!important}
      `}</style>

      <Navbar lang={lang} setLang={setLang} t={t} />

      {/* TracingBeam wraps ALL page content */}
      <TracingBeam className="pt-[60px]">

        {/* HERO */}
        <section id="hero" className="relative min-h-[82vh] flex items-center justify-center overflow-hidden bg-[#080808]">
          <GeoBg />
          <div className="absolute top-1/4 left-[18%] w-[400px] h-[400px] rounded-full bg-pink-600/[.055] blur-[90px] pointer-events-none animate-pulse" />
          <div className="absolute bottom-[18%] right-[16%] w-[320px] h-[320px] rounded-full bg-blue-600/[.04] blur-[80px] pointer-events-none" />
          <div className="relative z-10 text-center px-5 max-w-[900px]">
            <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-4 mb-7">
              <div className="w-9 h-px bg-gradient-to-r from-transparent to-pink-500" />
              <span className="font-mono text-[11px] tracking-[.38em] text-pink-400 uppercase">{t.hero.tagline}</span>
              <div className="w-9 h-px bg-gradient-to-l from-transparent to-pink-500" />
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 46 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="text-[clamp(2.4rem,8.5vw,6.2rem)] font-bold leading-[.92] tracking-tight text-white mb-5"
              style={{ fontFamily: "'Syncopate',sans-serif" }}>
              {t.hero.headline[0]}
              <span className="bg-gradient-to-br from-pink-300 via-pink-400 to-blue-400 bg-clip-text text-transparent">{t.hero.headline[1]}</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="text-white/42 text-[clamp(.95rem,2.2vw,1.12rem)] max-w-[480px] mx-auto mb-9 leading-[1.75] font-light">
              {t.hero.sub}
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="flex gap-3 justify-center flex-wrap">
              <a href={BOOK_URL} target="_blank" rel="noopener noreferrer" style={{ cursor: SCISSORS_PK }}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-[.9rem] text-white bg-gradient-to-r from-[#be185d] to-pink-500 hover:from-pink-500 hover:to-blue-500 hover:-translate-y-0.5 hover:scale-[1.02] active:scale-[.97] transition-all duration-500 shadow-[0_0_28px_rgba(236,72,153,.42)]">
                {t.hero.cta} <ArrowRight className="w-4 h-4" />
              </a>
              <button onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })} style={{ cursor: SCISSORS_PK }}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-medium text-[.9rem] text-white/50 border border-white/10 hover:text-white hover:border-white/28 hover:bg-white/[.03] hover:-translate-y-0.5 transition-all duration-300">
                View Services
              </button>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1, duration: 1 }}
            className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5">
            <span className="font-mono text-[9px] tracking-[.3em] text-white/18 uppercase">{t.hero.scroll}</span>
            <motion.div animate={{ scaleY: [1, .55, 1] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-px h-7 bg-gradient-to-b from-white/22 to-transparent origin-top" />
          </motion.div>
        </section>

        {/* SERVICES — ExpandableServiceCards */}
        <section id="services" className="relative py-24 bg-[#0c0c0c] overflow-hidden">
          <GeoBg />
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-pink-500/22 to-transparent" />
          <div className="absolute left-0 top-0 bottom-0 w-[5px] bg-gradient-to-b from-transparent via-green-800/50 to-transparent" />
          <div className="absolute right-0 top-0 bottom-0 w-[5px] bg-gradient-to-b from-transparent via-green-800/38 to-transparent" />
          <div className="max-w-[1180px] mx-auto px-7">
            <div className="text-center mb-12">
              <SLabel text={t.services.label} />
              <h2 className="text-[clamp(1.8rem,4.5vw,3.2rem)] font-bold text-white leading-none mb-4" style={{ fontFamily: "'Syncopate',sans-serif" }}>{t.services.headline}</h2>
              <p className="text-white/42 max-w-[560px] mx-auto mb-5 leading-[1.72] font-light">{t.services.sub}</p>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-800/40 bg-green-950/30 text-green-300 text-[12.5px] font-medium">
                <Sparkles className="w-3.5 h-3.5" /> {t.services.perk}
              </span>
            </div>
            <ExpandableServiceCards services={t.services.items} bookUrl={BOOK_URL} />
          </div>
          <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/14 to-transparent" />
        </section>

        {/* STAFF — FocusCards */}
        <section id="staff" className="relative py-24 bg-[#080808] overflow-hidden">
          <GeoBg opacity={0.022} />
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/15 to-transparent" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-pink-600/[.03] blur-[100px] pointer-events-none" />
          <div className="max-w-[1180px] mx-auto px-7">
            <div className="text-center mb-12">
              <SLabel text={t.staff.label} />
              <h2 className="text-[clamp(1.8rem,4.5vw,3.2rem)] font-bold text-white leading-none mb-4" style={{ fontFamily: "'Syncopate',sans-serif" }}>{t.staff.headline}</h2>
              <p className="text-white/42 max-w-[520px] mx-auto leading-[1.72] font-light">{t.staff.sub}</p>
            </div>
            <FocusCards cards={t.staff.cards} />
          </div>
          <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-pink-500/12 to-transparent" />
        </section>

        {/* TESTIMONIALS — AnimatedTestimonials */}
        <section id="testimonials" className="relative bg-[#0c0c0c] overflow-hidden">
          <GeoBg />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-600/[.025] blur-[120px] pointer-events-none" />
          <div className="max-w-[1180px] mx-auto px-7">
            <div className="text-center pt-24 pb-0">
              <SLabel text={t.testimonials.label} />
              <h2 className="text-[clamp(1.8rem,4.5vw,3.2rem)] font-bold text-white leading-none mb-4" style={{ fontFamily: "'Syncopate',sans-serif" }}>{t.testimonials.headline}</h2>
              <p className="text-white/42 max-w-[480px] mx-auto leading-[1.72] font-light">{t.testimonials.sub}</p>
            </div>
            <AnimatedTestimonials testimonials={t.testimonials.items} autoplay />
          </div>
        </section>

        {/* FOOTER */}
        <footer className="relative bg-[#080808] border-t border-white/[.05] overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-pink-500/14 to-transparent" />
          <GeoBg opacity={0.016} />
          <div className="max-w-[1180px] mx-auto px-7">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-11 pt-16 pb-11">
              <div>
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-8 h-8 rounded-full p-[2px] bg-gradient-to-br from-pink-500 to-blue-500 opacity-70">
                    <div className="w-full h-full rounded-full bg-[#080808] flex items-center justify-center text-[11px] rotate-[-45deg]">✂</div>
                  </div>
                  <div>
                    <div className="font-black text-[13px] text-white tracking-wide leading-none" style={{ fontFamily: "'Syncopate',sans-serif" }}>FADED NATION</div>
                    <div className="font-mono text-[9px] text-pink-400/60 tracking-[.3em] mt-0.5 leading-none">OSHAWA · EST. 2022</div>
                  </div>
                </div>
                <p className="italic text-white/22 text-[.82rem] max-w-[300px] leading-[1.65] mb-5">"{t.footer.motto}"</p>
                {[
                  { icon: <MapPin className="w-3.5 h-3.5 text-pink-500/45" />, text: "27 Bond Street E, Oshawa, ON" },
                  { icon: <Phone className="w-3.5 h-3.5 text-pink-500/45" />, text: "(905) 555-0182" },
                ].map((ci, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-white/42 text-[.8rem] mb-2">{ci.icon}{ci.text}</div>
                ))}
              </div>
              <div>
                <div className="font-mono text-[.65rem] tracking-[.3em] text-white/35 uppercase mb-4 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-pink-500/45" /> {t.footer.hours}
                </div>
                {t.footer.schedule.map((s, i) => (
                  <div key={i} className="mb-2.5">
                    <div className="text-[.72rem] text-white/30">{s.day}</div>
                    <div className="text-[.8rem] text-white/68 font-medium">{s.time}</div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col justify-between">
                <div>
                  <div className="font-mono text-[.65rem] tracking-[.3em] text-white/35 uppercase mb-4">BOOK</div>
                  <a href={BOOK_URL} target="_blank" rel="noopener noreferrer" style={{ cursor: SCISSORS_PK }}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-[.8rem] font-semibold text-white bg-gradient-to-r from-[#be185d] to-pink-500 hover:from-pink-500 hover:to-blue-500 hover:-translate-y-px transition-all duration-380 shadow-[0_0_18px_rgba(236,72,153,.22)] mb-6">
                    Book Online <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
                <div className="flex gap-2.5">
                  {[
                    { href: IG_URL, icon: <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg> },
                    { href: TT_URL, icon: <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.29 6.29 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.14 8.14 0 004.77 1.52V6.76a4.85 4.85 0 01-1-.07z" /></svg> },
                  ].map((sb, i) => (
                    <a key={i} href={sb.href} target="_blank" rel="noopener noreferrer" style={{ cursor: SCISSORS_PK }}
                      className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/28 hover:border-pink-500/40 hover:text-pink-400 hover:-translate-y-0.5 hover:shadow-[0_4px_14px_rgba(236,72,153,.2)] transition-all duration-280">
                      {sb.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className="py-4 border-t border-white/[.04] flex items-center justify-between flex-wrap gap-2">
              <p className="font-mono text-[.68rem] text-white/14">© {new Date().getFullYear()} Faded Nation. {t.footer.rights}</p>
              <p className="text-[.68rem] text-white/10">Made with ♥ in Oshawa, ON</p>
            </div>
          </div>
        </footer>

      </TracingBeam>
    </>
  );
}
