# Media Assets (Audio + Video)

Déposez vos médias de production ici.

> **Note :** Les fichiers audio (mp3/mp4) sont exclus du dépôt Git (limite GitHub 100 Mo). Après un `git clone`, ajoutez-les manuellement dans `public/media/audio/fr/` et `public/media/audio/en/`.

## Vidéo hero landing

- Chemin attendu par défaut: `/media/video/mirokai-hero-loop.mp4`
- Fichier local: `public/media/video/mirokai-hero-loop.mp4`
- Optionnel: surcharge via `NEXT_PUBLIC_HERO_VIDEO_URL`.

## Audios audioguide

Chemins utilisés dans `lib/audioguideContent.ts`:

- `public/media/audio/fr/01-arrival-gate.mp3`
- `public/media/audio/fr/02-retail-lab.mp3`
- `public/media/audio/fr/03-care-space.mp3`
- `public/media/audio/fr/04-future-forum.mp3`
- `public/media/audio/en/01-arrival-gate.mp3`
- `public/media/audio/en/02-retail-lab.mp3`
- `public/media/audio/en/03-care-space.mp3`
- `public/media/audio/en/04-future-forum.mp3`

Conseil format:

- Audio: `mp3`, 128-192 kbps.
- Vidéo hero: `mp4` H.264, courte boucle (10-20s), sans audio.
