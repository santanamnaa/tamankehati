# Taman Kehati Indonesia

Platform digital untuk dokumentasi, konservasi, dan edukasi keanekaragaman hayati Indonesia melalui Taman Kehati (Taman Keanekaragaman Hayati).

## 🌿 About

Taman Kehati Indonesia is a comprehensive web application that catalogs biodiversity gardens across Indonesia and their plant collections. The platform supports conservation efforts, scientific documentation, and environmental education.

## 🏗️ Architecture

This application follows a **mock-first, API-ready** architecture:

- **All pages render with local mock data first** (no network dependency)
- **API client is isolated** in `/lib/api.ts` 
- **Runtime switch** via environment variables to enable real API calls
- **Only the API Test page** directly uses the API client

### Tech Stack

- React 18 with TypeScript
- Tailwind CSS v4
- shadcn/ui components
- Lucide React icons

## 📁 Project Structure

```
/
├── App.tsx                      # Main app with client-side routing
├── lib/
│   ├── api.ts                   # API client (follows OpenAPI spec)
│   ├── api.types.ts             # TypeScript types from OpenAPI
│   └── api.config.ts            # Runtime configuration & token store
├── mocks/
│   ├── parks.ts                 # Mock Taman Kehati data
│   ├── plants.ts                # Mock Koleksi Tumbuhan data
│   └── users.ts                 # Mock User data
├── pages/
│   ├── HomePage.tsx             # Landing page
│   ├── TamanListPage.tsx        # List all parks
│   ├── TamanDetailPage.tsx      # Park detail & collections
│   ├── KoleksiListPage.tsx      # List all plant collections
│   ├── KoleksiDetailPage.tsx    # Plant collection detail
│   └── ApiTestPage.tsx          # API testing interface
├── components/
│   ├── Layout.tsx               # App shell with navigation
│   ├── cards/
│   │   ├── ParkCard.tsx
│   │   └── PlantCard.tsx
│   ├── filters/
│   │   ├── SearchFilter.tsx
│   │   └── StatusFilter.tsx
│   └── ui/                      # shadcn/ui components
└── styles/
    └── globals.css              # Custom theme (earth tones)
```

## 🎨 Design System

**Color Palette:**
- Background: `#eeebe4` (warm beige)
- Primary: `#263d2f` (forest green)
- Secondary: `#c5af8f` (warm tan)

The design uses natural, earthy tones to reflect the biodiversity conservation theme.

## 🔌 API Integration

### Configuration

Create a `.env` file:

```env
VITE_API_BASE_URL=http://localhost:8000
VITE_USE_REAL_API=false
```

### Runtime Switch

- **Development with mocks:** `VITE_USE_REAL_API=false` (default)
- **Production with backend:** `VITE_USE_REAL_API=true`

### API Client (`/lib/api.ts`)

Implements the complete OpenAPI specification with:

- **OAuth2 Password Flow** (`/api/auth/login`)
- **Bearer Token Management** (automatic attachment)
- **Typed Endpoints:**
  - `auth.*` - Authentication & registration
  - `users.*` - User management (super admin)
  - `tamanKehati.*` - Park CRUD operations
  - `koleksi.*` - Plant collection CRUD operations
  - `dataExport.*` - DwC and GeoJSON exports

### API Testing

Visit the **API Test** page to:
- Test authentication flow
- Test individual endpoints
- Run full integration tests
- View request/response data

## 📊 Data Models

### Taman Kehati (Biodiversity Parks)

- Official name, alternative name
- Location details (address, province, city, coordinates)
- Area size, park type (government/private/community)
- Description, history
- Contact information, social media
- Publication status

### Koleksi Tumbuhan (Plant Collections)

- Scientific name, common names (national/local)
- Taxonomy (familia, genus, species, variety)
- Collection metadata (number, date, location)
- Habitat information
- Notes and description
- Photo URL, publication status

## 🚀 Development Workflow

1. **Build pages with local mocks** - Pages always render offline
2. **Test API separately** - Use `/api-test` page when backend is ready
3. **Gradual migration** - Replace mocks with real API calls as needed

## 🔐 Authentication

The API uses OAuth2 password flow:

```typescript
import { auth } from './lib/api';

// Login
await auth.login('username', 'password');

// Get current user
const user = await auth.me();

// Logout
auth.logout();
```

Token is automatically stored and attached to subsequent requests.

## 🌐 Pages

- **Home** - Stats overview, featured parks, about section
- **Taman Kehati** - Browse all biodiversity parks with filters
- **Taman Detail** - Park information, location, plant collections
- **Koleksi** - Browse all plant collections with filters
- **Koleksi Detail** - Scientific information, taxonomy, metadata
- **API Test** - Development tool for testing real API endpoints

## 📝 Key Features

✅ **Mock-first architecture** - No network dependency for development  
✅ **Type-safe API client** - Full TypeScript support  
✅ **Flexible filtering** - Search, status, and category filters  
✅ **Responsive design** - Mobile-friendly interface  
✅ **Publication workflow** - Draft/Published/Archived states  
✅ **Darwin Core & GeoJSON export** - Standard biodiversity formats  

## 🔧 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API URL | `http://localhost:8000` |
| `VITE_USE_REAL_API` | Enable real API calls | `false` |

## 📚 Standards & Compliance

- **Darwin Core** - Biodiversity data standard for exports
- **GeoJSON** - Geographic data interchange format
- **OAuth2** - Industry-standard authentication
- **OpenAPI** - API specification and documentation

---

**Built for conservation, powered by community. 🌱**
