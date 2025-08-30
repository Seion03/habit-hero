# Habit Hero (React / CRA)

A React app bootstrapped with Create React App (react-scripts). This repo contains:
- Completed components and hooks (no placeholder code)
- Dockerfile + nginx.conf for containerized static hosting
- Proxy config in `package.json` for local backend at `http://localhost:8000`

## Prerequisites
- Node.js 18.x (recommended) and npm
- A backend reachable at `/api` or adjust `package.json` `proxy` or `API_BASE` in `src/utils/constants.js`

## Install & Run (dev)
```bash
npm ci       # or: npm install
npm start
```

## Build
```bash
npm run build
```

The production assets will be in the `build/` directory.

## Docker (production static hosting)
```bash
docker build -t habit-hero-frontend .
docker run --rm -p 3000:3000 habit-hero-frontend
```
This serves the CRA build via nginx (see `nginx.conf`).

## Notes
- Tailwind classNames are present for utility-style layout but Tailwind itself is not required to build/run. If you want Tailwind styles, add Tailwind and PostCSS config.
- The frontend expects backend endpoints:
  - `GET /api/habits/`
  - `POST /api/habits/`
  - `DELETE /api/habits/:id/`
  - `GET /api/checkins/`
  - `POST /api/checkins/`
  - `GET /api/analytics/overview`
  - `GET /api/categories/` (optional; falls back to built-in categories)
Adjust `src/services/api.js` if your API differs.
