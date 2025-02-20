// import NextAuth from "next-auth"
 
// export const { handlers, signIn, signOut, auth } = NextAuth({
//   providers: [],
// })

import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { db } from "@/lib/db";

const credentialsConfig = CredentialsProvider({
  name: "Credentials",
  credentials: {
    name: { label: "User Name" },
    email: { label: "Email", type: "email" },
    password: { label: "Password", type: "password" },
  },

  async authorize(credentials: any) {
    const { name, email, password, isLogin } = credentials;
    
    let user = await db.user.findUnique({
      where: { email },
    });

    if (isLogin === "false" && !user) {
      const newUser = await db.user.create({
        data: { name, email, password },
      });

      if (newUser) {
        return { id: newUser.id.toString(), name: newUser.name, email: newUser.email };
      }
      return null;
    } else if (user && user.password === password) {
      return { id: user.id.toString(), name: user.name, email: user.email };  // Exclude password & timestamps
    }

    return null;
  },
});

const config = {
  providers: [Google, credentialsConfig],
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
