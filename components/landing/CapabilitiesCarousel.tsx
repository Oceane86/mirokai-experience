"use client";

import { motion } from "framer-motion";

import { useAppPreferences } from "@/components/providers/AppPreferencesProvider";

const cards = {
  fr: [
    {
      icon: "/media/icone_carrousel1.svg",
      title: "Interaction sociale naturelle",
      items: ["Dialogue vocal", "Compréhension", "Expressions faciales", "Présence émotionnelle"],
    },
    {
      icon: "/media/icone_carrousel2.svg",
      title: "Mobilité dans les environnements",
      items: ["Navigation autonome", "Évitement d'obstacles", "Adaptation dynamique", "Déplacement fluide"],
    },
    {
      icon: "/media/icone_carrousel1.svg",
      title: "IA émotionnelle & narrative",
      items: ["Détection d'émotions", "Personnalisation temps réel", "Narration Nimira", "Mémoire contextuelle"],
    },
    {
      icon: "/media/icone_carrousel2.svg",
      title: "Intégration B2B & déploiement",
      items: ["API ouvertes", "Dashboard admin", "Configuration no-code", "Supervision en direct"],
    },
  ],
  en: [
    {
      icon: "/media/icone_carrousel1.svg",
      title: "Natural social interaction",
      items: ["Voice dialogue", "Understanding", "Facial expressions", "Emotional presence"],
    },
    {
      icon: "/media/icone_carrousel2.svg",
      title: "Mobility in environments",
      items: ["Autonomous navigation", "Obstacle avoidance", "Dynamic adaptation", "Fluid movement"],
    },
    {
      icon: "/media/icone_carrousel1.svg",
      title: "Emotional & narrative AI",
      items: ["Emotion detection", "Real-time personalization", "Nimira storytelling", "Contextual memory"],
    },
    {
      icon: "/media/icone_carrousel2.svg",
      title: "B2B integration & deployment",
      items: ["Open APIs", "Admin dashboard", "No-code configuration", "Live supervision"],
    },
  ],
} as const;

export function CapabilitiesCarousel() {
  const { locale, theme } = useAppPreferences();
  const isLight = theme === "nimira-light";
  const items = cards[locale];
  const title = locale === "fr" ? "LES CAPACITÉS DE NOS MIROKAÏ" : "OUR MIROKAÏ CAPABILITIES";

  return (
    <section className="section-wrap py-10">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="mb-6"
      >
        <h2 className="text-2xl font-bold uppercase tracking-[0.12em] sm:text-3xl">{title}</h2>
      </motion.div>

      {/* Scrollable carousel — deux cartes visibles */}
      <div className="scrollbar-hide -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:px-6">
        {items.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: i * 0.08, ease: "easeInOut" }}
            className="glass-panel flex w-[46vw] max-w-[220px] shrink-0 snap-start flex-col gap-4 rounded-2xl p-4 sm:w-[210px]"
          >
            {/* Icône grande centrée */}
            <div className="flex justify-center">
              <img
                src={card.icon}
                alt=""
                aria-hidden="true"
                className="h-20 w-20 select-none object-contain"
              />
            </div>

            {/* Titre */}
            <h3 className="text-sm font-semibold leading-snug">{card.title}</h3>

            {/* Items — checkmark à droite */}
            <ul className="space-y-2">
              {card.items.map((item) => (
                <li key={item} className="flex items-center justify-between gap-2">
                  <span className={`text-xs leading-snug ${isLight ? "text-[#202020]/82" : "text-white/80"}`}>
                    {item}
                  </span>
                  <img
                    src="/media/icone_check.svg"
                    alt=""
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 select-none"
                  />
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}