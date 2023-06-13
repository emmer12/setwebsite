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
          console.log(isValid);
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
    session: async ({ session, token, user }) => {
      if (session?.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      // const userData = await fetch(
      //   `${process.env.NEXTAUTH_URL}/api/user?userId=${token.id}`
      // ).then((response) => response.json());
      // session.user.subscriptionStatus = userData.subscriptionStatus;
      return Promise.resolve(session);
    },
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
