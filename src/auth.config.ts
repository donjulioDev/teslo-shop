
import NextAuth, { type NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod'; // esquema de validacion

import prisma from '@/src/lib/prisma';


export const authConfig  = {
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/new-account',
  },
  providers: [
    Credentials({
      async authorize(credentials) {

        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;
        console.log('Desde aut-config');
        
              console.log(email);
              //const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
              
        // Buscar el correo
     
        //Comparar las contraseñas

        //Regresar el usuario


        return null;
      },
    }),
  ],
} satisfies NextAuthConfig

export const {  signIn, signOut, auth,  } = NextAuth( authConfig );