// import NextAuth from "next-auth"
 
// export const { handlers, signIn, signOut, auth } = NextAuth({
//   providers: [],
// })

// import type { NextAuthConfig } from "next-auth";
// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import Google from "next-auth/providers/google";
// import { db } from "@/lib/db";

// const credentialsConfig = CredentialsProvider({
//   name: "Credentials",
//   credentials: {
//     name: { label: "User Name" },
//     email: { label: "Email", type: "email" },
//     password: { label: "Password", type: "password" },
//   },

//   async authorize(credentials: any) {
//     const { name, email, password, isLogin } = credentials;
    
//     let user = await db.user.findUnique({
//       where: { email },
//     });

//     if (isLogin === "false" && !user) {
//       const newUser = await db.user.create({
//         data: { name, email, password },
//       });

//       if (newUser) {
//         return { id: newUser.id.toString(), name: newUser.name, email: newUser.email };
//       }
//       return null;
//     } else if (user && user.password === password) {
//       return { id: user.id.toString(), name: user.name, email: user.email };  // Exclude password & timestamps
//     }

//     return null;
//   },
// });

// const config = {
//   providers: [Google, credentialsConfig],
// } satisfies NextAuthConfig;

// export const { handlers, auth, signIn, signOut } = NextAuth(config);

// import type { NextAuthConfig } from "next-auth";
// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import Google from "next-auth/providers/google";
// import { db } from "@/lib/db";
// import bcrypt from 'bcryptjs';

// const credentialsConfig = CredentialsProvider({
//   name: "Credentials",
//   credentials: {
//     name: { label: "User Name" },
//     email: { label: "Email", type: "email" },
//     password: { label: "Password", type: "password" },
//   },

//   async authorize(credentials: any) {
//     if (!credentials?.email || !credentials?.password) {
//       return null;
//     }

//     const { name, email, password, isLogin } = credentials;
    
//     try {
//       let user = await db.user.findUnique({
//         where: { email },
//       });

//       if (isLogin === "false" && !user) {
//         // Hash the password before storing it in the database
//         const hashedPassword = await bcrypt.hash(password, 10);

//         const newUser = await db.user.create({
//           data: { 
//             name, 
//             email, 
//             password: hashedPassword, // Store the hashed password
//           },
//         });

//         return newUser ? {
//           id: newUser.id.toString(),
//           name: newUser.name,
//           email: newUser.email,
//         } : null;
//       } 
      
//       if (user) {
//         // Compare the hashed password stored in the database with the provided password
//         const isValid = await bcrypt.compare(password, user.password);

//         if (isValid) {
//           return {
//             id: user.id.toString(),
//             name: user.name,
//             email: user.email,
//           };
//         }
//       }

//       return null;
//     } catch (error) {
//       console.error('Auth error:', error);
//       return null;
//     }
//   },
// });

// export const config = {
//   providers: [
//     Google({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }), 
//     credentialsConfig
//   ],
//   pages: {
//     signIn: '/auth/signin',
//     error: '/auth/error',
//   },
//   trustHost: process.env.NODE_ENV === 'development',
//   callbacks: {
//     async redirect({ url, baseUrl }) {
//       return url.startsWith(baseUrl) ? url : baseUrl;
//     },
//     async session({ session, user }) {
//       return session;
//     },
//     async jwt({ token, user, account }) {
//       if (user) {
//         token.id = user.id;
//       }
//       return token;
//     }
//   },
//   secret: process.env.NEXTAUTH_SECRET,
// } satisfies NextAuthConfig;

// export const { handlers, auth, signIn, signOut } = NextAuth(config);

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
  trustHost: true,  // Trust all hosts for testing purposes
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Ensure the redirect stays within the same domain
      return url.startsWith(baseUrl) ? url : baseUrl;
    }
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);