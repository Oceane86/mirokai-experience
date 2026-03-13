"use client";

import { useEffect, useRef, useState } from "react";

import { useProfile } from "@/hooks/useProfile";
import { trackEvent, trackPageView } from "@/lib/analytics";
import type { VisitorProfile } from "@/types/profile";

import { ArcadeSection } from "./ArcadeSection";
import { CapabilitiesCarousel } from "./CapabilitiesCarousel";
import { ConfirmationBanner } from "./ConfirmationBanner";
import { ContactSection } from "./ContactSection";
import { ExitPopup } from "./ExitPopup";
import { FAQ } from "./FAQ";
import { Hero } from "./Hero";
import { LocationSection } from "./LocationSection";
import { Testimonials } from "./Testimonials";
import { UseCases } from "./UseCases";

const DEPLOYED_ROBOTS = Number(process.env.NEXT_PUBLIC_DEPLOYED_ROBOTS ?? "24");
const MOBILE_TAB_EVENT = "mirokai-mobile-tab-change";

export function LandingExperience() {
  const contactsRef = useRef<HTMLElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeMobileTab, setActiveMobileTab] = useState<"home" | "contacts" | "game">("home");

  const { profile, hydrated, setProfile } = useProfile("team");
  const resolvedProfile: VisitorProfile = profile === "solo" ? "team" : profile;

  useEffect(() => {
    trackPageView("/");
  }, []);

  useEffect(() => {
    const syncViewport = () => {
      setIsMobile(window.innerWidth < 768);
    };
    syncViewport();
    window.addEventListener("resize", syncViewport);
    return () => window.removeEventListener("resize", syncViewport);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      setActiveMobileTab("home");
      return;
    }

    const getTabFromHash = () => {
      const hash = window.location.hash;
      if (hash === "#contacts") {
        return "contacts" as const;
      }
      if (hash === "#game") {
        return "game" as const;
      }
      return "home" as const;
    };

    const syncFromHash = () => {
      setActiveMobileTab(getTabFromHash());
    };

    const syncFromEvent = (event: Event) => {
      const customEvent = event as CustomEvent<{ tab?: "home" | "contacts" | "game" }>;
      if (customEvent.detail?.tab) {
        setActiveMobileTab(customEvent.detail.tab);
      }
    };

    syncFromHash();
    window.addEventListener(MOBILE_TAB_EVENT, syncFromEvent);
    window.addEventListener("hashchange", syncFromHash);
    return () => {
      window.removeEventListener(MOBILE_TAB_EVENT, syncFromEvent);
      window.removeEventListener("hashchange", syncFromHash);
    };
  }, [isMobile]);

  useEffect(() => {
    if (hydrated && profile === "solo") {
      setProfile("team");
    }
  }, [hydrated, profile, setProfile]);

  const handleProfileChange = (nextProfile: VisitorProfile) => {
    setProfile(nextProfile);
    trackEvent("profile_selected", { profile: nextProfile });
  };

  const scrollToContacts = () => {
    if (isMobile) {
      setActiveMobileTab("contacts");
      window.dispatchEvent(new CustomEvent(MOBILE_TAB_EVENT, { detail: { tab: "contacts" } }));
      window.location.hash = "contacts";
      return;
    }
    contactsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const showAll = !isMobile;
  const showHome = showAll || activeMobileTab === "home";
  const showContacts = showAll || activeMobileTab === "contacts";
  const showGame = showAll || activeMobileTab === "game";

  return (
    <main className="pb-14">
      <ConfirmationBanner />
      <div className={showHome ? undefined : "hidden"}>
          <Hero
            profile={hydrated ? resolvedProfile : "team"}
            deployedRobots={DEPLOYED_ROBOTS}
            onPrimaryCTA={scrollToContacts}
          />

          <CapabilitiesCarousel />

          <UseCases />

          <Testimonials />
          <FAQ />
          <LocationSection />
          <ExitPopup profile={hydrated ? resolvedProfile : "team"} />
      </div>

      <div className={showContacts ? undefined : "hidden"}>
        <section ref={contactsRef} id="contacts">
          <ContactSection profile={hydrated ? resolvedProfile : "team"} />
        </section>
      </div>

      <section id="game" className={showGame ? undefined : "hidden"}>
          <ArcadeSection />
      </section>
    </main>
  );
}
