'use server';

import { auth } from "@/src/auth.config";
import prisma from "@/src/lib/prisma";



export const getPaginatedOrders = async() => {

    const session = await auth();

    if( session?.user.role !== 'admin' ){
      return {
        ok: false,
        message: 'Debe de estar autenticado'
      }
    }
    const orders = await prisma.order.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        OrderAddress: {
          select: {
            firstName: true,
            lastName: true,
          }
        }
      }
    });
 return {
  ok: true,
  orders: orders,
 }
}
