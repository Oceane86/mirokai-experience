"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

import { useAppPreferences } from "@/components/providers/AppPreferencesProvider";

const capabilities = {
  fr: [
    {
      icon: "/media/icone_carrousel1.svg",
      title: "Interaction naturelle",
      features: [
        "Reconnaissance vocale multilingue",
        "Compréhension du contexte émotionnel",
        "Réponses adaptées en temps réel",
      ],
    },
    {
      icon: "/media/icone_carrousel2.svg",
      title: "Narration immersive",
      features: [
        "Scénarios narratifs personnalisables",
        "Univers Nimira intégré",
        "Storytelling adapté au secteur",
      ],
    },
    {
      icon: "/media/icone_carrousel1.svg",
      title: "Mobilité & présence",
      features: [
        "Déplacement autonome sécurisé",
        "Détection et évitement d'obstacles",
        "Présence dans les espaces publics",
      ],
    },
    {
      icon: "/media/icone_carrousel2.svg",
      title: "Intelligence émotionnelle",
      features: [
        "Analyse des expressions du visage",
        "Adaptation du ton et du discours",
        "Suivi de l'engagement visiteur",
      ],
    },
    {
      icon: "/media/icone_carrousel1.svg",
      title: "Intégration B2B",
      features: [
        "API ouverte et connecteurs métier",
        "Dashboard KPI temps réel",
        "Personnalisation sans code",
      ],
    },
    {
      icon: "/media/icone_carrousel2.svg",
      title: "Multi-déploiement",
      features: [
        "Flotte de robots coordonnée",
        "Gestion centralisée des scénarios",
        "Mise à jour à distance instantanée",
      ],
    },
  ],
  en: [
    {
      icon: "/media/icone_carrousel1.svg",
      title: "Natural Interaction",
      features: [
        "Multilingual voice recognition",
        "Emotional context understanding",
        "Real-time adaptive responses",
      ],
    },
    {
      icon: "/media/icone_carrousel2.svg",
      title: "Immersive Storytelling",
      features: [
        "Customizable narrative scenarios",
        "Integrated Nimira universe",
        "Sector-tailored storytelling",
      ],
    },
    {
      icon: "/media/icone_carrousel1.svg",
      title: "Mobility & Presence",
      features: [
        "Safe autonomous movement",
        "Obstacle detection and avoidance",
        "Presence in public spaces",
      ],
    },
    {
      icon: "/media/icone_carrousel2.svg",
      title: "Emotional Intelligence",
      features: [
        "Facial expression analysis",
        "Tone and speech adaptation",
        "Visitor engagement tracking",
      ],
    },
    {
      icon: "/media/icone_carrousel1.svg",
      title: "B2B Integration",
      features: [
        "Open API & business connectors",
        "Real-time KPI dashboard",
        "No-code customization",
      ],
    },
    {
      icon: "/media/icone_carrousel2.svg",
      title: "Multi-deployment",
      features: [
        "Coordinated robot fleet",
        "Centralized scenario management",
        "Instant remote updates",
      ],
    },
  ],
} as const;

export function MirokaiCapabilities() {
  const { locale, theme } = useAppPreferences();
  const isLight = theme === "nimira-light";
  const scrollRef = useRef<HTMLDivElement>(null);
  const items = capabilities[locale];

  return (
    <section className="section-wrap py-10">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="mb-6"
      >
        <p className={`text-xs uppercase tracking-[0.2em] ${isLight ? "text-[#202020]/65" : "text-white/60"}`}>
          {locale === "fr" ? "Technologie Enchanted Tools" : "Enchanted Tools Technology"}
        </p>
        <h2 className="mt-2 text-2xl sm:text-3xl">
          {locale === "fr" ? "LES CAPACITÉS DE NOS MIROKAÏ" : "MIROKAÏ CAPABILITIES"}
        </h2>
      </motion.div>

      {/* Carrousel scrollable horizontalement */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin"
        style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}
      >
        {items.map((cap, i) => (
          <motion.article
            key={cap.title}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.35, delay: i * 0.06, ease: "easeInOut" }}
            className="glass-panel flex min-w-[260px] max-w-[280px] flex-shrink-0 flex-col rounded-2xl p-5"
            style={{ scrollSnapAlign: "start" }}
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-white/15 bg-white/5">
              <img src={cap.icon} alt="" aria-hidden="true" className="h-7 w-7 object-contain" />
            </div>

            <h3 className="text-base font-semibold">{cap.title}</h3>

            <ul className="mt-3 space-y-2">
              {cap.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm text-white/75">
                  <img
                    src="/media/icone_check.svg"
                    alt=""
                    aria-hidden="true"
                    className="mt-0.5 h-4 w-4 flex-shrink-0 object-contain"
                  />
                  {feature}
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>

      {/* Indicateur de scroll */}
      <p className={`mt-2 text-center text-xs ${isLight ? "text-[#202020]/45" : "text-white/35"}`}>
        {locale === "fr" ? "← Faites défiler →" : "← Scroll →"}
      </p>
    </section>
  );
}
