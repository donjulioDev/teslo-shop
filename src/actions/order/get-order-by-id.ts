'use server';

import { auth } from "@/src/auth.config";
import prisma from "@/src/lib/prisma";


export const getOrderById = async ( id: string ) => {
// Verificar que sea un usario
const session = await auth();

if ( !session?.user ){
  return {
    ok: false,
    message: 'Debe estar autenticado'
  }
} 
  try {
     //? Obtener la orden pagada
    
    const order = await prisma.order.findFirst({
      where: { id: id },
      include: {
        OrderAddress: true,
        OrderItems: {
          select: {
            price: true,
            quantity: true,
            size: true,
          
            product: {
              select: {
                title: true,
                slug: true,
                ProductImage: {
                  select: {
                    url: true
                  },
                  take: 1
                }
              }
            }
          }
        }
      }
    });

        if(!order) throw `${id} no existe`
        if ( session.user.role === 'user' ){
          if (session.user.id !== order.userId ){
              throw `${ id } no es de ese uduario`
          }
        }

    return {
      ok: true,
      order: order,
    
    }
    
  } catch (error) {

    console.log(error);

    return {
      ok: false,
      message: 'Orden no existe'
    }
  }






}

