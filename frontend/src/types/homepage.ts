export interface Media {
  id: number;
  url: string;
}

export interface HeroSection {
  __component: 'layout.hero';
  id: number;
  textAlt?: string;
  image?: Media[];
}

export interface Link {
  id: number;
  isBlank: boolean;
  label: string;
  href: string;
}

export interface HomeData {
  id: number;
  documentId: string;
  h1: string;
  subheading: string;
  Link?: Link;
  sections?: HeroSection[];
}
