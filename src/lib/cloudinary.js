// src/lib/cloudinary.js
// Flyer image uploads, via Cloudinary instead of Firebase Storage.
//
// Why: as of Feb 2026, Firebase Storage requires the paid "Blaze" plan
// (a linked billing card) just to create a bucket — even if actual usage
// never leaves the free quota. Cloudinary's Free plan needs no card at
// all, so it's what actually keeps this feature free.
//
// SETUP:
// 1. Create a free account at https://cloudinary.com (no card required).
// 2. In the Cloudinary console: Settings → Upload → Upload presets →
//    "Add upload preset" → set Signing Mode to "Unsigned" → save, and
//    note the preset name.
// 3. Your Cloud Name is shown on the Cloudinary dashboard home page.
// 4. Put both into your .env:
//      VITE_CLOUDINARY_CLOUD_NAME=your-cloud-name
//      VITE_CLOUDINARY_UPLOAD_PRESET=your-preset-name
//
// "Unsigned" uploads are the standard way to let client-side code (like
// this admin dashboard) upload directly to Cloudinary without needing a
// backend to sign the request first.

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const MAX_FLYER_SIZE_MB = 8;

// Uploads a flyer image and returns its public URL. `onProgress(percent)`
// is called as the upload advances (0-100). Uses XMLHttpRequest rather
// than fetch() specifically because fetch has no built-in upload-progress
// event — XHR does, and that's what powers the dashboard's progress bar.
export function uploadFlyer(file, onProgress) {
  return new Promise((resolve, reject) => {
    if (!CLOUD_NAME || !UPLOAD_PRESET) {
      reject(
        new Error(
          "Cloudinary isn't configured yet — check VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET in your .env file."
        )
      );
      return;
    }

    if (file.size > MAX_FLYER_SIZE_MB * 1024 * 1024) {
      reject(
        new Error(
          `That image is too large (${(file.size / (1024 * 1024)).toFixed(1)}MB). Please use one under ${MAX_FLYER_SIZE_MB}MB.`
        )
      );
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);
    formData.append("folder", "flyers");

    const xhr = new XMLHttpRequest();
    xhr.open("POST", `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`);

    xhr.upload.onprogress = (event) => {
      if (onProgress && event.lengthComputable) {
        onProgress(Math.round((event.loaded / event.total) * 100));
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        const response = JSON.parse(xhr.responseText);
        resolve(response.secure_url);
      } else {
        reject(
          new Error(
            "Upload failed — double-check your Cloudinary upload preset is set to 'Unsigned' in the Cloudinary console."
          )
        );
      }
    };

    xhr.onerror = () => {
      reject(new Error("Upload failed — check your internet connection and try again."));
    };

    xhr.send(formData);
  });
}

// Cloudinary deletion requires a signed request (a backend/API secret),
// which this client-only setup deliberately doesn't have — so old flyer
// images are simply left in place when an event is deleted or replaced,
// rather than actively removed. At the Free plan's 25GB, this is a
// non-issue for a lounge posting occasional event flyers.
export async function deleteFlyer() {
  // Intentionally a no-op — see note above.
}
