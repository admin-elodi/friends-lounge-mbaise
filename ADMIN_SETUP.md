# Admin Panel Setup Guide

The admin panel lets Friends Lounge management post/edit/remove event
announcements themselves at `/admin/login`, with changes appearing on the
live site within seconds — no rebuild, no developer needed.

This needs a small (free) Firebase project behind it. None of this can be
done for you automatically — Firebase requires a real account, which is a
step only you can complete. It takes about 10 minutes.

## 1. Create the Firebase project

1. Go to https://console.firebase.google.com and sign in with a Google
   account (create one for the business if you don't want to use a personal
   one).
2. Click **"Add project"**, name it (e.g. "friends-lounge-mbaise"), and
   finish the wizard. Google Analytics is optional — you can skip it.

## 2. Register a Web App

1. In the project overview, click the **Web (`</>`)** icon to add a web app.
2. Give it any nickname (e.g. "Friends Lounge Site").
3. You do **not** need Firebase Hosting for this — skip that option.
4. Firebase will show you a `firebaseConfig` object. Copy the values into
   your project's `.env` file (copy `.env.example` to `.env` first):

   ```
   VITE_FIREBASE_API_KEY=...
   VITE_FIREBASE_AUTH_DOMAIN=...
   VITE_FIREBASE_PROJECT_ID=...
   VITE_FIREBASE_STORAGE_BUCKET=...
   VITE_FIREBASE_MESSAGING_SENDER_ID=...
   VITE_FIREBASE_APP_ID=...
   ```

## 3. Enable Authentication (the GM's login)

1. In the left sidebar: **Build → Authentication → Get started**.
2. Under **Sign-in method**, enable **Email/Password**.
3. Go to the **Users** tab → **Add user**. Enter the email and password the
   GM will use to sign in at `/admin/login`. This is the *only* account that
   should exist — there's no public sign-up anywhere on the site.

## 4. Enable Firestore (where events are stored)

1. **Build → Firestore Database → Create database**.
2. Choose **Start in production mode** (the rules below lock it down
   properly either way), pick a location close to your users, and create it.
3. Go to the **Rules** tab and replace the contents with:

   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /events/{eventId} {
         allow read: if true;               // public site needs to read events
         allow write: if request.auth != null; // only the signed-in admin can write
       }
     }
   }
   ```

   Click **Publish**.

## 5. Set up Cloudinary (for flyer image uploads)

Firebase Storage now requires the paid "Blaze" plan just to activate —
even for free-tier-level usage — so flyer images are hosted on
[Cloudinary](https://cloudinary.com) instead, which has a genuinely free
"Free forever" plan that needs no credit card at all.

1. Go to https://cloudinary.com and sign up (Google/GitHub/email — no card
   needed).
2. On your Cloudinary dashboard, note your **Cloud Name** (shown near the
   top).
3. Go to **Settings** (gear icon) → **Upload** tab → scroll to **Upload
   presets** → **Add upload preset**.
4. Set **Signing Mode** to **Unsigned** (this is what lets the admin
   dashboard upload directly without needing a backend server). Save, and
   note the preset's name.
5. Add both values to your `.env`:

   ```
   VITE_CLOUDINARY_CLOUD_NAME=your-cloud-name
   VITE_CLOUDINARY_UPLOAD_PRESET=your-preset-name
   ```

That's it — no Firestore-style security rules needed here, since the
unsigned preset itself controls what's allowed.

## 6. Install and run

```
npm install
npm run dev
```

Visit `/admin/login`, sign in with the account from step 3, and you're in.

## Using it day to day

- **Post a new event**: `/admin/login` → sign in → **New Event** → fill in
  the details, upload the flyer image, save. It appears on the homepage
  immediately.
- **Edit or remove an old one**: use the pencil/trash icons next to it in
  the list.
- **Auto-expiry is still automatic** — the same rule as before applies: an
  event stays visible through the day it happens, then quietly stops
  showing the day after. You don't need to manually take it down.
- Multiple events can exist in the list at once (e.g. planning next month's
  while this month's is still live) — the site always shows whichever one
  is currently active and hasn't finished its day yet.
