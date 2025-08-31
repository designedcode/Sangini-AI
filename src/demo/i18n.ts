
import en from "@/i18n/en.json";
import hi from "@/i18n/hi.json";
import pa from "@/i18n/pa.json";

const packs: Record<string, any> = { en, hi, pa };
export function t(lang: string, key: string): string {
  const dict = packs[lang] || en;
  return dict[key] || key;
}
