# Quickstart Guide

## Prerequisites
- Node.js 18+
- Git
- VS Code with recommended extensions

## Setup

1. Clone the repository:
```bash
git clone [repository-url]
cd podsite
```

2. Install dependencies:
```bash
npm install
```

3. Set up development environment:
```bash
# Copy environment variables
cp .env.example .env.local
```

## Development

1. Start the development server:
```bash
npm run dev
```

2. Access the site:
- Open http://localhost:3000
- View the 3D elements in action
- Test responsiveness using device toolbar

## Project Structure

```
├── components/           # React components
│   ├── three/           # Three.js specific components
│   ├── layout/          # Layout components
│   └── ui/              # UI components
├── data/                # Static JSON data
│   ├── episodes/        # Episode data files
│   └── pages/           # Page content
├── models/              # 3D models and assets
├── pages/               # Next.js pages
├── public/              # Static assets
├── styles/              # Global styles
└── utils/              # Helper functions
```

## Key Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run export` - Export static site
- `npm run lint` - Run linter
- `npm run format` - Format code

## Working with Three.js

1. Add 3D components in `components/three/`
2. Use React Three Fiber components
3. Implement responsive canvas sizes
4. Test performance on mobile devices

## Adding Content

1. Add episode data in `data/episodes/`
2. Add page content in `data/pages/`
3. Update navigation in `data/navigation.json`
4. Update site config in `data/site-config.json`

## Best Practices

1. Mobile-First Development
   - Test on multiple devices
   - Use responsive breakpoints
   - Optimize 3D scenes for mobile

2. Performance
   - Optimize 3D models
   - Use proper image formats
   - Implement lazy loading

3. Code Quality
   - Follow TypeScript guidelines
   - Write meaningful comments
   - Use consistent formatting

## Deployment

1. Build the static site:
```bash
npm run build && npm run export
```

2. Deploy the `out` directory to your hosting provider

## Getting Help

- Check documentation in `docs/`
- Review code comments
- See example components
