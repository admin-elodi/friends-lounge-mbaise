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
const SEARCH_DIRS = [
  path.resolve('src'),
  path.resolve('public')
];

// High-speed, multi-threaded WebM encoding settings
const FFMPEG_OPTIONS = [
  '-c:v libvpx',      // VP8 encoder (significantly faster than VP9)
  '-crf 22',          // Quality target (10-30; 22 is sweet spot for speed + quality)
  '-b:v 1500k',       // Stream bitrate cap
  '-threads 0',       // Utilize ALL CPU cores on your PC
  '-c:a libopus',     // Opus audio
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
    // Silently ignore missing folders
  }
  return results;
}

// --------------------- Core Processors ---------------------

async function optimizeImages() {
  let files = [];
  for (const dir of SEARCH_DIRS) {
    const found = await getFiles(dir, /\.(png|jpe?g|avif|tiff)$/i);
    files = files.concat(found);
  }

  if (files.length === 0) {
    console.log('🖼️  No unoptimized PNG/JPG images found.');
    return;
  }

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
  let files = [];
  for (const dir of SEARCH_DIRS) {
    const found = await getFiles(dir, /\.(mp4|mov|avi|mkv)$/i);
    files = files.concat(found);
  }

  if (files.length === 0) {
    console.log('\n🎥 No unoptimized MP4/MOV videos found.');
    return;
  }

  console.log(`\n🎥 Found ${files.length} video(s) to convert...`);

  for (const [i, file] of files.entries()) {
    const webmPath = file.replace(/\.[^.]+$/, '.webm');
    const filename = path.basename(file);

    try {
      await new Promise((resolve, reject) => {
        ffmpeg(file)
          .outputOptions(FFMPEG_OPTIONS)
          .on('progress', (progress) => {
            if (progress.percent) {
              process.stdout.write(`  ⏳ (${i + 1}/${files.length}) Converting ${filename}: ${Math.floor(progress.percent)}%\r`);
            } else {
              process.stdout.write(`  ⏳ (${i + 1}/${files.length}) Converting ${filename}...\r`);
            }
          })
          .on('end', () => {
            console.log(`  (${i + 1}/${files.length}) ✅ Converted: ${filename} -> ${path.basename(webmPath)}        `);
            resolve();
          })
          .on('error', (err) => {
            console.error(`\n  (${i + 1}/${files.length}) ❌ Video failed (${filename}):`, err.message);
            reject(err);
          })
          .save(webmPath);
      });

      await fs.unlink(file); // Remove original video
    } catch {
      // Continue with remaining videos even if one fails
    }
  }
}

async function updateCodeReferences() {
  const codeDir = path.resolve('src');
  const files = await getFiles(codeDir, /\.(tsx?|jsx?|mjs|cjs|css|scss|html|vue)$/i);
  
  if (files.length === 0) return;

  console.log(`\n📝 Scanning and updating references across ${files.length} source file(s)...`);

  let updatedCount = 0;
  for (const file of files) {
    let content = await fs.readFile(file, 'utf8');

    const updated = content
      .replace(/\.(png|jpe?g|avif|tiff)(?=['"`?\s\)\>])/gi, '.webp')
      .replace(/\.(mp4|mov|avi|mkv)(?=['"`?\s\)\>])/gi, '.webm');

    if (content !== updated) {
      await fs.writeFile(file, updated, 'utf8');
      updatedCount++;
      console.log(`  ✔ Updated: ${path.relative(codeDir, file)}`);
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