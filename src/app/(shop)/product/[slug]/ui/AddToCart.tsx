"use client"

import { useState } from 'react';
import { QuantitySelector, SizeSelector } from '@/src/components'
import type { Product, Size, CartProduct } from '@/src/interfaces';
import { useCartstore } from '@/src/store';

interface Props {
  product: Product;
}


export const AddToCart = ({ product }: Props ) => {
 const addProductToCart =  useCartstore( state => state.addProductToCart );

const [size, setSize] = useState<Size|undefined>();
const [quantity, setQuantity] = useState<number>(1);
const [posted, setPosted] = useState(false)

    const addToCart = () => {
      setPosted(true)
      if( !size ) return;
      
        const cartProduct: CartProduct = {
          id: product.id,
          slug: product.slug,
          title: product.title,
          price: product.price,
          quantity: quantity,
          size: size,
          image: product.images[0]
        }


      addProductToCart(cartProduct);
      
    }



  return (
    <>
        {
          posted && !size && (
      <span className="mt-2 text-red-500 fade-in">
        Debe seleccionar una talla*
      </span>
          )
        }
      {/* Selector de tallas */}
        <SizeSelector
          selectedSize={ size }
          availableSizes={product.sizes}
          onSizeChanged={ setSize } // forma aunmentada ( size ) => setSize(size)
          />

        {/* Selector de cantidad */}
        <QuantitySelector 
          quantity={quantity} 
          onQuantityChanged ={setQuantity}
        />

        {/* Button */}
        <button 
        onClick={ addToCart }
        className="btn-primary my-5"
        >
          Agregar al carrito
        </button>
    </>
  )
}
