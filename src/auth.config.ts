//"use server";
import NextAuth, { type NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcryptjs from 'bcryptjs';
import { z } from 'zod'; // esquema de validacion

import prisma from '@/src/lib/prisma';


export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/new-account',
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.data = user
      }
      return token
    },
    session({ session, token, user }) {
      session.user = token.data as any;

      return session
    },
  },
  providers: [
    Credentials({
      async authorize(credentials) {

        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);


        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;
        // Buscar el correo
        const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
        if (!user) return null;

        //Comparar las contraseñas
        if (!bcryptjs.compareSync(password, user.password)) return null //Si las contraseñas no hacen match 



        //Regresar el usuario sin el password
        const { password: _, ...rest } = user;
        return rest;
      },
    }),
  ],
}

export const { signOut, signIn, auth, handlers } = NextAuth(authConfig);