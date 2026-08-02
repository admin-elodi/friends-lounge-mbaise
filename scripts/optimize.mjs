import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegPath from 'ffmpeg-static';

// Set FFmpeg path automatically from ffmpeg-static node module
if (ffmpegPath) {
  ffmpeg.setFfmpegPath(ffmpegPath);
}

// --------------------- Config ---------------------
const IMAGE_DIR = path.resolve('src/assets/images');
const VIDEO_DIR = path.resolve('src/assets/videos');
const CODE_DIR = path.resolve('src');

// High-performance VP9 video encoding settings
const FFMPEG_OPTIONS = [
  '-c:v libvpx-vp9', // Modern, crisp WebM encoding
  '-crf 32',        // Quality target (28-34 is sweet spot for web)
  '-b:v 0',          // Constant quality mode
  '-c:a libopus',    // Clean audio compression
  '-b:a 128k',
];

// --------------------- Helper: Recursive File Scanner ---------------------
async function getFiles(dir, matchRegex) {
  let results = [];
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        results = results.concat(await getFiles(fullPath, matchRegex));
      } else if (matchRegex.test(entry.name)) {
        results.push(fullPath);
      }
    }
  } catch {
    // Silently ignore missing folders (e.g., if videos dir doesn't exist yet)
  }
  return results;
}

// --------------------- Core Processors ---------------------

async function optimizeImages() {
  const files = await getFiles(IMAGE_DIR, /\.(png|jpe?g|avif)$/i);
  if (files.length === 0) return;

  console.log(`🖼️  Found ${files.length} image(s) to convert...`);

  for (const [i, file] of files.entries()) {
    const webpPath = file.replace(/\.[^.]+$/, '.webp');
    const filename = path.basename(file);

    try {
      await sharp(file).webp({ quality: 80 }).toFile(webpPath);
      await fs.unlink(file); // Remove original image
      console.log(`  (${i + 1}/${files.length}) ✅ Converted: ${filename} -> ${path.basename(webpPath)}`);
    } catch (err) {
      console.error(`  (${i + 1}/${files.length}) ❌ Image failed (${filename}):`, err.message);
    }
  }
}

async function optimizeVideos() {
  const files = await getFiles(VIDEO_DIR, /\.(mp4|mov|avi|mkv)$/i);
  if (files.length === 0) return;

  console.log(`\n🎥 Found ${files.length} video(s) to convert...`);

  for (const [i, file] of files.entries()) {
    const webmPath = file.replace(/\.[^.]+$/, '.webm');
    const filename = path.basename(file);

    try {
      await new Promise((resolve, reject) => {
        ffmpeg(file)
          .outputOptions(FFMPEG_OPTIONS)
          .save(webmPath)
          .on('end', resolve)
          .on('error', reject);
      });

      await fs.unlink(file); // Remove original video
      console.log(`  (${i + 1}/${files.length}) ✅ Converted: ${filename} -> ${path.basename(webmPath)}`);
    } catch (err) {
      console.error(`  (${i + 1}/${files.length}) ❌ Video failed (${filename}):`, err.message);
    }
  }
}

async function updateCodeReferences() {
  const files = await getFiles(CODE_DIR, /\.(tsx?|jsx?|css)$/i);
  if (files.length === 0) return;

  console.log(`\n📝 Updating references across ${files.length} source file(s)...`);

  let updatedCount = 0;
  for (const file of files) {
    let content = await fs.readFile(file, 'utf8');

    // Replace image extensions (.png, .jpg, .jpeg) with .webp and video extensions (.mp4, .mov) with .webm
    const updated = content
      .replace(/\.(png|jpe?g|avif)(?=['"`?\s\)])/gi, '.webp')
      .replace(/\.(mp4|mov|avi)(?=['"`?\s\)])/gi, '.webm');

    if (content !== updated) {
      await fs.writeFile(file, updated, 'utf8');
      updatedCount++;
      console.log(`  ✔ Updated: ${path.relative(CODE_DIR, file)}`);
    }
  }

  console.log(`✨ Total code files updated: ${updatedCount}`);
}

// --------------------- Main Execution ---------------------
async function main() {
  console.log('🚀 Starting project asset optimization...\n');

  await optimizeImages();
  await optimizeVideos();
  await updateCodeReferences();

  console.log('\n🎉 Optimization complete!');
}

main().catch(console.error);