This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Init Commands

This project was initialized with the following commands:

```bash
npx create-next-app shadcn-demo --use-npm --ts --tailwind --app --src-dir
npx shadcn-ui@latest init
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Learn More About Next.js

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Necessary Infrastructure:

Run `./scripts/infra.sh` to create the necessary infrastructure.

Configure sign in with Google:
Follow the [supabase docs](https://supabase.com/docs/guides/auth/social-login/auth-google?queryGroups=platform&platform=web#google-pre-built-configuration).

Use the following direct links:
Consent screent: https://console.cloud.google.com/apis/credentials/consent?project=life-in-weeks-prod  
Credentials: https://console.cloud.google.com/apis/credentials?project=life-in-weeks-prod

- click 'Create Credentials'
- select 'OAuth client ID'
- select 'Web application'
- add these authorized JavaScript origins:
  - http://localhost
  - http://127.0.0.1
  - https://vercel.app
  - https://weeksin.life
- add these authorized redirect URIs:
  - http://127.0.0.1:54321/auth/v1/callback
  - http://localhost:54321/auth/v1/callback
  - https://wzmbtcpnjweqsqiubvii.supabase.co/auth/v1/callback
  - https://mbauxwpjmmlvbojestpa.supabase.co/auth/v1/callback

configure supabase providers with client id and secret from above: https://supabase.com/dashboard/project/mbauxwpjmmlvbojestpa/auth/providers  
configure redirect urls: https://supabase.com/dashboard/project/mbauxwpjmmlvbojestpa/auth/url-configuration

for staging:

- `https://\*-jonny-langefelds-projects.vercel.app/\*\*`

for prod:

- `https://life-in-weeks-xi.vercel.app/**`
- `https://weeksin.life/**`
