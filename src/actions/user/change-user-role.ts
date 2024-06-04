'use server';


import { auth } from "@/src/auth.config";
import prisma from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";



export const changeUserRole = async(userId: string, role: string ) => {
      const session = await auth();

      if( session?.user.role !== 'admin' ){
        return {
          ok: false,
          message: 'Debe tener privilegios de administrador'
        }
      }

      try {

          const newRole = role === 'admin' ? 'admin' : 'user' 

        const user = await prisma.user.update({
          where: {
            id: userId
          },
          data: {
            role: newRole
          }
        });

         revalidatePath('/admin/users')
          return {
            ok: true,
          }


      } catch (error) {
        return {
          ok: false,
          message: 'No se pudo actualizar el role, recisar logs'
        }
      }
}