This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Blog data and tests

After installing dependencies, apply migrations and regenerate the client from the project directory:

```bash
npx prisma migrate deploy --config prisma7.config.ts
npx prisma generate --config prisma7.config.ts
npm run build
```

Posts and drafts store up to 10 tags. Anonymous comments store a nickname and bcrypt password hash without a user relation or profile image. Authors can edit their own account comments; a post owner can delete comments on that post. Likes require login and are unique per account and post. Liked-post lists still enforce the post's current visibility.

Views begin accumulating after this migration. Opening an article records at most one view per reader per UTC day and excludes the author. Anonymous readers use a signed, HttpOnly visitor cookie. The weekly list ranks publicly visible posts by views recorded during the preceding seven days; prefetching a page does not record a view. Cookie deletion or switching between anonymous and signed-in reading can produce another view.

Comment creation and password checks use database-backed request limits. Without a trusted proxy, anonymous requests share a conservative limit. Set `TRUST_PROXY=true` only behind a proxy that overwrites `X-Forwarded-For`. `AUTH_SECRET` is also used to sign visitor cookies and hash rate-limit identifiers.

```bash
npx eslint app lib tests instrumentation.ts
node --experimental-strip-types --test tests/image-storage.test.mjs tests/post-outline.test.mjs tests/post-formatting.test.mjs
node --test tests/post-lifecycle.test.mjs
```

The lifecycle test requires a production build and a PostgreSQL account permitted to create a temporary database. It applies migrations to that isolated database, runs an isolated server on port 3114, and removes its fixtures afterward.
