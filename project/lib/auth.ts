import { displayName } from "./display-name";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";

import prisma from "@/lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  adapter: PrismaAdapter(prisma),

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },

  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Credentials({
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        if (
          typeof credentials?.email !== "string" ||
          typeof credentials?.password !== "string"
        ) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user.passwordHash) {
          return null;
        }

        const ok = await bcrypt.compare(
          credentials.password,
          user.passwordHash
        );

        if (!ok) {
          return null;
        }

        // 이메일 인증 여부 검사
        if (!user.emailVerified) {
          throw new Error("EmailNotVerified");
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user?.id) {
        token.id = user.id;
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
        });

        if (dbUser) {
          token.name = dbUser.name; // 본명 보존
          token.email = dbUser.email;
          token.picture = dbUser.image;

          // 소셜 로그인 등으로 nickname이나 tag가 없다면 자동 부여
          if (!dbUser.nickname || !dbUser.tag) {
            const baseNickname =
              dbUser.nickname ||
              dbUser.name ||
              user.name ||
              user.email?.split("@")[0] ||
              "User";
            const { generateUniqueTag } = await import("@/lib/tag");
            const tag = await generateUniqueTag(baseNickname);
            const updated = await prisma.user.update({
              where: { id: dbUser.id },
              data: {
                nickname: baseNickname,
                tag,
              },
            });
            token.nickname = updated.nickname;
            token.tag = updated.tag;
          } else {
            token.nickname = dbUser.nickname;
            token.tag = dbUser.tag;
          }
        }
      }
      token.name = displayName(token.name, token.tag);
      return token;
    },

    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
        session.user.name = token.name as string; // 실명
        (session.user as unknown as { nickname?: string; tag?: string }).nickname =
          token.nickname as string;
        (session.user as unknown as { nickname?: string; tag?: string }).tag =
          token.tag as string;
      }
      return session;
    },
  },
});