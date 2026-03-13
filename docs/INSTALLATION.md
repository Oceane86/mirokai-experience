# Guide d'Installation

## Prérequis

- Node.js 20+
- npm 10+
- Git

## 1) Cloner le projet

```bash
git clone https://github.com/Oceane86/mirokai-exp.git
cd MirokaiXP-main
```

## 2) Installer les dépendances

```bash
npm install
```

## 3) Configurer l'environnement

Copier le template :

```bash
cp .env.example .env.local
```

Renseigner au minimum :

- `NEXT_PUBLIC_SITE_URL=http://localhost:3000`
- `NEXT_PUBLIC_EVENTBRITE_URL` (lien event Eventbrite)
- `NEXT_PUBLIC_DEPLOYED_ROBOTS=24`
- `DASHBOARD_PASSWORD`

Variables optionnelles selon intégration :

- GA/GTM/Hotjar
- Resend
- Supabase

## 4) Vérifier les assets visuels

Les assets suivants doivent être présents dans `public/media/` :

| Fichier | Usage |
|---|---|
| `image_fond.svg` | Fond global (toutes les pages) |
| `img_hero.svg` | Image hero (personnages Mirokaï) |
| `gallery/*` | Visuels modules expérience |

Le fond est chargé via CSS (`--bg-mesh` dans `globals.css`) donc aucune configuration supplémentaire n'est nécessaire si le fichier est présent.

## 5) Lancer en local

```bash
npm run dev
```

Accès utiles :

- Landing: `http://localhost:3000`
- Profil gateway: `http://localhost:3000/profile`
- Experience PWA: `http://localhost:3000/experience`
- Admin: `http://localhost:3000/admin`
- Dashboard: `http://localhost:3000/dashboard`
- Jeux: `http://localhost:3000/game`

Notes :

- `/experience` et `/game*` redirigent vers `/profile` si aucune session visiteur n'est active.
- Segment `b2b` ouvre un jeu dédié KPI/ROI sur `/game`.
- Sur mobile, la landing utilise une barre fixe à 4 onglets : `Accueil / Contacts / Jeu / Profil`.
- Le plan interactif est visible sur `/profile` uniquement une fois connecté.

## 6) Vérification qualité

```bash
npm run lint
npm run build
```

## 7) Base Supabase (optionnel)

Appliquer la migration :

- `supabase/migrations/20260311_000001_init_mirokai.sql`

Seed modules :

- `supabase/seed/modules_seed.json`

Détails : voir `supabase/README.md`.
