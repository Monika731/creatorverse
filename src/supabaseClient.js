// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nfobjovrvjjswbmioteo.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5mb2Jqb3Zydmpqc3dibWlvdGVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0NTIxMDUsImV4cCI6MjA3MDAyODEwNX0._bkUSzQdqZ6ezcycI57P2nsfMtOBCVmP39Sd0Fi7r50'

export const supabase = createClient(supabaseUrl, supabaseKey)
