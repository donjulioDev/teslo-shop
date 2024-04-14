'use server';

import prisma from "@/src/lib/prisma";

      interface PaginationOptions {
        page?: number;
        take?: number;
      }


export const getPaginatedProductsWithImages = async ({
  page = 1, 
  take = 12
}: PaginationOptions ) => {

  if ( isNaN( Number(page)) ) page = 1;  //tranformamos page a number
  if (page < 1 ) page = 1;

  
  try {


    // 1. Obtener los productos
       const products = await prisma.product.findMany({
        take: take,    //numero de registros
        skip: (page - 1 ) * take, //paginacion con prisma
        include: {
        ProductImage: {
          take: 2,
          select: {
            url: true
          }
        }
      }
    });

    // 2, Obtener el total de paginas
    // todo:
    const totalCount =  await prisma.product.count({});
    const totalPages = Math.ceil( totalCount / take );
 
    return {
     currentPages: page,
     totalPages: totalPages,
      products: products.map( product => ({
        ...product,
        images: product.ProductImage.map( image => image.url), 
      }))
    };
    
  } catch (error) {
    throw new Error('No se pudo cargar los productos');
  }
}