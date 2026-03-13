"use client";

import { useAppPreferences } from "@/components/providers/AppPreferencesProvider";

interface SlotCounterProps {
  deployedRobots: number;
}

export function SlotCounter({ deployedRobots }: SlotCounterProps) {
  const { locale } = useAppPreferences();
  const copy = {
    fr: { deployed: "Robots déployés :" },
    en: { deployed: "Robots deployed:" },
  } as const;
  const t = copy[locale];

  return (
    <div className="glass-panel w-full rounded-2xl px-5 py-4 flex items-center justify-between">
      <span className="text-base text-white/80">{t.deployed}</span>
      <span className="text-lg font-semibold text-[#0eaa92]">{deployedRobots}</span>
    </div>
  );
}