"use client";

import { motion } from "framer-motion";

import { useAppPreferences } from "@/components/providers/AppPreferencesProvider";

const useCaseImages = [
  "/media/gallery/img_accueil.svg",
  "/media/gallery/img_cafe.svg",
  "/media/gallery/img_hospial.svg",
];

export function UseCases() {
  const { locale, theme } = useAppPreferences();
  const isLight = theme === "nimira-light";

  const copy = {
    fr: {
      title: "UN ROBOT PENSÉ POUR\nINTERAGIR AVEC LES HUMAINS",
      cta: "Voir plus",
      useCases: [
        {
          title: "Accueil & Orientation",
          description:
            "Imaginez un robot accueillant vos visiteurs, les orientant et répondant à leurs questions en toute autonomie.",
          image: useCaseImages[0],
        },
        {
          title: "Retail & Espaces publics",
          description:
            "Imaginez un robot informant, divertissant et augmentant la conversion en magasin ou en espace de marque.",
          image: useCaseImages[1],
        },
        {
          title: "Santé",
          description:
            "Imaginez un robot assistant les patients, détectant les émotions et racontant des histoires personnalisées pour un soutien émotionnel unique.",
          image: useCaseImages[2],
        },
      ],
    },
    en: {
      title: "A ROBOT DESIGNED TO\nINTERACT WITH HUMANS",
      cta: "Learn more",
      useCases: [
        {
          title: "Welcome & Guidance",
          description:
            "Imagine a robot welcoming your visitors, guiding them and answering their questions autonomously.",
          image: useCaseImages[0],
        },
        {
          title: "Retail & Public Spaces",
          description:
            "Imagine a robot informing, entertaining and improving conversion in stores or brand spaces.",
          image: useCaseImages[1],
        },
        {
          title: "Healthcare",
          description:
            "Imagine a robot assisting patients, detecting emotions and telling personalised stories for unique emotional support.",
          image: useCaseImages[2],
        },
      ],
    },
  } as const;

  const t = copy[locale];

  return (
    <section id="use-cases" className="section-wrap py-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="mb-8 text-center"
      >
        <h2 className="whitespace-pre-line text-2xl font-bold uppercase leading-tight tracking-[0.06em] sm:text-3xl lg:text-4xl">
          {t.title}
        </h2>
      </motion.div>

      {/* Scrollable carousel — une carte pleine largeur, scroll pour suivante */}
      <div className="scrollbar-hide -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:px-6 lg:grid lg:grid-cols-3 lg:overflow-visible lg:pb-0">
        {t.useCases.map((item, i) => (
          <motion.article
            key={item.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.4, delay: i * 0.1, ease: "easeInOut" }}
            className="glass-panel relative flex w-[calc(100vw-2rem)] shrink-0 snap-start flex-col overflow-hidden rounded-2xl sm:w-[calc(100vw-3rem)] lg:w-auto lg:max-w-none"
          >
            {/* Image full-width */}
            <div className="relative h-56 overflow-hidden sm:h-64">
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            </div>

            {/* Content */}
            <div className="flex flex-col gap-3 p-5">
              <h3 className="text-lg font-semibold leading-snug">{item.title}</h3>
              <p className={`text-sm leading-relaxed ${isLight ? "text-[#202020]/75" : "text-white/75"}`}>
                {item.description}
              </p>
              <button
                type="button"
                className="mt-1 w-full rounded-full px-4 py-2.5 text-sm font-normal transition hover:opacity-80 text-white"
                style={{ backgroundColor: "#434343", border: "none" }}
              >
                {t.cta}
              </button>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}