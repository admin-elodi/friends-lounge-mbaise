// src/lib/appwrite.js
// Single connection to Appwrite - Account, Databases, and Storage
// all initialized cleanly from this client.

import { Client, Account, Databases, Storage } from "appwrite";

// Fallback values prevent runtime crashes if environment variables fail to load
const endpoint =
  import.meta.env.VITE_APPWRITE_ENDPOINT || "https://fra.cloud.appwrite.io/v1";
const projectId =
  import.meta.env.VITE_APPWRITE_PROJECT_ID || "6a8df75b001eb8299009";

const client = new Client()
  .setEndpoint(endpoint)
  .setProject(projectId);

export const account = new Account(client);
export const databases = new Databases(client);

// Alias databases as tablesDB to satisfy eventApi.js imports seamlessly
export const tablesDB = databases;

export const storage = new Storage(client);
export default client;