import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://njythokucbnxigcwzvqj.supabase.co"; // Remplacez par votre URL
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qeXRob2t1Y2JueGlnY3d6dnFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcyNDA4NjAsImV4cCI6MjA1MjgxNjg2MH0.WPfZ7PGRd_mASeos2Gw_XdHaMqcXkBWhiNSQnx4DoFk"; // Remplacez par votre clé API
export const supabase = createClient(supabaseUrl, supabaseKey);
