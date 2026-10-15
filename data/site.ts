export const locales = ["en", "pt", "it"] as const;
export type Locale = (typeof locales)[number];

export const site = {
  url: "https://antoniovita.me",
  name: "Antonio Vita",
  email: "antoniovitafonseca@gmail.com",
  github: "https://github.com/antoniovita",
  linkedin: "https://www.linkedin.com/in/antonio-vita-6177922b7/",
  instagram: "https://www.instagram.com/defi.institute/",
  cv: "/cv.pdf",
  location: {
    city: "Rio de Janeiro",
    lat: -22.9068,
    lng: -43.1729,
    timeZone: "America/Sao_Paulo",
  },
};

export const ogLocale: Record<Locale, string> = {
  en: "en_US",
  pt: "pt_BR",
  it: "it_IT",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
