# Admin Panel Setup Guide - Appwrite

The admin panel lets Friends Lounge management (the GM, the owner, you, or
anyone with the login) post/edit/take-down the site's event announcement
themselves, with changes appearing on the live site - no rebuild, no
developer needed.

This runs on [Appwrite Cloud](https://cloud.appwrite.io) - free, no
credit card required, providing the login system, the database, and the
file storage for flyer images/videos all in one place. Takes about 15
minutes to set up (a couple more steps than the Supabase attempt, since
Appwrite's dashboard asks you to name each ID explicitly rather than
generating them for you).

**Note on Appwrite's free plan**: it allows 2 projects per account.
Since this will be a fresh account, that won't be a problem - just don't
create a second unrelated project on the same account later without
checking your usage first.

## 1. Create your free Appwrite account and project

1. Go to https://cloud.appwrite.io and sign up (GitHub/Google/email - no
   card required).
2. Click **"Create project"**, give it a name (e.g. "friends-lounge-mbaise").
3. Once created, go to **Settings** (left sidebar) to find your **Project
   ID** - copy it.
4. On that same Settings page, find the **API Endpoint** value and copy
   it exactly as shown. Don't assume it's `https://cloud.appwrite.io/v1`
   - Appwrite Cloud projects are often pinned to a specific region (e.g.
   `https://fra.cloud.appwrite.io/v1` for Frankfurt), and using the wrong
   one will cause requests to fail.

## 2. Register a Web platform (Appwrite needs to know your site's origin)

1. Still in **Settings**, find **Platforms** → **Add platform** → **Web
   app**.
2. For the **Hostname**, enter `localhost` for local development. Once
   you deploy the site live, come back and add another platform entry
   with your real domain.

## 3. Fill in your `.env` so far

Copy `.env.example` to `.env` and fill in what you have:

```
VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your-project-id-here
```

(Leave the other three blank for now - coming up next.)

## 4. Create the database and table

Appwrite's console may show this using "Tables/Rows/Columns" terminology
(their current naming) rather than the older "Collections/Documents" -
the steps are the same either way, just follow whatever your console
actually shows.

1. Left sidebar: **Databases** → **Create database**. Name it anything
   (e.g. "main") and copy the **Database ID** it's given.
2. Inside that database, **Create table** (or "Create collection," if
   your console still shows the older wording). Name it "events" and
   copy its **ID**.
3. In the table, go to the **Columns** tab (or "Attributes") and add each
   of these (all as type **String**, except where noted):
   - `presenter`
   - `title`
   - `subtitle`
   - `tagline`
   - `dateLabel`
   - `timeLabel`
   - `venue`
   - `whatsappNumber`
   - `performers` - type String, toggle **Array** on
   - `highlights` - type String, toggle **Array** on
   - `closingLine`
   - `flyerUrl`
   - `mediaType`
4. Go to the **Settings** tab of the table → **Permissions**:
   - Add a permission: **Role: Any**, allow **Read** only (so the public
     site can see the posted event without logging in).
   - Add another permission: **Role: Users**, allow **Read, Create,
     Update, Delete** (so only a signed-in admin can post/edit/take down).

## 5. Create the storage bucket

1. Left sidebar: **Storage** → **Create bucket**. Name it "event-media"
   and copy the **Bucket ID**.
2. In the bucket's **Settings** → **Permissions**, same pattern as above:
   - **Role: Any** → allow **Read** (public can view flyers/videos).
   - **Role: Users** → allow **Read, Create, Update, Delete** (only
     signed-in admin can upload).
3. Under the bucket's general settings, confirm the **Maximum file size**
   is at least 50MB (Appwrite's free plan allows this by default).

## 6. Finish your `.env`

```
VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your-project-id
VITE_APPWRITE_DATABASE_ID=your-database-id
VITE_APPWRITE_COLLECTION_ID=your-collection-id
VITE_APPWRITE_BUCKET_ID=your-bucket-id
```

## 7. Enable email/password login and create the admin account

1. Left sidebar: **Auth** → **Settings** tab → confirm **Email/Password**
   is enabled (it is by default).
2. Go to the **Users** tab → **Create user**.
3. Enter the email and password the GM (or whoever) will use to sign in
   through the site's Admin tab. This is the *only* account that should
   exist - there's no public sign-up anywhere on the site.

## 8. Install and run

```
npm install
npm run dev
```

Click the event button (bottom-right of the site) → **Admin** tab → sign
in with the account from step 7.

## Using it day to day

- **Post an event**: click the event button → Admin tab → sign in (if
  not already) → **Post an Event** → fill in the details, upload a flyer
  image or video, save. It appears on the site immediately.
- **Edit it**: Admin tab → **Edit**.
- **Take it down**: Admin tab → **Take Down**. Fully manual - no
  automatic expiry by date. The event stays up exactly as long as an
  admin leaves it up.
