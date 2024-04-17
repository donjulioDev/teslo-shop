export const revalidate = 604800 // cada 7 dias

import { notFound } from 'next/navigation';

import { titleFont } from '@/src/app/config/fonts';
import { ProductMobileSlideshow, ProductSlideshow, QuantitySelector, SizeSelector, StockLabel } from '@/src/components';
import { getProductBySlug } from '@/src/actions/product/get-product-by-slug';
import { Metadata, ResolvingMetadata } from 'next';


interface Props {
  params: {
    slug: string;
  }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug;
 
  // fetch data
  const product = await getProductBySlug(slug)
 
  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []
 
  return {
    title: product?.title ?? 'Producto no encontrado',
    description: product?.description ?? '',
    openGraph: {
      title: product?.title ?? 'Producto no encontrado',
      description: product?.description ?? '',
      // images: [], // https://misitio.com/products/image.png
      images: [`/products/${ product?.images[1] }`],
    },
  }
}

export default async function ProductBySlugPage({ params }: Props) {

  const { slug } = params;
  const product = await getProductBySlug( slug );
  console.log(product?.slug);
  


  if (!product) {
    notFound()
  }



  return (
    <div className='mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3'>
      {/* SlideShow */}
      <div className="col-span-1 md:col-span-2">
        {/* Mobile Slideshow */}
        <ProductMobileSlideshow
          images={product.images}
          title={product.title}
          className='block md:hidden'
        />
        {/* Desktop Slideshow */}
        <ProductSlideshow
          title={product.title}
          images={product.images}
          className='hidden sm:block'
        />
      </div>
      {/* Detalles */}
      <div className="col-span-1 px-5">

       <StockLabel slug={product.slug}  />

        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        <p className="text-lg mb-5">${product.price}</p>

        {/* Selector de tallas */}

        <SizeSelector
          selectedSize={product.sizes[0]}
          availableSizes={product.sizes} />

        {/* Selector de cantidad */}

        <QuantitySelector quantity={2} />

        {/* Button */}
        <button className="btn-primary my-5">
          Agregar al carrito
        </button>
        {/* Descripcion */}
        <h3 className="font-bold text-sm">Descripción</h3>
        <p>{product.description}</p>
      </div>


    </div>
  );
}