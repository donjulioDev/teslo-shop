'use server';

import prisma from '@/src/lib/prisma';
import { Gender, Product, Size } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config(process.env.CLOUDINARY_URL ?? '');

const prductSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  title: z.string().min(3).max(255),
  slug: z.string().min(3).max(255),
  description: z.string(),
  price: z.coerce.number().min(0).transform(val => Number(val.toFixed(2))),
  inStock: z.coerce.number().min(0).transform(val => Number(val.toFixed(0))),
  categoryId: z.string().uuid(),
  sizes: z.coerce.string().transform(val => val.split(',')),
  tags: z.string(),
  gender: z.nativeEnum(Gender),
})

export const createUpdateProduct = async (formData: FormData) => {
  const data = Object.fromEntries(formData);
  const productParsed = prductSchema.safeParse(data);

  if (!productParsed.success) {
    console.log(productParsed.error);
    return { ok: false }
  }

  const product = productParsed.data;
  product.slug = product.slug.toLowerCase().replace(/ /g, '-').trim(); // Asegurar que el slug no tiene espacios en blanco

  const { id, ...rest } = product;

  try {
    const prismaTx = await prisma.$transaction(async (tx) => {

      let product: Product;
      const tagsArray = rest.tags.split(',').map(tag => tag.trim().toLocaleLowerCase());

      if (id) {
        // Actualizar
        product = await prisma.product.update({
          where: { id: id },
          data: {
            ...rest,
            sizes: {
              set: rest.sizes as Size[],
            },
            tags: {
              set: tagsArray
            }
          }
        });

        console.log('desde: create-update-product')
        console.log({ updateProduct: product });


      } else {
        // Crear
        product = await prisma.product.create({
          data: {
            ...rest,
            sizes: {
              set: rest.sizes as Size[],
            },
            tags: {
              set: tagsArray
            }
          },
        })
      }
      // Proceso de carga y guardado de imagenes 📷
      // Recorrer las imagenes y guardarlas
      if (formData.getAll('images')) {
        const images = await uploadImages(formData.getAll('images') as File[]);
          if (!images) {
            throw new Error('No se pido cargar las imàgenes, rollingback')
          }
          await prisma.productImage.createMany({ 
            data: images.map ( (image) => ({
              url: image!,
              productId: product.id
            }))
          });
      }

      return {
        product
      }
    });
    
    //? RevalodatePaths
    revalidatePath('/admin/products');
    revalidatePath(`/admin/product/${product.slug}`);
    revalidatePath(`/products/${product.slug}`);


    return {
      ok: true,
      product: prismaTx.product
    }

  } catch (error) {
    return {
      ok: false,
      message: 'Revisar los logs, no se pudo actualizar/crear'
    }
  }

}

const uploadImages = async( images: File[] ) => {

  try {

    const uploadPromises = images.map(async (image) => {

      try {
        
        const buffer = await image.arrayBuffer();
        const base64Image = Buffer.from(buffer).toString('base64');

        const uploadedToCloudinary = await cloudinary.uploader.upload(`data:image/png;base64,${ base64Image }`)
        .then( r => r.secure_url ); 
                   
        return uploadedToCloudinary;

      } catch (error) {
          console.log(error);
               return null;
      }
    })
      console.log( uploadPromises);
      
    const uploadImages = await Promise.all(uploadPromises);
    return uploadImages;

  } catch (error) {
    console.log(error);
    return null
  }
}