export const revalidate = 60; // 60 segundos

import { getPaginatedProductsWithImages } from '@/src/actions';
import { Pagination, ProductGrid, Title } from '@/src/components';


import { Gender } from '@prisma/client';
import { redirect } from 'next/navigation';

interface Props {
  params: {
    gender: string;
  },
  searchParams: {
    page?: string;
  }
}

export default async function GenderbyPage({params, searchParams}: Props ) {

  const { gender } = params;  
 
  const page = searchParams.page ? parseInt( searchParams.page ) : 1 // el string lo convertimos a numero
        

  const { 
    products, 
    currentPages, 
    totalPages
   } = await getPaginatedProductsWithImages({
    page,
    gender: gender as Gender,
    });

   
  if ( products.length === 0 ){  //control cuando no hay productos en la pagina
    redirect(`/gender/${gender}`);
  }

  const labels: Record<string, string> = {
  'men': 'para hombres',
  'women': 'para mujeres',
  'kid': 'para niños',
  'unisex': 'para todos' 
}

  return (
    <>
     
    <Title 
      title={`Productos ${ labels[gender] }`}
      subtitle="Todos los productos"  
      className='mb-2'
    />
    
      <ProductGrid products={ products }    />

      <Pagination totalPages={totalPages}  />

    </>
  );
}