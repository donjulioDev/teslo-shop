'use client';


import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import { CreateOrderData, CreateOrderActions, OnApproveData, OnApproveActions } from '@paypal/paypal-js';
import { paypalCheckPayments, setTransactionId } from '@/src/actions';

  interface Props {
    orderId: string;
    amount:  number;
  }

export const PayPalButton = ({ orderId, amount}: Props) => {

  const [{ isPending }] = usePayPalScriptReducer();

  const rountedAmount = ( Math.round(amount * 100 )) / 100;


  if ( isPending ){
    return (
      <div className='animate-pulse mb-18'>
        <div className="h-12 bg-gray-300 rounded" />
        <div className="h-12 bg-gray-300 rounded mt-2" />
      </div>
    )
  }
    const createOrder = async (data: CreateOrderData, actions: CreateOrderActions): Promise<string>  => {
      
        const transactionId = await actions.order.create({
       //   vault: true,
       purchase_units: [
         {
            invoice_id: orderId,
           amount: {
             currency_code: "USD",
             value: `${ rountedAmount }`
            }
          }
        ],
        intent: 'CAPTURE',
      });

      //Todo: guardad el ID en la orden en la base de datos
      // setTransactionId
   const { ok }  = await setTransactionId( orderId, transactionId ) ;
    if ( !ok ){
  throw new Error('No se pudo actualizar la orden')
}
      
      return transactionId
    }

const onApprove = async( data: OnApproveData, actions: OnApproveActions ) => {
  const details = await actions.order?.capture();
if ( !details ) return;

await paypalCheckPayments( details.id! );

}

  return (
    <div className='relative z-0'>
    <PayPalButtons  
      createOrder={ createOrder }
      onApprove={ onApprove }
      />
      </div>
  )
}
