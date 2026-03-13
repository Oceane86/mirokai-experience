"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { useAppPreferences } from "@/components/providers/AppPreferencesProvider";

export function Testimonials() {
  const { locale } = useAppPreferences();
  const testimonials = [
    {
      quote: "Mirokaï nous a offert une expérience enrichissante qui transforme notre …",
      initials: "RG",
      author: "Marc D.",
      company: "Renault Group",
    },
    {
      quote: "L'expérience Mirokaï a créé un moment fort pour nos équipes. Un outil de…",
      initials: "BNP",
      author: "Sophie L.",
      company: "BNP Paribas",
    },
    {
      quote: "Une immersion unique qui a su convaincre nos partenaires. Mirokaï dépass…",
      initials: "CAP",
      author: "Thomas B.",
      company: "Capgemini",
    },
    {
      quote: "Nos collaborateurs ont adoré la rencontre avec les robots. Une expérienc…",
      initials: "AC",
      author: "Julie R.",
      company: "Accor Hotels",
    },
    {
      quote: "Une visite qui a ouvert des perspectives concrètes sur l'IA. Mirokaï ren…",
      initials: "SNCF",
      author: "Antoine M.",
      company: "SNCF",
    },
  ] as const;

  const labels = {
    fr: {
      eyebrow: "Ils nous font confiance",
      title: "ILS NOUS FONT CONFIANCE",
      subtitle: "Découvrez comment les entreprises leaders transforment leur organisation.",
      aria: "Voir le témoignage",
    },
    en: {
      eyebrow: "They trust us",
      title: "THEY TRUST US",
      subtitle: "Discover how leading companies are transforming their organization.",
      aria: "Show testimonial",
    },
  } as const;

  const t = labels[locale];

  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isCarouselMode, setIsCarouselMode] = useState(false);

  useEffect(() => {
    const syncMode = () => {
      setIsCarouselMode(window.innerWidth >= 1024);
    };

    syncMode();
    window.addEventListener("resize", syncMode);
    return () => window.removeEventListener("resize", syncMode);
  }, []);

  useEffect(() => {
    if (isPaused || !isCarouselMode) {
      return;
    }

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % testimonials.length);
    }, 11000);
    return () => window.clearInterval(timer);
  }, [isCarouselMode, isPaused, testimonials.length]);

  const item = testimonials[index];

  return (
    <section
      className="section-wrap py-10"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      <p className="text-xs uppercase tracking-[0.2em] text-white/70">{t.eyebrow}</p>
      <h2 className="mt-2 text-2xl sm:text-3xl">{t.title}</h2>
      <p className="mt-2 max-w-3xl text-sm text-white/75">{t.subtitle}</p>

      {/* Mobile : grille de cards */}
      <div className="mt-6 grid gap-4 lg:hidden">
        {testimonials.map((testimonial) => (
          <article key={testimonial.company} className="glass-panel rounded-2xl p-5">
            <div className="flex items-start justify-between gap-3">
              <span className="inline-flex min-w-12 justify-center rounded-full border border-[#00F5C4]/40 bg-[#00F5C4]/12 px-2 py-1 text-xs font-semibold text-[#00F5C4]">
                {testimonial.initials}
              </span>
              <p className="text-[#FFD166]">{"★ ★ ★ ★ ★"}</p>
            </div>
            <blockquote className="mt-3 text-sm leading-relaxed text-white/85">
              « {testimonial.quote} »
            </blockquote>
            <div className="mt-4 border-t border-white/10 pt-3">
              <p className="text-sm font-medium">{testimonial.author}</p>
              <p className="mt-0.5 text-xs uppercase tracking-[0.12em] text-[#FFD166]">{testimonial.company}</p>
            </div>
          </article>
        ))}
      </div>

      {/* Desktop : carousel auto */}
      <div className="mt-6 hidden lg:block">
        <motion.figure
          key={item.company}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="glass-panel rounded-3xl p-6"
        >
          <div className="flex items-start justify-between gap-4">
            <span className="inline-flex min-w-14 justify-center rounded-full border border-[#00F5C4]/40 bg-[#00F5C4]/12 px-2.5 py-1.5 text-sm font-semibold text-[#00F5C4]">
              {item.initials}
            </span>
            <p className="text-[#FFD166]">{"★ ★ ★ ★ ★"}</p>
          </div>
          <blockquote className="mt-4 text-xl leading-relaxed sm:text-2xl">
            « {item.quote} »
          </blockquote>
          <figcaption className="mt-5 border-t border-white/10 pt-4">
            <p className="text-base font-medium">{item.author}</p>
            <p className="mt-0.5 text-xs uppercase tracking-[0.14em] text-[#F5C842]">{item.company}</p>
          </figcaption>
        </motion.figure>

        <div className="mt-4 flex gap-2">
          {testimonials.map((testimonial, dotIndex) => (
            <button
              key={testimonial.company}
              type="button"
              onClick={() => setIndex(dotIndex)}
              className={`h-2 w-8 rounded-full transition ${
                dotIndex === index ? "bg-[#F5C842]" : "bg-white/20"
              }`}
              aria-label={`${t.aria} ${dotIndex + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
