export interface Project {
  slug: string;
  title: string;
  shortDescription: string;
  coverImage: string;
  images: string[];
  video?: string;
  responsibilities: string[];
  technologies: string[];
  link?: string;
}

export const projects: Project[] = [
  {
    slug: "daily-english-boost",
    title: "Daily English Boost",
    shortDescription: "Трекер англійської мови для щоденної практики.",
    coverImage: "/images/deb-cover.png",
    images: ["/images/deb-1.png", "/images/deb-2.png", "/images/deb-3.png"],
    video: "/videos/deb-demo.mp4",
    responsibilities: [
      "Front-End розробка",
      "Інтеграція з Google Auth",
      "MongoDB база даних",
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind", "MongoDB"],
    link: "https://dailyenglishboost.vercel.app",
  },
];
