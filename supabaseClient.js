// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://bqydopqekazcedqvpxzo.supabase.co'; // Replace with your Supabase URL
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxeWRvcHFla2F6Y2VkcXZweHpvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNDQ1ODkwOCwiZXhwIjoyMDQwMDM0OTA4fQ.PjoNtM0NHSfZGgmOeEmfX1dRtLAFclYtW_0R-GUHyU8'; // Replace with your Supabase anon key


export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
export default supabase;
