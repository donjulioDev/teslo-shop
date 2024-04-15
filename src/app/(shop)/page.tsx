export const revalidate = 60; // 60 segundos

//import Image from "next/image";
import { redirect } from 'next/navigation';

import { getPaginatedProductsWithImages } from '@/src/actions';
import { Pagination, ProductGrid, Title } from '@/src/components';
//import { initialData } from '@/src/seed/seed';


interface Props {
  searchParams: {
    page?: string;
  }
}

export default async function Home({ searchParams }: Props) {
  
  const page = searchParams.page ? parseInt( searchParams.page ) : 1 // el string lo convertimos a numero
        

  const { 
    products, 
    currentPages, 
    totalPages
   } = await getPaginatedProductsWithImages({page});

   
    


  if ( products.length === 0 ){  //control cuando no hay productos en la pagina
    redirect('/');
  }

  return (
   <>
    <Title 
      title='Tienda'
      subtitle='Todos los productos'
      className='mb-2'    
    />
    <ProductGrid products={ products }/>

    <Pagination totalPages={ totalPages } />
   </>
  );
}
