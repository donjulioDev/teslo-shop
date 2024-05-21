'use server';

import { auth } from "@/src/auth.config";
import { Address, Size } from "@/src/interfaces";
import prisma from "@/src/lib/prisma";

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: Size;
}

export const placeOrder = async (productIds: ProductToOrder[], address: Address) => {

  const session = await auth();
  const userId = session?.user.id;

  // Verificar sesión de usuario
  if (!userId) {
    return {
      ok: false,
      message: 'No hay sesión de usuario'
    }
  }
  //Obtener la informaciòn de los productos
  // Nota: recuerden que podemos llevar 2+ productos con el mismo id
  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds.map((p) => p.productId),
      },
    },
  });

  // Calcular los montos// Encabezado
  // count = contador actual
  // p = producto
  const itemsInOrders = productIds.reduce((count, p) => count + p.quantity, 0); //Total de elementos

  //Los totales de tax, subtotal y total
  const { subTotal, tax, total } = productIds.reduce(
    (totals, item) => {

    const productQuantity = item.quantity;
      
    const product = products.find((product) => product.id === item.productId);
    
    if (!product) throw new Error(`${item.productId} no existe - 500`);

    const subTotal = product.price * productQuantity;

    totals.subTotal += subTotal;
    totals.tax += subTotal * 0.15;
    totals.total += subTotal * 1.15;

    //Todo: Reapar Error
    return totals;
  }, { subTotal: 0, tax: 0, total: 0 })

  // Crear la transaccion de base de datos, tx = transaccion
  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
   // 1. Actualizar el stock 
      const updatedProductsPromise = products.map(async (product) => {
        // Acomular los valores
        const productQuantity = productIds.filter(
          p => p.productId === product.id
        ).reduce((acc, item) => item.quantity + acc, 0);

        if (productQuantity === 0) {
          throw new Error(`${product.id} no tiene la cantidad definida`)
        }
        return tx.product.update({
          where: { id: product.id },
          data: {
            //inStock: product.inStock - productQuantity // No hacer!
            // Hacer inStock basado en el valor actual a el momento de hacer query o transacción     
            inStock: {
              decrement: productQuantity
            }
          }
        })
      });

      const updateProducts = await Promise.all(updatedProductsPromise);

      // Verificar valores negativos en las existencias = no hay stock
      updateProducts.forEach(product => {
        if (product.inStock < 0) {
          throw new Error(`${product.title} no tiene el inventario suficiente `)
        }
      })


      // 2. Crear la orden  - Encabezado - Detalles
      const order = await tx.order.create({
        data: {
          userId: userId,
          itemsInOrder: itemsInOrders,
          subTotal: subTotal,
          tax: tax,
          total: total,

          OrderItems: {
            createMany: {
              data: productIds.map(p => ({
                quantity: p.quantity,
                size: p.size,
                productId: p.productId,
                price: products.find(product => product.id === p.productId)?.price ?? 0
              }))
            }
          }
        }
      });
      //todo: hasta aqui, se guarda la base de datos correctamente
      // Validar, si el price es cero, entonces, lanzar un error
      // 3. Crear la direccion de la orden

      const { country, ...restAddress } = address;

      const orderAddress = await tx.orderAddress.create({
        data: {
          //...restAddress,
          firstName: address.firstName,
          lastName: address.lastName,
          address: address.address,
          address2: address.address2,
          postalCode: address.postalCode,
          phone: address.phone,
          city: address.city,
          countryId: country,
          orderId: order.id,
        }
      });

      return {
        updateProducts: updateProducts,
        order: order,
        orderAddress: orderAddress,
      };
    });
return {
  ok: true,
  order: prismaTx.order,
  prismaTx: prismaTx
}

  } catch (error: any) {
    return {
      ok: false,
      message: error?.message
    }
  }


}