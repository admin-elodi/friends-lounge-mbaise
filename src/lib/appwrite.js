// src/lib/appwrite.js
// Single connection to Appwrite - Account (GM login), TablesDB (event
// text data), and Storage (flyer image/video files) all come from this
// one client.
//
// Uses the TablesDB service (Tables/Rows/Columns), Appwrite's current
// API - not the older Databases service (Collections/Documents), which
// is what a project created through Appwrite's newer console UI actually
// needs.
//
// SETUP: copy .env.example to .env and fill in your Appwrite project's
// values. IMPORTANT: VITE_APPWRITE_ENDPOINT should be the *exact* value
// shown in your own project's Settings page, not assumed - some Appwrite
// Cloud projects are pinned to a specific region (e.g.
// https://fra.cloud.appwrite.io/v1 for Frankfurt) rather than the
// generic https://cloud.appwrite.io/v1.

import { Client, Account, TablesDB, Storage } from "appwrite";

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

export const account = new Account(client);
export const tablesDB = new TablesDB(client);
export const storage = new Storage(client);
export default client;
