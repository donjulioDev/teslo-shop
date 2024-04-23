import { CartProduct } from "@/src/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";


interface State {
  cart: CartProduct[];

  getTotalItems: () => number;
  getSummaryInformation: () => {
    subTotal: number;
    tax: number;
    total: number;
    itemsInCart: number;
};

  addProductToCart: (product: CartProduct) => void;
  updateProductQuantity: (product: CartProduct, quantity: number) => void;
  removeProduct: (product: CartProduct) => void;
}

export const useCartstore = create<State>()(
  persist(
    (set, get) => ({

      cart: [],
      // Methods

      getTotalItems: () => {
        const { cart } = get(); //Barrer para obtener la cantidad a llevar en el carro
        return cart.reduce((total, item) => total + item.quantity, 0);
      },

      getSummaryInformation: () => {
          const { cart } = get();  
        const subTotal =  cart.reduce( ( subTotal, product ) => (product.quantity * product.price) + subTotal, 0 );
          const tax = subTotal * 0.15;
          const total = subTotal + tax;
          const itemsInCart = cart.reduce((total, item) => total + item.quantity, 0);
          return {
            subTotal, tax, total, itemsInCart
          }
        }, 

      addProductToCart: (product: CartProduct) => {
        const { cart } = get();

        // 1. Revisar si el producto existe en el carrito con la talla seleccionada
        const productInCart = cart.some(
          (item) => (item.id === product.id && item.size === product.size)
        );

        if (!productInCart) {
          set({ cart: [...cart, product] })
          return;
        }
        // 2. Se que el producto existe por talla... tengo que incrementar
        const updateCartProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity: item.quantity + product.quantity }
          }
          return item;
        });

        set({ cart: updateCartProducts });
      },
      updateProductQuantity: (product: CartProduct, quantity: number) => {
         const { cart } = get();   
        
        const updatedCartProducts =  cart.map( item => {
            if( item.id === product.id && item.size === product.size ){
              return { ...item, quantity: quantity }
            }
            return item;
          });
            set({ cart: updatedCartProducts });
      },
      removeProduct: ( product: CartProduct ) => {
       const { cart } = get();
      const updatedCartProducts = cart.filter( item => (item.id !== product.id || item.size !== product.size  ));
       set({ cart: updatedCartProducts });
          
      },
    })
    ,
    {
      name: 'shopping-cart',
    }
  )

)