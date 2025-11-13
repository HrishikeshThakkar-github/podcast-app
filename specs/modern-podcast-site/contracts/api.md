# API Contracts

Even though we're using static data, these contracts define how the data will be structured and accessed through Next.js's static generation.

## Episodes

### Get All Episodes
```typescript
// pages/api/episodes.ts (for type definition only)
export interface EpisodesResponse {
  episodes: Episode[];
  totalCount: number;
  pageSize: number;
  currentPage: number;
}

// Implementation will be through getStaticProps
// pages/episodes/index.tsx
export const getStaticProps = async () => {
  // Will read from JSON files
  return {
    props: {
      episodes: EpisodesResponse
    }
  }
}
```

### Get Featured Episode
```typescript
// pages/api/episodes/featured.ts (for type definition only)
export interface FeaturedEpisodeResponse {
  episode: Episode;
}

// Implementation through getStaticProps
// pages/index.tsx
export const getStaticProps = async () => {
  // Will read from JSON files
  return {
    props: {
      featuredEpisode: Episode
    }
  }
}
```

### Get Episode by ID
```typescript
// pages/api/episodes/[id].ts (for type definition only)
export interface EpisodeResponse {
  episode: Episode;
}

// Implementation through getStaticProps and getStaticPaths
// pages/episodes/[id].tsx
export const getStaticPaths = async () => {
  // Will generate paths from JSON files
  return {
    paths: [
      { params: { id: 'episode-1' } }
      // ... more paths
    ],
    fallback: false
  }
}

export const getStaticProps = async ({ params }) => {
  // Will read from JSON files
  return {
    props: {
      episode: Episode
    }
  }
}
```

## Pages

### Get Page Content
```typescript
// pages/api/pages/[slug].ts (for type definition only)
export interface PageResponse {
  page: Page;
}

// Implementation through getStaticProps and getStaticPaths
// pages/[slug].tsx
export const getStaticPaths = async () => {
  // Will generate paths from JSON files
  return {
    paths: [
      { params: { slug: 'about' } },
      { params: { slug: 'faq' } }
    ],
    fallback: false
  }
}

export const getStaticProps = async ({ params }) => {
  // Will read from JSON files
  return {
    props: {
      page: Page
    }
  }
}
```

## FAQ

### Get FAQ Categories
```typescript
// pages/api/faq/categories.ts (for type definition only)
export interface FAQCategoriesResponse {
  categories: FAQCategory[];
}

// Implementation through getStaticProps
// pages/faq.tsx
export const getStaticProps = async () => {
  // Will read from JSON files
  return {
    props: {
      categories: FAQCategory[]
    }
  }
}
```

## Site Configuration

### Get Site Config
```typescript
// pages/api/config.ts (for type definition only)
export interface SiteConfigResponse {
  config: SiteConfig;
}

// Implementation through getStaticProps
// pages/_app.tsx
export const getStaticProps = async () => {
  // Will read from JSON files
  return {
    props: {
      siteConfig: SiteConfig
    }
  }
}
```

Note: Since this is a static site, all these "API routes" are actually just type definitions. The actual data will be generated at build time through `getStaticProps` and `getStaticPaths`.
