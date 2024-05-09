import React, { useState, useEffect } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

import { useProductContext } from '../../state/context/productContext';
import StockManager from '../../utils/StockManager';

const PayPalCheckoutButton = ({ cartAmount, cart }) => {
  const { clearCart } = useProductContext();
  const [paymentOk, setPaymentOk] = useState('');
  const [updateStock, setUpdateStock] = useState(false);

  useEffect(() => {
    if (paymentOk.length > 1) {
      clearCart();
    }
  }, [paymentOk]);

  useEffect(() => {
    if (updateStock) {
      StockManager(cart);
    }
  }, [updateStock]);

  return (
    <>
      <PayPalScriptProvider
        options={{
          'client-id': `${process.env.NEXT_PUBLIC_REACT_APP_PAYPAL_CLIENT_ID}`,
        }}
      >
        <div>
          <PayPalButtons
            style={{ color: 'blue' }}
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: cartAmount,
                    },
                  },
                ],
              });
            }}
            onApprove={(data, actions) => {
              return actions.order
                .capture()
                .then(setUpdateStock(true))
                .then((details) => {
                  const name = details.payer.name.given_name;
                  setPaymentOk(`Thank you ${name}, the transaction completed.`);
                });
            }}
          />
        </div>
      </PayPalScriptProvider>
      <div style={{ textAlign: 'center' }}>
        <h3 style={{ color: '#19A695', marginBottom: '2.5rem' }}>
          {paymentOk}
        </h3>
      </div>
    </>
  );
};

export default PayPalCheckoutButton;
