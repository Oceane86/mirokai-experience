/**
 * Convertit tous les fichiers .mp4 en .mp3 dans public/media/audio/fr et en
 * Usage: node scripts/convert-audio-to-mp3.js
 * Prérequis: FFmpeg installé (winget install FFmpeg) ou npm install ffmpeg-static
 */

const path = require("path");
const fs = require("fs");
const { spawnSync } = require("child_process");

const audioDir = path.join(__dirname, "..", "public", "media", "audio");
const frDir = path.join(audioDir, "fr");
const enDir = path.join(audioDir, "en");

function getFfmpegPath() {
  try {
    return require.resolve("ffmpeg-static");
  } catch {
    return "ffmpeg";
  }
}

function convertMp4ToMp3(inputPath, outputPath) {
  const ffmpeg = getFfmpegPath();
  const result = spawnSync(ffmpeg, ["-i", inputPath, "-vn", "-acodec", "libmp3lame", "-q:a", "2", "-y", outputPath], {
    stdio: "pipe",
  });
  if (result.status !== 0) throw new Error(result.stderr?.toString() || "Conversion failed");
}

function convertFolder(dir) {
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mp4"));
  if (files.length === 0) {
    console.log(`Aucun .mp4 trouvé dans ${dir}`);
    return;
  }
  const folderName = path.basename(dir);
  for (const file of files) {
    const inputPath = path.join(dir, file);
    const base = file.replace(/\.mp4$/i, "");
    const outputPath = path.join(dir, `${base}.mp3`);
    try {
      convertMp4ToMp3(inputPath, outputPath);
      console.log(`✓ [${folderName}] ${file} → ${base}.mp3`);
    } catch (err) {
      console.error(`✗ [${folderName}] ${file}:`, err.message || err);
    }
  }
}

console.log("Conversion MP4 → MP3 en cours...\n");
if (fs.existsSync(frDir)) convertFolder(frDir);
if (fs.existsSync(enDir)) convertFolder(enDir);
console.log("\nTerminé.");
