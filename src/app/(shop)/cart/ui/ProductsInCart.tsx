'use client'

import Image from 'next/image';

import { useCartstore } from '@/src/store'
import { QuantitySelector } from '@/src/components';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export const ProductsInCart = () => {

    const updateProductQuantity = useCartstore( state => state.updateProductQuantity )
    const removeProduct = useCartstore( state => state.removeProduct );

    
    const [loaded, setLoaded] = useState(false);
    const productsInCart = useCartstore( state => state.cart );





useEffect(() => {
   setLoaded(true);
}, [])



  return (
<>
{ loaded &&
  productsInCart.map( product => (

              <div key={`${product.slug}-${product.size}`} className="flex mb-5">
                <Image
                  src={ `/products/${ product.image }` }
                  width={ 100 }
                  height={ 100 }
                  style={{
                    width: '100px',
                    height: '100px'
                  }}
                  alt={ product.title }
                  className="mr-5 rounded"
                />

                <div>
                  <Link 
                  className='hover:underline cursor-pointer'
                  href={`/product/${product.slug}`}>{product.size} - { product.title }</Link>
                  <p>${ product.price }</p>
                  <QuantitySelector 
                      quantity={product.quantity} 
                      onQuantityChanged={quantity => updateProductQuantity(product, quantity) }
                  />

                  <button
                  onClick={ () => removeProduct(product) }
                  className="underline mt-3">
                    Remover
                  </button>
                </div>

              </div>


            ) )
          }
</>
  )
}