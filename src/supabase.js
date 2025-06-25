import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vswnmnzgxqvvhozwfszh.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZzd25tbnpneHF2dmhvendmc3poIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA4ODQ2ODMsImV4cCI6MjA2NjQ2MDY4M30.y5ecfiNcoJWT4AypROdSAbKb5P_Bqpf86HUny76nO0E'

export const supabase = createClient(supabaseUrl, supabaseKey)