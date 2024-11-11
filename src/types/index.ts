export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  imageUrl: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface CarouselSlide {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
}

export interface Airport {
  code: string;
  name: string;
  city: string;
}