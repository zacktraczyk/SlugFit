import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";
import getEnvVars from "../../enviroment";
const { supabaseUrl, supabaseAnonKey } = getEnvVars();

console.log(supabaseUrl);

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
