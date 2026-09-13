This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

Password recovery is available at `/forgot-password` from the login page. Configure
`EMAIL_SERVER_USER` and `EMAIL_SERVER_PASSWORD` with the existing Gmail SMTP account,
and set `AUTH_URL` (or `NEXTAUTH_URL`) to the public site URL in production.
Reset links expire after 30 minutes, are stored as SHA-256 hashes, and are consumed
atomically with the password update. Changing the password invalidates all outstanding
reset links. Requests are rate limited using the existing `ActionLimit` table.
Google-only accounts should sign in with Google. No database migration is required.

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

Friend requests can be sent from an author's sidebar and are pinned above comment notifications in the header inbox. Only the recipient can accept or reject a pending request; deleting one or all comment notifications never removes friend requests. Accepted requests use the existing friends-only post access rules. New comments notify the post owner, including anonymous comments but excluding the owner's own comments. Deleting a notification preserves the comment; deleting a comment or post removes its related notifications. Redis events refresh the inbox immediately; opening it, reconnecting, regaining focus, and a 30-second reconciliation also refresh persisted state.

## Chat and realtime notifications

Accepted friends can start a private 1:1 conversation from friend management or the author's sidebar. The header message icon opens conversation history, unread counts, and a chat panel (full screen on mobile). Messages are chronological, with older-history pagination, read receipts, and idempotent send retries. Removing a friend disables new messages on the server; both participants retain their existing conversation history. Pending requests and other users cannot send or access the conversation.

PostgreSQL stores messages, read positions, notifications, and friendships. Redis Pub/Sub only carries per-user invalidation events after DB writes commit. Authenticated `/api/events` streams these events to the browser using SSE; sending messages uses authenticated HTTP APIs. No custom WebSocket server or Python service is needed. Channel identity comes exclusively from the server session, never from client input. Use the same `REDIS_CHANNEL_PREFIX` across replicas of one deployment, and different prefixes for independent deployments sharing Redis.

Missed Redis events are reconciled from PostgreSQL on reconnect and every 30 seconds. Redis failure does not roll back a saved message or notification. Connections send heartbeats every 15 seconds and reconnect after four minutes to revalidate the session. If using a reverse proxy, disable buffering for `/api/events` and allow streaming responses; the route sets `X-Accel-Buffering: no`. Run the app as a long-lived Node/Docker service.

### Docker

Keep runtime secrets in `project/.env` (excluded from the image), including `AUTH_SECRET` and `AUTH_URL` matching the browser-facing address. The compose file supplies internal PostgreSQL and Redis addresses. Existing PostgreSQL data is retained; uploaded images in Docker use the `uploads` volume. Existing host uploads remain in `project/storage/uploads` and must be copied to the volume when switching an existing installation to Docker.

From the repository root:

```bash
# Database and Redis for local npm run dev
docker compose up -d postgres redis

# Entire application in Docker, including automatic DB migrations
docker compose --profile app up -d --build
```

The app is available at `http://localhost:3000`; set `APP_PORT` to use another host port and adjust `AUTH_URL` accordingly. Redis is exposed only on `127.0.0.1:6379` for local development. Local Node execution uses `REDIS_URL=redis://127.0.0.1:6379` by default; Docker uses `redis://redis:6379`.

After building locally, run the cross-server realtime test with PostgreSQL and Redis available:

```bash
node --test tests/chat-realtime.test.mjs
```

This creates and removes an isolated test database, runs two app processes on ports 3116/3117, and verifies Redis delivery across servers, channel isolation, friend-only permissions, duplicate sends, read receipts, pagination, and friendship removal.

Views begin accumulating after this migration. Opening an article records at most one view per reader per UTC day and excludes the author. Anonymous readers use a signed, HttpOnly visitor cookie. The weekly list ranks publicly visible posts by views recorded during the preceding seven days; prefetching a page does not record a view. Cookie deletion or switching between anonymous and signed-in reading can produce another view.

Comment creation and password checks use database-backed request limits. Without a trusted proxy, anonymous requests share a conservative limit. Set `TRUST_PROXY=true` only behind a proxy that overwrites `X-Forwarded-For`. `AUTH_SECRET` is also used to sign visitor cookies and hash rate-limit identifiers.

```bash
npx eslint app lib tests instrumentation.ts
node --experimental-strip-types --test tests/image-storage.test.mjs tests/post-outline.test.mjs tests/post-formatting.test.mjs
node --test tests/post-lifecycle.test.mjs
```

The lifecycle test requires a production build and a PostgreSQL account permitted to create a temporary database. It applies migrations to that isolated database, runs an isolated server on port 3114, and removes its fixtures afterward.
