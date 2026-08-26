// src/lib/supabase.js
// Single connection to Supabase — Auth (GM login), Database (event text
// data), and Storage (flyer image/video files) all come from this one
// client, since Supabase bundles all three together. This replaces the
// previous Firebase + Cloudinary split with one provider, one dashboard,
// and — critically — just 2 environment variables instead of 9.
//
// SETUP: copy .env.example to .env and fill in your Supabase project's
// URL and anon key (Supabase Dashboard → Project Settings → API). Never
// commit the real .env file.

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
