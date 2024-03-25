import { ProductGrid, Title } from '@/src/components';
import { Category } from '@/src/interfaces';
import { initialData } from '@/src/seed/seed';
import { notFound } from 'next/navigation';

interface Props {
  params: {
    id: Category;
  }
}

export default function ({params}: Props ) {

  const { id } = params;  
  const products = initialData.products;
  const resultado = products.filter( product => product.gender === id );

const labels: Record<Category, string> = {
  'men': 'para hombres',
  'women': 'para mujeres',
  'kid': 'para niños',
  'unisex': 'para todos' 
}

  return (
    <>
    <Title 
      title={`Productos ${ (labels)[id] }`}
      subtitle="Todos los productos"  
      className='mb-2'
    />
      <ProductGrid products={ resultado }    
    />
    </>
  );
}