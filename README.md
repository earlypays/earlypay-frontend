# EarlyPay

Earned wage access for eligible employees — landing page and dashboard.

## Tech Stack

- **Next.js 16** – Pages Router
- **TypeScript** – Type safety
- **Tailwind CSS v4** – Styling with CSS variables
- **Zustand** – Lightweight state management
- **Framer Motion** – Animations and transitions
- **Axios** – HTTP client with interceptors
- **React Hook Form + Zod** – Form handling and validation

## Project Structure

```
src/
├── pages/api/         # API routes (proxy at /api/proxy)
├── config/            # Axios instance with auth interceptors
├── components/        # UI, layout, landing, and form components
├── hooks/             # Custom React hooks
├── lib/               # Utilities, token-storage
├── pages/             # Next.js pages
├── services/          # API service layer (base, auth)
├── store/             # Zustand stores
├── styles/            # Global styles
└── types/             # TypeScript types
```

## Setup

1. Copy `.env.example` to `.env.local`:

   ```bash
   cp .env.example .env.local
   ```

2. Set your API base URL in `.env.local` when the backend is ready:

   ```
   NEXT_PUBLIC_API_BASE_URL=https://your-api.example.com
   ```

3. Install dependencies and run:

   ```bash
   npm install
   npm run dev
   ```

## Scripts

- `npm run dev` – Start development server
- `npm run build` – Build for production
- `npm run start` – Start production server
- `npm run lint` – Run ESLint
- `npm run format` – Format with Prettier
