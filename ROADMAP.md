# Roadmap – Mirokai Experience

## Fonctionnel

- Capture email + Exit Popup via `/api/subscribe`
- Testimonials, FAQ, UseCases, section lieu
- Séquence emails J-7 / J-2 / J-1 (cron `/api/cron/email-sequence`)
- Dashboard analytics (leads, subscribers, événements)
- Audioguide immersif FR/EN, swipe, progression
- Conformité : Confidentialité, Cookies, Mentions légales

---

## À faire pour le Go-Live

1. **Eventbrite** – Remplacer les créneaux mock par l’API Eventbrite
2. **Supabase prod** – Appliquer la migration `supabase/migrations/20260311_000001_init_mirokai.sql`
3. **Secrets Vercel** – Configurer `RESEND_API_KEY`, `SUPABASE_*`, `CRON_SECRET`, etc.
4. **Cron** – Vérifier `vercel.json` et l’appel à `/api/cron/email-sequence`
5. **Contenu** – Remplacer textes exemples, ajouter logos et mentions légales
6. **QA** – Tests API, e2e mobile, Lighthouse

---

## Médias (après clonage)

Les audios/vidéos ne sont pas versionnés dans Git. Placer manuellement :

- **Vidéo hero** : `public/media/video/mirokai-hero-loop.mp4`
- **Audios** : `public/media/audio/fr/*.mp3` et `public/media/audio/en/*.mp3`  
  Cf. `lib/audioguideContent.ts` et `public/media/README.md`.
