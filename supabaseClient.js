// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://hlrzkdxrzczxjmrsvmew.supabase.co'; // Replace with your Supabase URL
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhscnprZHhyemN6eGptcnN2bWV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYyNzI2MTMsImV4cCI6MjA0MTg0ODYxM30.THQReMZiSKmF6Tcys2Bav6GhSbXO0BURBhU8l2sWPLU'; // Replace with your Supabase anon key


export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
export default supabase;
