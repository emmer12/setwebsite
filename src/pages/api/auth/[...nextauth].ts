import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  adapter: PrismaAdapter(prisma),

  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // credentials: {
      //   username: { label: "Username", type: "text", placeholder: "jsmith" },
      //   password: { label: "Password", type: "password" },
      // },
      credentials: {},
      async authorize(credentials: any, req) {
        const user: any = await prisma.user.findFirst({
          where: { email: credentials.email },
        });

        if (user) {
          const isValid = await compare(credentials.password, user.password);
          if (isValid) {
            return Promise.resolve(user);
          } else {
            return Promise.resolve(null);
          }
        } else {
          return Promise.resolve(null);
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    session: async ({ session, trigger, token, user }) => {
      if (token) {
        const newUser = await prisma.user.findFirst({
          where: {
            email: token.email,
          },
        });

        session.user.id = newUser?.id as string;
        session.user.role = newUser?.role as string;
        session.user.ai_points = newUser?.ai_points as any;
        session.user.saf_points = newUser?.saf_points as any;
      }

      if (trigger === 'update' && session.user.name) {
        console.log(session, "this is the new session")
        session.user.name = session.user.name
      }

      return Promise.resolve(session);
    },
    jwt: ({ token, user, trigger }) => {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.ai_points = user.ai_points;
        token.saf_points = user.saf_points;
      }
      if (trigger === 'update') {
        token.name = user.name
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
