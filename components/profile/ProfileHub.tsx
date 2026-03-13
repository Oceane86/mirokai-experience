"use client";

import { motion } from "framer-motion";
import { Bot, Gamepad2, LogOut, MapPinned, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { FloorPlan } from "@/components/experience/FloorPlan";
import { useAppPreferences } from "@/components/providers/AppPreferencesProvider";
import { NavBackHome } from "@/components/ui/NavBackHome";
import { useVisitorSession } from "@/hooks/useVisitorSession";
import { moduleSeed } from "@/lib/moduleSeed";
import type { VisitorSegment } from "@/types/profile";
import { RobotScenarioPanel } from "./RobotScenarioPanel";

interface ProfileHubProps {
  adminAuthenticated: boolean;
  nextPath: string | null;
  blockedReason: string | null;
}

type AdminStatus = "idle" | "loading" | "error";
type VisitorStatus = "idle" | "loading" | "error";

export function ProfileHub({ adminAuthenticated, nextPath, blockedReason }: ProfileHubProps) {
  const router = useRouter();
  const { locale, theme } = useAppPreferences();
  const isLight = theme === "nimira-light";
  const { session, hydrated, signIn, signOut } = useVisitorSession();

  const [name, setName] = useState("");
  const [segment, setSegment] = useState<VisitorSegment>("b2c");
  const [activeModuleId, setActiveModuleId] = useState(moduleSeed[0]?.id ?? "");
  const activeModule = useMemo(
    () => moduleSeed.find((m) => m.id === activeModuleId) ?? moduleSeed[0],
    [activeModuleId],
  );
  const [visitorStatus, setVisitorStatus] = useState<VisitorStatus>("idle");
  const [adminPassword, setAdminPassword] = useState("");
  const [adminStatus, setAdminStatus] = useState<AdminStatus>("idle");

  useEffect(() => {
    if (!hydrated) return;
    setName(session?.name ?? "");
    setSegment(session?.segment ?? "b2c");
  }, [hydrated, session]);

  const copy = {
    fr: {
      eyebrow: "Espace profil",
      title: "Connexion visiteur et admin",
      intro: "Connectez-vous ici pour débloquer la visite, personnaliser les messages robot et accéder à l'espace admin.",
      yourName: "Votre prénom / nom",
      connect: "Se connecter",
      update: "Mettre à jour mon profil",
      invalid: "Veuillez saisir un nom valide.",
      profileReady: "Profil actif",
      disconnect: "Se déconnecter",
      visit: "Accéder à la visite",
      quiz: "Mission Nimira",
      memory: "Memory Nimira",
      b2bGame: "Simulation B2B",
      b2bGameHint: "Mode B2B: accès à une simulation ROI/KPI adaptée aux décideurs.",
      blockedGames: "Le mode B2B redirige vers la simulation business dédiée.",
      adminTitle: "Connexion admin",
      adminDesc: "Le dashboard et la gestion modules passent désormais par cet accès.",
      adminPassword: "Mot de passe admin",
      adminConnect: "Connexion admin",
      adminInvalid: "Mot de passe admin invalide.",
      adminReady: "Session admin active.",
      openAdmin: "Ouvrir l'admin",
      openDashboard: "Ouvrir le dashboard",
      logoutAdmin: "Déconnexion admin",
      hello: "Bonjour",
      robotB2C: "Je prépare une visite immersive adaptée à votre rythme.",
      robotB2B: "Je vais vous guider sur les cas d'usage et KPI entreprise.",
    },
    en: {
      eyebrow: "Profile area",
      title: "Visitor and admin sign-in",
      intro: "Sign in here to unlock the tour, personalize robot messages, and access admin space.",
      yourName: "Your name",
      connect: "Sign in",
      update: "Update my profile",
      invalid: "Please provide a valid name.",
      profileReady: "Active profile",
      disconnect: "Sign out",
      visit: "Open tour",
      quiz: "Mission Nimira",
      memory: "Nimira Memory",
      b2bGame: "B2B Simulation",
      b2bGameHint: "B2B mode: access to a dedicated ROI/KPI simulation for stakeholders.",
      blockedGames: "B2B mode redirects to the dedicated business simulation.",
      adminTitle: "Admin sign-in",
      adminDesc: "Dashboard and module management are now accessible from this gateway.",
      adminPassword: "Admin password",
      adminConnect: "Sign in as admin",
      adminInvalid: "Invalid admin password.",
      adminReady: "Admin session active.",
      openAdmin: "Open admin",
      openDashboard: "Open dashboard",
      logoutAdmin: "Admin sign-out",
      hello: "Hello",
      robotB2C: "I am preparing an immersive tour tailored to your pace.",
      robotB2B: "I will guide you through enterprise use cases and KPI narratives.",
    },
  } as const;

  const t = copy[locale];

  const personalizedRobotText = useMemo(() => {
    if (!session) return null;
    return session.segment === "b2b" ? t.robotB2B : t.robotB2C;
  }, [session, t.robotB2B, t.robotB2C]);

  const resolveNextPath = (candidate: string | null, currentSegment: VisitorSegment) => {
    if (!candidate || !candidate.startsWith("/")) return "/experience";
    if (currentSegment === "b2b" && candidate.startsWith("/game/memory")) return "/game";
    return candidate;
  };

  const onVisitorSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (name.trim().length < 2) { setVisitorStatus("error"); return; }
    setVisitorStatus("loading");
    try {
      const saved = await signIn({ name: name.trim(), segment });
      setVisitorStatus("idle");
      if (nextPath) router.push(resolveNextPath(nextPath, saved.segment));
      router.refresh();
    } catch {
      setVisitorStatus("error");
    }
  };

  const onVisitorLogout = async () => { await signOut(); router.refresh(); };

  const onAdminSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAdminStatus("loading");
    const response = await fetch("/api/dashboard-auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: adminPassword }),
    });
    if (!response.ok) { setAdminStatus("error"); return; }
    setAdminStatus("idle");
    setAdminPassword("");
    router.push("/admin");
    router.refresh();
  };

  const onAdminLogout = async () => {
    await fetch("/api/dashboard-auth", { method: "DELETE" });
    router.refresh();
  };

  return (
    <main className="section-wrap py-8">
      <div className="mx-auto max-w-5xl space-y-4">
        <NavBackHome />

        <header className="section-shell">
          <p className={`text-xs uppercase tracking-[0.18em] ${isLight ? "text-[#202020]/65" : "text-white/70"}`}>
            {t.eyebrow}
          </p>
          <h1 className="mt-2 text-3xl sm:text-4xl">{t.title}</h1>
          <p className={`mt-3 max-w-3xl text-sm ${isLight ? "text-[#202020]/80" : "text-white/80"}`}>{t.intro}</p>
        </header>

        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="glass-panel rounded-3xl p-5">
            {blockedReason === "games" ? (
              <p className="mb-3 rounded-xl border border-[#FFD166]/55 bg-[#FFD166]/15 px-3 py-2 text-sm text-[#FFD166]">
                {t.blockedGames}
              </p>
            ) : null}

            {session ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mb-4 rounded-2xl border p-4 ${isLight ? "border-[#202020]/12 bg-white/85" : "border-white/15 bg-white/5"}`}
              >
                <p className="inline-flex items-center gap-2 text-sm font-medium">
                  <Bot size={16} className="text-[#00F5C4]" />
                  {t.hello} {session.name}
                </p>
                {personalizedRobotText ? (
                  <p className={`mt-2 text-sm ${isLight ? "text-[#202020]/82" : "text-white/80"}`}>{personalizedRobotText}</p>
                ) : null}
              </motion.div>
            ) : null}

            <form onSubmit={onVisitorSubmit} className="space-y-3">
              <label className="block text-xs uppercase tracking-[0.14em] text-white/70">{t.yourName}</label>
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder={t.yourName}
                className="w-full rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm outline-none focus:border-[#53B3FF]"
              />
              <button type="submit" className="cta-primary w-full">
                {visitorStatus === "loading" ? "..." : session ? t.update : t.connect}
              </button>
              {visitorStatus === "error" ? <p className="text-xs text-red-300">{t.invalid}</p> : null}
            </form>

            {session ? (
              <div className="mt-4 space-y-3">
                <p className="text-xs uppercase tracking-[0.14em] text-white/70">
                  {t.profileReady} • {session.segment.toUpperCase()}
                </p>
                <div className="flex flex-wrap gap-2">
                  <Link href="/experience" className="cta-primary inline-flex items-center gap-2">
                    <MapPinned size={15} />
                    {t.visit}
                  </Link>
                  {session.segment === "b2c" ? (
                    <>
                      <Link href="/game" className="cta-secondary inline-flex items-center gap-2">
                        <Gamepad2 size={15} />
                        {t.quiz}
                      </Link>
                      <Link href="/game/memory" className="cta-secondary">{t.memory}</Link>
                    </>
                  ) : (
                    <Link href="/game" className="cta-secondary inline-flex items-center gap-2">
                      <Gamepad2 size={15} />
                      {t.b2bGame}
                    </Link>
                  )}
                </div>
                {session.segment === "b2b" ? (
                  <p className={`text-xs ${isLight ? "text-[#202020]/70" : "text-white/70"}`}>{t.b2bGameHint}</p>
                ) : null}
                <button type="button" onClick={onVisitorLogout} className="cta-secondary inline-flex items-center gap-2">
                  <LogOut size={14} />
                  {t.disconnect}
                </button>
              </div>
            ) : null}
          </section>

          <div className="space-y-4">
            <RobotScenarioPanel visitorName={session?.name} visitorSegment={session?.segment} />

            {/* Plan interactif — juste avant la connexion admin */}
            {session ? (
              <motion.section
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="glass-panel overflow-hidden rounded-3xl p-5"
              >
                <p className={`text-xs uppercase tracking-[0.2em] ${isLight ? "text-[#202020]/68" : "text-white/70"}`}>
                  {locale === "fr" ? "Plan interactif de l'expérience" : "Interactive experience map"}
                </p>
                <p className={`mt-2 text-sm ${isLight ? "text-[#202020]/78" : "text-white/78"}`}>
                  {locale === "fr"
                    ? "Sélectionnez un module pour voir son cartel en direct."
                    : "Select a module to reveal its live caption."}
                </p>
                <div className="mt-3">
                  <FloorPlan
                    modules={moduleSeed}
                    activeModuleId={activeModule?.id}
                    onSelectModule={setActiveModuleId}
                  />
                </div>
                {activeModule ? (
                  <div className={`mt-3 rounded-2xl border p-3 ${isLight ? "border-[#202020]/12 bg-white/85" : "border-white/15 bg-white/5"}`}>
                    <p className="text-xs uppercase tracking-[0.14em] text-[#00F5C4]">Module #{activeModule.number}</p>
                    <h3 className="mt-1 text-lg">{activeModule.name}</h3>
                    <p className={`mt-1 text-sm ${isLight ? "text-[#202020]/80" : "text-white/80"}`}>{activeModule.description}</p>
                  </div>
                ) : null}
                <Link href="/experience" className="cta-secondary mt-4 inline-flex w-full items-center justify-center gap-2">
                  {locale === "fr" ? "Ouvrir la visite complète" : "Open full tour"}
                </Link>
              </motion.section>
            ) : null}

            <section className="glass-panel rounded-3xl p-5">
              <p className="text-xs uppercase tracking-[0.14em] text-white/70">{t.adminTitle}</p>
              <h2 className="mt-2 text-xl">{t.adminTitle}</h2>
              <p className={`mt-2 text-sm ${isLight ? "text-[#202020]/78" : "text-white/75"}`}>{t.adminDesc}</p>

              {adminAuthenticated ? (
                <div className="mt-4 space-y-3">
                  <p className="inline-flex items-center gap-2 text-sm text-[#06D6A0]">
                    <ShieldCheck size={16} />
                    {t.adminReady}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Link href="/admin" className="cta-primary">{t.openAdmin}</Link>
                    <Link href="/dashboard" className="cta-secondary">{t.openDashboard}</Link>
                  </div>
                  <button type="button" onClick={onAdminLogout} className="cta-secondary">{t.logoutAdmin}</button>
                </div>
              ) : (
                <form onSubmit={onAdminSubmit} className="mt-4 space-y-3">
                  <input
                    type="password"
                    value={adminPassword}
                    onChange={(event) => setAdminPassword(event.target.value)}
                    placeholder={t.adminPassword}
                    className="w-full rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm outline-none focus:border-[#53B3FF]"
                  />
                  <button type="submit" className="cta-primary w-full">
                    {adminStatus === "loading" ? "..." : t.adminConnect}
                  </button>
                  {adminStatus === "error" ? <p className="text-xs text-red-300">{t.adminInvalid}</p> : null}
                </form>
              )}
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}