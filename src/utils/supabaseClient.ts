import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import getEnvVars from '../../enviroment';
const { supabaseUrl, supabaseAnonKey } = getEnvVars();

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
