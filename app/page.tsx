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
      viewServices: "View Services",
      cta: "Reserve Your Seat",
      scroll: "Scroll to explore",
    },
    services: {
      label: "◆ THE MENU ◆",
      headline: "Crafted for the Elite.",
      sub: "Every service includes a complimentary hot towel finish and neck massage.",
      perk: "Free hot towel & massage with every service",
      items: [
  { name: "Men's Cut",               price: 40, desc: "Precision fade, classic cut, or textured crop." },
  { name: "Men's Cut & Beard",        price: 65, desc: "Full cut paired with beard trim or shave." },
  { name: "Kid Cut",                  price: 35, desc: "Gentle hands, big results." },
  { name: "Senior Cut",               price: 25, desc: "Timeless craft, earned respect." },
  { name: "Senior Cut & Beard",       price: 50, desc: "Full service for the distinguished." },
  { name: "Design",                   price: 0,  desc: "Price varies — ask us." },
  { name: "Buzz",                     price: 25, desc: "Clean, sharp, effortless." },
  { name: "Line Up",                  price: 20, desc: "Crisp edges that speak for you." },
  { name: "Lineup / Buzz & Beard",    price: 50, desc: "Combined precision package." },
  { name: "Buzz & Beard Trim",               price: 50, desc: "Sculpted and shaped to perfection." },
  { name: "Shave or Beard Trim",                    price: 35, desc: "Full shave or beard trim." },
  { name: "Facial Cleansing",         price: 20, desc: "Deep cleanse for a fresh face." },
],
    },
    staff: {
      label: "◆ YOUR BARBERS ◆",
      headline: "The Artists Behind the Chair.",
      sub: "Meet the hands behind every cut.",
      bookWith: "Book with",
      connectLabel: "Connect With Us",
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
          title: "Nathanael",
          src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
          bio: "Mexican barber with 5+ years of experience. Scissors cuts, clean fades, and signature designs that speak for themselves.",
          role: "Master Barber",
          bookHref: BOOK_URL,
          accentColor: "blue" as const,
        },
      ],
    },
    testimonials: {
      label: "◆ WORD AROUND TOWN ◆",
      headline: "The Community Speaks.",
      sub: "Real clients. Real cuts. Real love for the craft.",
      items: [
        { quote: "Excellent service and a great atmosphere. The best barber in Oshawa. Don't hesitate to go.", name: "Nazariy I.", designation: "@nazariy.ijhak", src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop" },
        { quote: "Nathaniel is just amazing. Definitely the best barber in Oshawa! He is fun to chat with and does an absolutely amazing job cutting your hair.", name: "Rohan M.", designation: "@rohan.mittra", src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop" },
        { quote: "Took my son to get a haircut and Nathaneal gave him a great cut. It's super kid friendly, he has booster seats and a PlayStation set up for the kids. Really nice atmosphere! Would definitely recommend coming here!", name: "Anna S.", designation: "@anna.sierra", src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop" },
        { quote: "Nathanael did an amazing job! Cutting both my hair and my 3-year-old son’s hair. My son had never let anyone cut his hair before, but Nathanael was very patient and made him feel comfortable the whole time. The atmosphere was super welcoming and relaxed, and he’s not only very talented but also great to talk to.", name: "Diego C.", designation: "@diego.castillo", src: "https://images.unsplash.com/photo-1618641986557-1ecd230959aa?q=80&w=800&auto=format&fit=crop" },
        { quote: "10/10 service and cut! Andrea took pride in her work and delivered a perfect fade and beard trim. Very well run shop with excellent service and attention to detail!", name: "Anthony T.", designation: "@anthony.t", src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop" },
      ],
    },
    footer: {
      hours: "Hours of Operation",
      rights: "All rights reserved.",
      motto: "Crafting the signature of your success.",
      bookLabel: "Book",
      connectLabel: "Connect with us",
      bookOnline: "Book Online",
      schedule: [
        { day: "Monday – Wednesday", time: "10:00 AM – 8:00 PM" },
        { day: "Thursday",        time: "10:00 AM – 10:00 PM" },
        { day: "Friday - Saturday",          time: "9:00 AM – 10:00 PM" },
        { day: "Sunday",          time: "Closed" },
      ],
    },
  },
  es: {
    navBook: "Reservar",
    hero: {
      tagline: "NO ES SOLO UN CORTE",
      headline: ["Eleva Tu ", "Imagen."],
      sub: "Entra con estilo. Sal como leyenda.",
      viewServices: "Ver Servicios",
      cta: "Reserva Tu Lugar",
      scroll: "Desplázate para explorar",
    },
    services: {
      label: "◆ EL MENÚ ◆",
      headline: "Creado para la Élite.",
      sub: "Cada servicio incluye toalla caliente y masaje de cuello.",
      perk: "Toalla caliente y masaje gratis con cada servicio",
      items: [
        { name: "Corte de Hombre",        price: 40, desc: "Fade de precisión, corte clásico o texturizado." },
        { name: "Corte & Barba",           price: 65, desc: "Corte completo con recorte o afeitado de barba." },
        { name: "Corte de Niños",          price: 35, desc: "Manos gentiles, grandes resultados." },
        { name: "Corte Senior",            price: 25, desc: "Arte atemporal, respeto total." },
        { name: "Senior Corte & Barba",    price: 50, desc: "Servicio completo para el distinguido." },
        { name: "Diseño",                  price: 0,  desc: "Precio varía — pregúntanos." },
        { name: "Buzz",                    price: 25, desc: "Limpio, nítido, sin esfuerzo." },
        { name: "Perfilado",               price: 20, desc: "Bordes que hablan por ti." },
        { name: "Lineup / Buzz & Barba",   price: 50, desc: "Paquete de precisión combinado." },
        { name: "Buzz & Recorte de Barba", price: 50, desc: "Esculpido y definido a la perfección." },
        { name: "Afeitado o Recorte",      price: 35, desc: "Afeitado completo o recorte de barba." },
        { name: "Limpieza Facial",         price: 20, desc: "Limpieza profunda para un rostro fresco." },
      ],
    },
    staff: {
      label: "◆ TUS BARBEROS ◆",
      headline: "Los Artistas Detrás de la Silla.",
      sub: "Conoce las manos detrás de cada corte.",
      bookWith: "Reservar con",
      connectLabel: "Conéctate Con Nosotros",
      cards: [
        {
          title: "Andrea",
          src: "/andrea.jpg",
          bio: "Barbera colombiana que trata a cada cliente como VIP. Cortes de precisión, fades limpios y un ojo para el acabado perfecto.",
          role: "Maestra Barbera",
          bookHref: BOOK_URL,
          accentColor: "pink" as const,
        },
        {
          title: "Nathanael",
          src: "/nathanael.jpg",
          bio: "Barbero mexicano con más de 5 años de experiencia. Cortes con tijera, fades limpios y diseños únicos que hablan por sí solos.",
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
        { quote: "Excelente servicio y un gran ambiente. El mejor barbero en Oshawa. No dudes en ir.", name: "Nazariy I.", designation: "@nazariy.ijhak", src: "/client-1.jpg" },
        { quote: "Nathanael es simplemente increíble. Definitivamente el mejor barbero en Oshawa. Es divertido hablar con él y hace un trabajo absolutamente increíble cortando tu cabello.", name: "Rohan M.", designation: "@rohan.mittra", src: "/client-2.jpg" },
        { quote: "Llevé a mi hijo a cortarse el cabello y Nathanael le hizo un corte excelente. Es muy amigable para niños, tiene asientos elevadores y una PlayStation para los pequeños. ¡Muy buen ambiente!", name: "Anna S.", designation: "@anna.sierra", src: "/client-3.jpg" },
        { quote: "¡Nathanael hizo un trabajo increíble! Cortando el cabello de mi hijo de 3 años que nunca había dejado que nadie lo cortara. Nathanael fue muy paciente y lo hizo sentir cómodo todo el tiempo.", name: "Diego C.", designation: "@diego.castillo", src: "/client-4.jpg" },
        { quote: "¡Servicio y corte 10/10! Andrea se enorgulleció de su trabajo y entregó un fade perfecto con recorte de barba. ¡Muy buen negocio con excelente servicio y atención al detalle!", name: "Anthony T.", designation: "@anthony.t", src: "/client-5.jpg" },
      ],
    },
    footer: {
      hours: "Horario de Atención",
      rights: "Todos los derechos reservados.",
      motto: "Forjando la firma de tu éxito.",
      bookLabel: "Reservar",
      connectLabel: "Conéctate Con Nosotros",
      bookOnline: "Reservar en Línea",
      schedule: [
        { day: "Lunes – Miércoles",  time: "10:00 AM – 8:00 PM" },
        { day: "Jueves",             time: "10:00 AM – 10:00 PM" },
        { day: "Viernes – Sábado",   time: "9:00 AM – 10:00 PM" },
        { day: "Domingo",            time: "Cerrado" },
      ],
    },
  },
};

// ─── HERO SECTION FUNCTION ────────────────────────────────────────────
function HeroSection({ t }: { t: typeof DATA.en }) {
  const topImages = [
    "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1593702288056-7cc2a55b8f6a?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1534297635766-a262cdcb8ee4?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=800&auto=format&fit=crop",
  ];

  const bottomImages = [
    "https://images.unsplash.com/photo-1560869713-da86a9ec0744?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1512864084360-7c0d4ee74a7a?q=80&w=800&auto=format&fit=crop",
  ];

  return (
    <section id="hero" className="relative w-full overflow-hidden bg-[#0a0a0a]" style={{ minHeight: "75vh", maxHeight: "75vh" }}>
      <div className="absolute inset-0 flex flex-col gap-1 pt-[60px]">
        <div className="relative overflow-hidden" style={{ flex: 1 }}>
          <div className="flex gap-2 h-full" style={{ animation: "scrollRight 40s linear infinite", width: "max-content" }}>
            {[...topImages, ...topImages, ...topImages].map((src, i) => (
              <div key={i} className="relative flex-shrink-0 rounded-lg overflow-hidden" style={{ width: "320px", height: "100%" }}>
                <img src={src} alt="" className="w-full h-full object-cover" style={{ filter: "brightness(0.72)" }} />
              </div>
            ))}
          </div>
        </div>
        <div className="relative overflow-hidden" style={{ flex: 1 }}>
          <div className="flex gap-2 h-full" style={{ animation: "scrollLeft 40s linear infinite", width: "max-content" }}>
            {[...bottomImages, ...bottomImages, ...bottomImages].map((src, i) => (
              <div key={i} className="relative flex-shrink-0 rounded-lg overflow-hidden" style={{ width: "320px", height: "100%" }}>
                <img src={src} alt="" className="w-full h-full object-cover" style={{ filter: "brightness(0.72)" }} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute left-0 top-0 bottom-0 w-28 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, #0a0a0a, transparent)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-28 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, #0a0a0a, transparent)" }} />
      <div className="absolute top-[60px] left-0 right-0 h-14 z-10 pointer-events-none" style={{ background: "linear-gradient(to bottom, #0a0a0a, transparent)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-20 z-10 pointer-events-none" style={{ background: "linear-gradient(to top, #0a0a0a, transparent)" }} />
      <div className="absolute inset-0 z-10 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(0,0,0,0.35) 0%, transparent 70%)" }} />
      <div className="absolute inset-0 z-20 flex flex-col justify-end pb-14 px-10 md:px-16 pt-[60px]">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-3 mb-3"
        >
          <div className="w-7 h-px bg-white/35" />
          <span className="text-white/55 text-[10px] font-mono tracking-[.35em] uppercase">{t.hero.tagline}</span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="text-white font-bold leading-[0.9] tracking-tight mb-4"
          style={{ fontFamily: "'Syncopate', sans-serif", fontSize: "clamp(2.6rem, 7vw, 5.5rem)" }}
        >
          {t.hero.headline[0].toUpperCase()}
          <br />
          {t.hero.headline[1].toUpperCase()}
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-3 flex-wrap"
        >
          <button
            onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
            className="px-6 py-3 rounded-full text-white text-sm font-medium border border-white/25 hover:border-white/50 hover:bg-white/10 transition-all duration-300"
            style={{ backdropFilter: "blur(8px)" }}
          >
            {t.hero.viewServices}
          </button>
          <a
            href={BOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white hover:-translate-y-0.5 hover:scale-[1.02] transition-all duration-400"
            style={{ background: "linear-gradient(90deg,#be185d,#ec4899)", boxShadow: "0 0 24px rgba(236,72,153,0.45)" }}
          >
            {t.hero.cta}
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </motion.div>
        
      </div>
      <style>{`
        @keyframes scrollRight {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        @keyframes scrollLeft {
          0%   { transform: translateX(-33.333%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}

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
      

          {/* HERO */}
        <HeroSection t={t} />

        {/* SERVICES + STAFF — side by side */}
        <div className="relative">
          <div className="fixed inset-0 -z-10">
            <img
              src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=2000&auto=format&fit=crop"
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[#080808]/80" />
          </div>
        <section id="services" className="relative py-24 overflow-hidden">
          <GeoBg />
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-pink-500/22 to-transparent" />
          <div className="absolute left-0 top-0 bottom-0 w-[5px] bg-gradient-to-b from-transparent via-green-800/50 to-transparent" />
          <div className="absolute right-0 top-0 bottom-0 w-[5px] bg-gradient-to-b from-transparent via-green-800/38 to-transparent" />
          <div className="max-w-[1180px] mx-auto px-7">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

              {/* LEFT — Services */}
              <div>
                <div className="mb-8">
                  <SLabel text={t.services.label} />
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-800/40 bg-green-950/30 text-green-300 text-[12px] font-medium">
                    <Sparkles className="w-3 h-3" /> {t.services.perk}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {t.services.items.map((s, i) => (
                    <div key={i} className="group relative rounded-2xl border border-white/[.06] bg-[#111] p-4 overflow-hidden hover:border-pink-500/25 hover:shadow-[0_0_30px_rgba(236,72,153,.08)] transition-all duration-350 flex flex-col justify-between min-h-[130px]">
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(236,72,153,.05),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-350" />
                      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-pink-500/40 to-blue-500/40 opacity-0 group-hover:opacity-100 transition-opacity duration-350" />
                      <div className="relative z-10 flex flex-col h-full justify-between">
                        <div className="w-8 h-8 rounded-xl border border-pink-500/18 bg-pink-500/[.05] flex items-center justify-center mb-3 group-hover:border-pink-500/38 transition-colors duration-300 text-[12px] rotate-[-45deg]">✂</div>
                        <div>
                          <div className="font-bold text-white text-[.62rem] uppercase tracking-[.05em] mb-1.5 leading-tight" style={{ fontFamily: "'Syncopate',sans-serif" }}>{s.name}</div>
                          <div className="text-[1.2rem] font-bold bg-gradient-to-br from-pink-300 to-blue-400 bg-clip-text text-transparent" style={{ fontFamily: "'Syncopate',sans-serif" }}>
                            {s.price === 0 ? "Varies" : `$${s.price}`}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT — Staff */}
              <div id="staff">
                <div className="mb-8">
                  <SLabel text={t.staff.label} />
                  <div className="flex items-center gap-4 flex-wrap">
                    <span className="font-mono text-[.65rem] tracking-[.3em] text-white/50 uppercase">{t.staff.connectLabel}</span>
                    <div className="flex gap-2">
                      <a href={IG_URL} target="_blank" rel="noopener noreferrer" style={{ cursor: SCISSORS_PK }}
                        className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-white/40 hover:border-pink-500/50 hover:text-pink-400 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(236,72,153,.2)] transition-all duration-280">
                        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                      </a>
                      <a href={TT_URL} target="_blank" rel="noopener noreferrer" style={{ cursor: SCISSORS_PK }}
                        className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-white/40 hover:border-white/40 hover:text-white hover:-translate-y-0.5 transition-all duration-280">
                        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.29 6.29 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.14 8.14 0 004.77 1.52V6.76a4.85 4.85 0 01-1-.07z"/></svg>
                      </a>
                      <a href="https://wa.me/19055550182" target="_blank" rel="noopener noreferrer" style={{ cursor: SCISSORS_PK }}
                        className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-white/40 hover:border-green-500/50 hover:text-green-400 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(34,197,94,.2)] transition-all duration-280">
                        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {t.staff.cards.map((card, i) => (
                    <div key={i}>
                      <div
                        className="group relative rounded-2xl overflow-hidden cursor-pointer mb-3"
                        style={{ aspectRatio: "2/3", transformStyle: "preserve-3d", transition: "transform .1s ease" }}
                        onMouseMove={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          const rx = ((e.clientY - rect.top - rect.height/2) / rect.height) * -8;
                          const ry = ((e.clientX - rect.left - rect.width/2) / rect.width) * 8;
                          e.currentTarget.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.02,1.02,1.02)`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "perspective(800px) rotateX(0) rotateY(0) scale3d(1,1,1)";
                          e.currentTarget.style.transition = "transform .5s cubic-bezier(.22,1,.36,1)";
                        }}
                      >
                        <img
                          src={card.src}
                          alt={card.title}
                          className="w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-[1.04] group-hover:brightness-[0.55]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-5">
                          <h3 className="font-bold text-white text-[1rem] tracking-[.02em] drop-shadow-lg" style={{ fontFamily: "'Syncopate',sans-serif" }}>{card.title}</h3>
                        </div>
                      </div>
                      <p className="text-white/60 text-[.8rem] leading-[1.65] px-1 mb-3">{card.bio}</p>
                      <a
                      href={BOOK_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ cursor: SCISSORS_PK }}
                        className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[.75rem] font-semibold text-white transition-all duration-350 hover:-translate-y-0.5 mb-3 ${card.accentColor === "blue" ? "bg-gradient-to-r from-blue-800 to-blue-500 shadow-[0_0_12px_rgba(59,130,246,.3)]" : "bg-gradient-to-r from-[#be185d] to-pink-500 shadow-[0_0_12px_rgba(236,72,153,.3)]"}`}
                      >
                        {t.staff.bookWith} {card.title.split(" ")[0]} →
                      </a>
                      
                      
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/14 to-transparent" />
        </section>

        {/* TESTIMONIALS — AnimatedTestimonials */}
        <section id="testimonials" className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[#080808]/0 z-10" />
          <div className="relative z-20 max-w-[1180px] mx-auto px-7">
            <div className="text-center pt-24 pb-0">
              <SLabel text={t.testimonials.label} />
              <h2 className="text-[clamp(1.8rem,4.5vw,3.2rem)] font-bold text-white leading-none mb-4" style={{ fontFamily: "'Syncopate',sans-serif" }}>{t.testimonials.headline}</h2>
              <p className="text-white/42 max-w-[480px] mx-auto leading-[1.72] font-light">{t.testimonials.sub}</p>
            </div>
            <AnimatedTestimonials testimonials={t.testimonials.items} autoplay />
          </div>
        </section>
        </div>

        {/* FOOTER */}
        <footer className="relative bg-[#080808] border-t border-white/[.05] overflow-hidden" style={{ marginBottom: 0, paddingBottom: 0 }}>
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
                  { icon: <MapPin className="w-3.5 h-3.5 text-pink-500/45" />, text: "27 Bond St E, Oshawa, ON L1G 1A8" },
                  { icon: <Phone className="w-3.5 h-3.5 text-pink-500/45" />, text: "(905) 555-0182" },
                ].map((ci, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-white/55 text-[.8rem] mb-2">{ci.icon}{ci.text}</div>
                ))}
              </div>
              <div>
                <div className="font-mono text-[.65rem] tracking-[.3em] text-white/60 uppercase mb-4 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-white/50" /> {t.footer.hours}
                </div>
                {t.footer.schedule.map((s, i) => (
                  <div key={i} className="mb-2.5">
                    <div className="text-[.75rem] text-white/50 font-medium">{s.day}</div>
                    <div className="text-[.82rem] text-white/80 font-semibold">{s.time}</div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-8">
                <div>
                  <div className="font-mono text-[.65rem] tracking-[.3em] text-white/60 uppercase mb-4">{t.footer.bookLabel}</div>
                  <a href={BOOK_URL} target="_blank" rel="noopener noreferrer" style={{ cursor: SCISSORS_PK }}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-[.8rem] font-semibold text-white bg-gradient-to-r from-[#be185d] to-pink-500 hover:from-pink-500 hover:to-blue-500 hover:-translate-y-px transition-all duration-380 shadow-[0_0_18px_rgba(236,72,153,.22)]">
                    {t.footer.bookOnline} <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
                <div>
                  <div className="font-mono text-[.65rem] tracking-[.3em] text-white/60 uppercase mb-4">{t.footer.connectLabel}</div>
                  <div className="flex gap-3">
                    <a href={IG_URL} target="_blank" rel="noopener noreferrer" style={{ cursor: SCISSORS_PK }}
                      className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/40 hover:border-pink-500/50 hover:text-pink-400 hover:-translate-y-0.5 hover:shadow-[0_4px_14px_rgba(236,72,153,.2)] transition-all duration-280">
                      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                    </a>
                    <a href={TT_URL} target="_blank" rel="noopener noreferrer" style={{ cursor: SCISSORS_PK }}
                      className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/40 hover:border-white/40 hover:text-white hover:-translate-y-0.5 transition-all duration-280">
                      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.29 6.29 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.14 8.14 0 004.77 1.52V6.76a4.85 4.85 0 01-1-.07z"/></svg>
                    </a>
                    <a href="https://wa.me/19055550182" target="_blank" rel="noopener noreferrer" style={{ cursor: SCISSORS_PK }}
                      className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/40 hover:border-green-500/50 hover:text-green-400 hover:-translate-y-0.5 hover:shadow-[0_4px_14px_rgba(34,197,94,.2)] transition-all duration-280">
                      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="py-4 border-t border-white/[.04] flex items-center justify-between flex-wrap gap-2">
              <p className="font-mono text-[.68rem] text-white/14">© {new Date().getFullYear()} Faded Nation. {t.footer.rights}</p>
              <p className="text-[.68rem] text-white/10">Made with ♥ in Oshawa, ON</p>
            </div>
          </div>
        </footer>

    </>
  );
}
