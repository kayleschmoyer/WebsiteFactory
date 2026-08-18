# WebsiteFactory

A production-oriented SaaS workspace for creating polished local-business websites from **structured business data + reusable React templates**. Website content remains independent from design, so changing templates never destroys client information.

## Stack

Next.js 15 App Router, React 19, strict TypeScript, Tailwind CSS, Supabase Auth/Postgres/Storage, Zod, Vitest, and Vercel-ready deployment.

## Requirements

- Node.js 20+
- npm 10+
- A Supabase project (the polished local showcase also runs without credentials)

## Install and run

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`. Without Supabase variables, the app uses its built-in showcase dataset and mock AI provider so design and template workflows can be evaluated immediately.

## Environment variables

Copy `.env.example`. Only the Supabase URL and anonymous key may be public. `SUPABASE_SERVICE_ROLE_KEY` and AI provider keys are server-only and must never use the `NEXT_PUBLIC_` prefix.

## Supabase setup

1. Create a project and an email/password Auth user.
2. Run `supabase/migrations/202608180001_initial.sql` in the SQL editor or `supabase db push` with the CLI.
3. Run `supabase/seed.sql` with `demo_user` set to the Auth user's UUID.
4. Add the project URL and anonymous key to `.env.local`.
5. Confirm the `site-media` bucket was created by the migration.

The migration creates normalized site content, services, hours, testimonials, FAQ, media, AI audit records, and leads. All tenant tables use RLS. Owners are resolved from `auth.uid()` through each related site's foreign key. Public select policies only expose demo/published sites and their render data; public lead access is insert-only. Storage writes are restricted to the authenticated user's folder.

## Architecture

- `types/site.ts` defines the normalized `SiteViewModel`.
- `components/templates` contains render-only templates; templates never query Supabase.
- `components/site-builder` owns editing and instantaneous responsive preview behavior.
- `lib/supabase` separates browser and server clients.
- `lib/ai/provider.ts` defines the provider contract and safe local mock implementation.
- `supabase/migrations` is the source of truth for schema, indexes, RLS, and Storage.

## AI configuration

`AI_PROVIDER=mock` is the credential-free default. Provider credentials belong only in server environment variables. Implement another `AIProvider` and select it in `getAIProvider`; generated text remains editable and prompts should only use facts supplied by the user.

## Validation

```bash
npm run typecheck
npm test
npm run build
```

## Deploy to Vercel

Import the repository in Vercel, configure the variables from `.env.example`, and deploy. Set `NEXT_PUBLIC_APP_URL` to the production origin. Apply database migrations before sending traffic. Never add the service-role key to browser code or Vercel variables prefixed with `NEXT_PUBLIC_`.

## Production integration note

The repository includes complete schema and integration boundaries plus a credential-free showcase mode. Connect editor mutations, contact insertion, and auth screens to the provided Supabase clients for the configured deployment; RLS remains the final authorization boundary.
