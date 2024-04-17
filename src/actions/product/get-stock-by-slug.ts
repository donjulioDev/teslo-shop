'use server'

import prisma from "@/src/lib/prisma";
import { sleep } from "@/src/utils";


export const getStockBySlug = async (slug: string): Promise<number> => {
  
    try {

   //   await sleep(3);

     const stock = await prisma.product.findFirst({
      where: { slug },
      select: { inStock: true, price: true }
     });
    
        
     return  stock?.inStock ?? 0

    } catch (error) {
      console.log('Error obteniendo stockbySlug');
      console.log(error);
      return 0;
    }
}
