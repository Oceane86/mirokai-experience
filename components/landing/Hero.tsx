"use client";

import { motion } from "framer-motion";

import { useAppPreferences } from "@/components/providers/AppPreferencesProvider";
import type { VisitorProfile } from "@/types/profile";

import { SlotCounter } from "./SlotCounter";

interface HeroProps {
  profile: VisitorProfile;
  deployedRobots: number;
  onPrimaryCTA: () => void;
}

const heroCopy = {
  fr: {
    label: "MIROKAÏ",
    sublabel: "LE ROBOT CONÇU POUR ASSISTER VOTRE ENTREPRISE",
    pill: "Mirokaï personnalisé",
    description:
      "Venez vivre une expérience immersive où robotique sociale, IA émotionnelle et narration Mirokaï convergent pour créer un moment à fort impact humain.",
    imageCaption:
      "Découvrez comment Mirokaï améliore l'interaction humaine, assiste les équipes et transforme les espaces publics",
    reserve: "Réserver votre créneau",
    learnMore: "En savoir plus",
    stat1: "Satisfactions client",
    stat2: "Moments wow",
    headlines: {
      solo: "Vivez l'aventure Mirokaï en solo",
      team: "Faites vivre une sortie d'équipe mémorable",
      b2b: "Découvrez comment Mirokaï peut transformer votre entreprise",
    } as Record<VisitorProfile, string>,
  },
  en: {
    label: "MIROKAÏ",
    sublabel: "THE ROBOT DESIGNED TO ASSIST YOUR BUSINESS",
    pill: "Personalized Mirokaï",
    description:
      "Live an immersive journey where social robotics, emotional AI, and Mirokaï storytelling create a memorable human-first experience.",
    imageCaption:
      "Discover how Mirokaï improves human interaction, supports teams and transforms public spaces",
    reserve: "Book your slot",
    learnMore: "Learn more",
    stat1: "Client satisfaction",
    stat2: "Wow moments",
    headlines: {
      solo: "Experience Mirokaï solo",
      team: "Create a memorable team outing",
      b2b: "See how Mirokaï can transform your business",
    } as Record<VisitorProfile, string>,
  },
} as const;

export function Hero({ profile, deployedRobots, onPrimaryCTA }: HeroProps) {
  const { locale, theme } = useAppPreferences();
  const t = heroCopy[locale];
  const isLight = theme === "nimira-light";

  return (
    <section className="section-wrap relative pb-10 pt-10 sm:pt-14">
      <div className="absolute inset-x-0 top-0 -z-10 h-96 bg-[radial-gradient(circle_at_top,rgba(0,74,173,0.3),transparent_62%)]" />

      {/* ── BLOC VISUEL HAUT : MIROKAÏ + sous-titre + image + légende ── */}
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        className="flex flex-col items-center text-center gap-3 mb-6"
      >
        {/* MIROKAÏ outline */}
        <h1
          className="text-4xl font-extrabold uppercase tracking-[0.12em] sm:text-5xl"
          style={{
            color: "transparent",
            WebkitTextStroke: "2px rgba(255,255,255,0.92)",
            letterSpacing: "0.12em",
          }}
        >
          {t.label}
        </h1>

        {/* Sous-titre bold uppercase */}
        <p className="text-lg font-extrabold uppercase leading-tight tracking-[0.06em] text-white sm:text-xl max-w-xs sm:max-w-sm">
          {t.sublabel}
        </p>

        {/* Image hero */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeInOut", delay: 0.1 }}
          className="w-full flex justify-center"
        >
          <img
            src="/media/img_hero.svg"
            alt="Mirokaï"
            className="h-auto w-full max-w-xs sm:max-w-sm select-none object-contain nimira-float"
            style={{ maxHeight: "300px" }}
          />
        </motion.div>

        {/* Légende sous l'image */}
        <p className={`max-w-xs text-sm leading-relaxed ${isLight ? "text-[#202020]/75" : "text-white/70"}`}>
          {t.imageCaption}
        </p>
      </motion.div>

      {/* ── BLOC ACTION BAS : pill + headline + description + CTAs + stats ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut", delay: 0.2 }}
        className="section-shell space-y-5"
      >
        {/* Pill badge */}
        <p
          className={`inline-flex items-center rounded-full border px-4 py-1.5 text-sm ${
            isLight
              ? "border-[#a37a98]/40 bg-[#e7cfe0] text-[#3f3550]"
              : "border-white/25 bg-transparent text-white/90"
          }`}
        >
          {t.pill}
        </p>

        {/* Profile headline */}
        <h2 className={`text-3xl font-semibold leading-snug sm:text-4xl ${isLight ? "text-[#202020]" : "text-white"}`}>
          {t.headlines[profile]}
        </h2>

        {/* Description */}
        <p className={`text-base leading-relaxed ${isLight ? "text-[#202020]/75" : "text-white/75"}`}>
          {t.description}
        </p>

        {/* CTAs */}
        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={onPrimaryCTA}
            className="cta-primary w-full justify-center font-normal"
          >
            {t.reserve}
          </button>
          <a
            href="#use-cases"
            className="cta-secondary w-full justify-center font-normal"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("use-cases")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            {t.learnMore}
          </a>
        </div>

        {/* Stats */}
        <div className="flex flex-col gap-3">
          {/* Robots déployés — sans icône, sans bordure intérieure */}
          <SlotCounter deployedRobots={deployedRobots} />

          {/* Satisfaction client — sans icône Bot */}
          <div className="glass-panel rounded-2xl px-5 py-4">
            <p className={`text-base ${isLight ? "text-[#202020]/80" : "text-white/80"}`}>
              {t.stat1}
            </p>
            <p className="mt-2 text-4xl font-bold text-[#0eaa92]">98%</p>
            <p className={`mt-1 text-sm ${isLight ? "text-[#202020]/60" : "text-white/60"}`}>
              {t.stat2} : 4.9 / 5
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}