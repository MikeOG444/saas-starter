# SaaS Starter

A modern, production-ready boilerplate for launching SaaS applications with React 18, Tailwind CSS, Supabase, and Stripe. The project ships with authentication, subscription billing, marketing pages, analytics, a helpdesk chat integration, and a ready-to-deploy serverless API.

## Requirements
- Node.js 18 or newer
- npm 9 or newer
- A Vercel account (for local API emulation and production hosting)

## Quick start
1. Install dependencies
   ```bash
   npm install
   ```
2. Create an `.env.local` (or `.env`) file and provide values for the environment variables listed below.
3. Install the Vercel CLI if you have not already
   ```bash
   npm install -g vercel
   ```
4. Run the full stack locally (React + API routes)
   ```bash
   vercel dev
   ```
   When the dev server is ready you can visit the site at http://localhost:3000. Use `npm start` (or `npm run dev`) if you only need the React front end.

## Environment variables
Define these values locally and in each Vercel environment. Variables prefixed with `REACT_APP_` are exposed to the browser; others are server-only and should be added with `vercel env` or the Vercel dashboard.

| Variable | Description |
| --- | --- |
| `REACT_APP_SUPABASE_URL` | Supabase project URL used by the browser client |
| `REACT_APP_SUPABASE_PUBLIC_KEY` | Supabase anon/public key |
| `SUPABASE_URL` | Supabase project URL for serverless API routes |
| `SUPABASE_SECRET_KEY` | Supabase service role key used by API routes |
| `REACT_APP_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key for client-side checkout |
| `STRIPE_SECRET_KEY` | Stripe secret key for server-side checkout |
| `STRIPE_WEBHOOK_SECRET` | Secret from the Stripe CLI/dashboard for validating incoming webhooks |
| `REACT_APP_STRIPE_PRICE_STARTER` | Stripe Price ID for the “Starter” subscription |
| `REACT_APP_STRIPE_PRICE_PRO` | Stripe Price ID for the “Pro” subscription |
| `REACT_APP_STRIPE_PRICE_BUSINESS` | Stripe Price ID for the “Business” subscription |
| `REACT_APP_CONVERTKIT_FORM_ID` | ConvertKit form ID for newsletter subscriptions |
| `REACT_APP_FORMSPREE_CONTACT_ID` | Formspree form ID for the contact form |
| `REACT_APP_CRISP_WEBSITE_ID` | Crisp chat website ID |
| `REACT_APP_GA_MEASUREMENT_ID` | Google Analytics 4 measurement ID |

## Available scripts
- `npm start` / `npm run dev` – launch the React development server.
- `vercel dev` – run the full stack (React + API routes) locally.
- `npm run build` – create an optimized production build.
- `npm test` – execute the Create React App test runner.
- `npm run stripe-webhook` – start the Stripe CLI listener and forward events to the local webhook endpoint.

## Tech stack
- **UI** – React 18 with Create React App and Tailwind CSS 3.4
- **Routing** – React Router 6 using a shared `HistoryRouter` wrapper (`src/util/router.js`)
- **State & Data** – TanStack Query 5 (`QueryClientProvider` in `src/util/db.js`)
- **Forms** – React Hook Form 7 with reusable form controls (`src/components/TextField.js`)
- **Auth & Database** – Supabase JS v2 with custom hooks in `src/util/auth.js` and `src/util/db.js`
- **Payments** – Stripe API (serverless functions in `api/`)
- **Analytics & Messaging** – Google Analytics and Crisp chat integrations
- **Deployment** – Vercel (serves both the React app and serverless API routes)

## Project guide

<details>
<summary><strong>Styling</strong></summary>
<p>
Tailwind utility classes are applied directly within each component. Global configuration lives in <code>tailwind.config.js</code> and <code>postcss.config.js</code>, while shared styles belong in <code>src/styles/global.css</code>. Tailkit components are included as a baseline; adjust them or add new utilities as needed.
</p>
</details>

<details>
<summary><strong>Routing</strong></summary>
<p>
Application routes are defined in <code>src/pages/_app.js</code> using React Router 6’s <code>&lt;Routes&gt;</code> API. The custom wrapper in <code>src/util/router.js</code> exposes a <code>useRouter</code> hook that combines React Router helpers and query-string parsing.
</p>

```js
import { Link, useRouter } from "./../util/router";

function MyComponent() {
  const router = useRouter();

  // Read query string or route params (?postId=123 / :postId)
  console.log(router.query.postId);

  // Navigate programmatically
  return (
    <div>
      <Link to="/about">About</Link>
      <button onClick={() => router.push("/about")}>About</button>
    </div>
  );
}
```
</details>

<details>
<summary><strong>Authentication</strong></summary>
<p>
The <code>useAuth</code> hook in <code>src/util/auth.js</code> wraps Supabase Auth v2. It exposes helpers for signing in, creating accounts, password resets, and session state. Wrap your components in <code>&lt;AuthProvider&gt;</code> (already done in <code>src/pages/_app.js</code>) to access these methods anywhere in the tree.
</p>
</details>

<details>
<summary><strong>Forms</strong></summary>
<p>
Forms rely on React Hook Form v7. Components such as <code>AuthForm</code> and <code>SettingsPassword</code> pass <code>registration</code> props from <code>register()</code> into <code>TextField</code>. The field handles merging refs so validation errors surface consistently.
</p>
</details>

<details>
<summary><strong>Data fetching</strong></summary>
<p>
TanStack Query v5 powers Supabase data access via hooks like <code>useUser</code> and <code>useItemsByOwner</code> in <code>src/util/db.js</code>. The shared <code>QueryClientProvider</code> is instantiated once in <code>src/pages/_app.js</code>, enabling caching, refetching, and optimistic updates. Extend these helpers or add new query hooks following the same pattern.
</p>
</details>

<details>
<summary><strong>Payments</strong></summary>
<p>
Serverless API routes under <code>api/</code> handle subscription checkout, billing portal sessions, and Stripe webhooks. Use the provided <code>npm run stripe-webhook</code> script alongside the Stripe CLI to test webhook events locally.
</p>
</details>

<details>
<summary><strong>Deployment</strong></summary>
<p>
Deploy with Vercel once your project is linked.
</p>

```bash
npm install -g vercel
vercel login
vercel link
vercel
```

<p>
Add each environment variable (including <code>REACT_APP_</code> values) via <code>vercel env add</code> or the dashboard. Use <code>vercel --prod</code> for production releases once you are ready.
</p>
</details>

## Stripe testing
1. Log in to the Stripe CLI and forward events
   ```bash
   npm run stripe-webhook
   ```
2. Start the local dev server (`vercel dev`).
3. Visit the pricing page, choose a plan, and use Stripe test cards (e.g., `4242 4242 4242 4242`).
4. Watch the terminal output to confirm webhook events are processed successfully.

## Database schema
The Supabase SQL schema lives in `schema.sql`. Apply it to a fresh project to seed tables (`users`, `customers`, `items`, etc.) before running the app.

## Need help?
If you run into issues, open an issue in your fork or consult the documentation for React Router 6, TanStack Query, Supabase, or Stripe linked above. Contributions that improve the starter or its documentation are always welcome.
