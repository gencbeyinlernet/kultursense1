
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://swjagzgcpvvvtdgjxhvv.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN3amFnemdjcHZ2dnRkZ2p4aHZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYxMDY4MjIsImV4cCI6MjA4MTY4MjgyMn0.72UYxQcBhIUbibpHovY8ztIL80GJ5rGKitd_4Z-U9-4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
