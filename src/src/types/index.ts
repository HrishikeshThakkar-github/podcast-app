// Episodes
export interface Episode {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  publishDate: string;
  duration: string;
  audioUrl: string;
  imageUrl: string;
  thumbnailUrl: string;
  coverImage: string;
  featured: boolean;
  categories: string[];
  tags: string[];
  showNotes: string;
  chapters: Chapter[];
}

export interface Chapter {
  title: string;
  startTime: number;
  endTime: number;
}

// Theme
export interface Theme {
  colors: {
    primary: string;
    primaryDark: string;
    secondary: string;
    background: string;
    surface: string;
    border: string;
    text: {
      primary: string;
      secondary: string;
      disabled: string;
      inverse: string;
    };
    error: string;
  };
  typography: {
    h1: string;
    h2: string;
    h3: string;
    body1: string;
    body2: string;
  };
  spacing: (multiplier: number) => string;
  breakpoints: {
    sm: string;
    md: string;
    lg: string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
  };
  shadows: {
    small: string;
    medium: string;
    large: string;
  };
  layout: {
    maxWidth: string;
    contentWidth: string;
  };
}
  id: string;
  title: string;
  path: string;
  children?: NavigationItem[];
}

export interface Navigation {
  main: NavigationItem[];
  footer: NavigationItem[];
}

// Site Configuration
export interface SiteConfig {
  name: string;
  description: string;
  socialLinks: {
    twitter?: string;
    instagram?: string;
    youtube?: string;
  };
  contactEmail: string;
  copyrightText: string;
}
