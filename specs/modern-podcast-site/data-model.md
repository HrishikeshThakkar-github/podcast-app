# Data Model

## Episode
```typescript
interface Episode {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  publishDate: string;
  duration: string;
  audioUrl: string;
  imageUrl: string;
  thumbnailUrl: string;
  featured: boolean;
  tags: string[];
  showNotes: string;
  chapter: Chapter[];
}

interface Chapter {
  title: string;
  startTime: number;
  endTime: number;
}
```

## Page
```typescript
interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
  metaDescription: string;
  featuredImage?: string;
}
```

## FAQ
```typescript
interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface FAQCategory {
  id: string;
  name: string;
  description: string;
  items: FAQItem[];
}
```

## Navigation
```typescript
interface NavigationItem {
  id: string;
  title: string;
  path: string;
  children?: NavigationItem[];
}

interface Navigation {
  main: NavigationItem[];
  footer: NavigationItem[];
}
```

## Site Configuration
```typescript
interface SiteConfig {
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
```

## Static Data Structure
All data will be stored in JSON files under the `data/` directory:
```
data/
  episodes/
    episode-1.json
    episode-2.json
    ...
  pages/
    about.json
    faq.json
  navigation.json
  site-config.json
  faq-categories.json
```

## Validation Rules

### Episode
- Title: Required, max 100 characters
- Description: Required, max 2000 characters
- ShortDescription: Required, max 160 characters
- PublishDate: Required, valid ISO date string
- Duration: Required, format: "HH:mm:ss"
- AudioUrl: Required, valid URL format
- ImageUrl: Required, valid URL format
- ThumbnailUrl: Required, valid URL format
- Tags: Array of strings, max 10 tags
- ShowNotes: Optional, markdown format

### Page
- Title: Required, max 100 characters
- Slug: Required, URL-safe string
- Content: Required, markdown format
- MetaDescription: Required, max 160 characters

### FAQ
- Question: Required, max 200 characters
- Answer: Required, markdown format
- Category: Required, must match existing category
