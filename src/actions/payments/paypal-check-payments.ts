'use server'

import { PayPalOrderStatusResponse } from "@/src/interfaces";
import prisma from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";



export const paypalCheckPayments = async (paypalTransactionId: string) => {
  const authToken = await getPayPalBearerToken();

  if (!authToken) {
    return {
      ok: false,
      message: 'No se pudo obttener el token de verificación'
    }
   };

    const resp = await verifyPayPalPayment( paypalTransactionId, authToken );
if( !resp ){
  return {
    ok: false,
    message: 'Error al verificar el pago'
  }
}
      const { status, purchase_units } = resp;
      const { invoice_id: orderId  } = purchase_units[0];   //Todo; invoice ID

  if( status !== 'COMPLETED'){
    return {
      ok: false,
      message:'Aun no se a pagado en PayPal'
    }
  }
        // Todo: realizar la actualizacion en nuestra base de datos
  try {
           console.log( 'desde: paypal-check-payments line35' )
    console.log({ status, purchase_units });
    await prisma.order.update({
      where: { id: orderId }, // Todo? mantener el id
      data: {
        isPaid: true,
        paidAt: new Date()
      }
    })

    revalidatePath(`/orders/${ orderId }`)
    return {
      ok: true
    }

  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: '500 - El pago no se pudo realizar'
    }
    
  }


      //const { } = purchase_units[0]; // todo: invoice ID
      console.log(purchase_units[0].payments);
      
      
};


const getPayPalBearerToken = async (): Promise<string | null> => {

  const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
  const oauth2Url = process.env.PAYPAL_OAUTH_URL ?? '';


  const base64Token = Buffer.from(
    `${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`,
    'utf-8'
  ).toString('base64');

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append("Authorization",
    `Basic ${base64Token}`);

  const urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "client_credentials");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
  };

  try {
    const result = await fetch(oauth2Url, requestOptions).then(r => r.json()); // r = respuesta
    return result.access_token;
  } catch (error) {
    console.log(error);
    return null;
  }

}

const verifyPayPalPayment = async (paypalTransactionId: string, bearerToken: string
  ):Promise<PayPalOrderStatusResponse|null> => {

    const paypaOrderlUrl = `${ process.env.PAYPAL_ORDERS_URL }/${ paypalTransactionId }`

  const myHeaders = new Headers();
  myHeaders.append("Authorization", 
  `Bearer ${ bearerToken }`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };
      try {
        const resp = await fetch( paypaOrderlUrl, requestOptions ).then( r => r.json() );
         return resp; 
      } catch (error) {
        console.log(error);
        return null;
      }
}