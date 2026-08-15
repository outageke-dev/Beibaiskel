Vercel deployment instructions

1) Create a new project on Vercel connected to this repository (GitHub/GitLab/Bitbucket).

2) Environment variables (set these in the Vercel Project Settings -> Environment Variables):
- `BEI_BAISIKELI_API_KEY` : your upstream API key (secret)
- `BEI_BAISIKELI_API_URL` : optional upstream base URL (default: https://beibaiskeli.onrender.com)

3) Build & Output
- Vercel will detect Next.js and run `npm run build` (already configured in `package.json`).

4) API routes
- This project uses the App Router `app/api/*` server routes. No additional rewrites are required; the included `vercel.json` is a minimal helper.

5) Local production check
- To test a production build locally:

```bash
npm install
npm run build
npm start
```

6) Notes
- Do NOT commit secret API keys to the repo. Use Vercel's environment variable UI or the Vercel CLI to set secrets.
- If you want to restrict regions or adjust function memory/timeouts, edit `vercel.json` per Vercel docs.
