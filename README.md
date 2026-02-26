# SyncUp — Job Dashboard

Production-grade Next.js 16 + TypeScript dashboard built from Figma design.

## Tech Stack

- **Next.js 16** — App Router, Server & Client Components
- **TypeScript** — Strict mode, full type coverage
- **Tailwind CSS** — Custom design tokens
- **Recharts** — Interactive charts
- **Inter** — via `next/font/google`

## Project Architecture

```
syncup/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout (font, AppShell)
│   ├── page.tsx            # Redirect → /dashboard
│   ├── dashboard/page.tsx  # Job dashboard
│   └── feed/page.tsx       # Social feed
├── components/
│   ├── layout/
│   │   ├── AppShell.tsx    # Sidebar + Topbar orchestration
│   │   ├── Sidebar.tsx     # Collapsible nav (desktop + mobile drawer)
│   │   └── Topbar.tsx      # Fixed top nav with search
│   ├── dashboard/
│   │   ├── StatCard.tsx         # Metric card with sparkline
│   │   ├── VacancyChart.tsx     # Area chart with series toggles
│   │   ├── JobApplicationTable.tsx # Filterable, sortable table
│   │   └── RecommendedJobs.tsx  # Sidebar job list
│   ├── feed/
│   │   ├── PostCard.tsx         # Interactive post (reactions, comments)
│   │   ├── FeedLeftPanel.tsx    # ProfileCard, Analytics, Stories
│   │   └── FeedRightPanel.tsx   # CreatePost, SuggestionsSidebar
│   └── ui/
│       ├── Icons.tsx       # All SVG icons as typed components
│       ├── Toggle.tsx      # Accessible toggle switch
│       ├── Avatar.tsx      # Gradient avatar
│       ├── Badge.tsx       # Status badge
│       └── MiniBarChart.tsx # Sparkline bar chart
├── hooks/
│   ├── useBreakpoint.ts    # Responsive breakpoint tracker
│   ├── useDashboardFilters.ts # All dashboard filter/sort state
│   └── useFeedState.ts     # Feed reactions, comments, follow state
├── lib/
│   └── utils.ts            # cn(), formatters, status helpers
├── types/
│   ├── common.ts           # Shared types
│   ├── dashboard.ts        # Dashboard-specific types
│   └── feed.ts             # Feed-specific types
├── data/
│   ├── dashboard.ts        # Mock dashboard data
│   └── feed.ts             # Mock feed data
└── constants/
    └── navigation.ts       # Nav items, sidebar dimensions
```

## Key Design Decisions

| Decision | Rationale |
|---|---|
| **Hooks for state** | All filter/sort logic lives in custom hooks, keeping components purely presentational |
| **Types per domain** | `types/dashboard.ts` and `types/feed.ts` prevent type leakage between features |
| **Data layer separate** | `data/` folder makes swapping to a real API trivial |
| **`cn()` utility** | `clsx` + `tailwind-merge` prevents class conflicts |
| **No prop drilling** | Each page passes state down one level max |

## Setup & Run

```bash
# 1. Install dependencies
npm install

# 2. Dev server
npm run dev

# 3. Type-check
npm run type-check

# 4. Build
npm run build
```

Visit `http://localhost:3000` → auto-redirects to `/dashboard`.

## Working Features

### Dashboard (`/dashboard`)
- ✅ Stat cards with sparkline mini-charts
- ✅ Area chart with **toggleable series** (Application Sent / Interviews / Rejected)
- ✅ **Time range dropdown** (This Week / Month / Quarter / Year)
- ✅ Job table with **column sort** (click headers to sort asc/desc)
- ✅ Job table **status filters** (toggle New / In Progress / Pending)
- ✅ **Live search** by title or company name
- ✅ Color-coded **status badges**

### Feed (`/feed`)
- ✅ **Like/reaction toggle** with live count update
- ✅ **Comment input** with Enter-to-submit and live comments rendering
- ✅ **New post creation** — posts appear at top of feed instantly
- ✅ **Follow/Unfollow** toggle with state persistence
- ✅ Profile completion progress bar

### Layout
- ✅ **Responsive sidebar** — collapsible on desktop, drawer on mobile
- ✅ **Animated transitions** for sidebar width
- ✅ Topbar search with debounce
- ✅ Active route highlighting in sidebar
- ✅ Keyboard accessible (focus-visible, ARIA roles)