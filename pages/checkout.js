import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import Head from 'next/head';

import PayPalCheckoutButton from '../components/cart/PayPalCheckoutButton';
import { useProductContext } from '../state/context/productContext';

const Checkout = () => {
  const { cart } = useProductContext();
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState();
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    setLoading(false);
  }, []);

  let activeUser;
  if (user) {
    activeUser = user.nickname;
    if (!user.email_verified) {
      router.push('/');
    }
  }

  const allItemsSubtotals = [];

  useEffect(() => {
    !loading &&
      cart.length &&
      cart.map((item) => {
        const subtotal = item.discount
          ? item.price * item.numItems -
            item.price * item.numItems * (item.discount / 100)
          : item.price * item.numItems;
        allItemsSubtotals.push(subtotal);
      });

    const initialAmount = 0;
    const allSubtotals = allItemsSubtotals.reduce(
      (previousAmount, currentAmount) => previousAmount + currentAmount,
      initialAmount
    );

    const total = Math.round((allSubtotals + Number.EPSILON) * 100) / 100;

    setAmount(total.toFixed(2));
  }, [loading]);

  return (
    <>
      <Head>
        <title>{'Checkout Page'}</title>
        <meta name="description" content="Checkout Page details" />
      </Head>

      <StyledCheckout>
        <div className="blueBar">
          <h3>Hello {activeUser}</h3>
        </div>
        {!loading && cart.length > 0 ? (
          <h3>Your cart total is ${amount}</h3>
        ) : (
          <h3>Your cart is empty</h3>
        )}

        <div className="paypal-button-container">
          {amount && <PayPalCheckoutButton cartAmount={amount} cart={cart} />}
        </div>
        <div className="testInfo">
          <h4>Example Card Info:</h4>
          <h4>card number: 4032 0387 6122 3662</h4>
          <h4>card valid thru: 11/26</h4>
          <h4>cvc: 293</h4>
        </div>
      </StyledCheckout>
    </>
  );
};

export default Checkout;

const StyledCheckout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10vh;
  .blueBar {
    background-color: #004695;
    width: 30vw;
    min-width: 28rem;
    text-align: center;
    border-radius: 6px 6px 0 0;
    @media (max-width: 480px) {
      width: 100%;
    }
    h3 {
      color: #e9edf2;
      margin: 0;
      padding: 0.42rem 0;
    }
  }
  h3 {
    color: #19a695;
  }
  .paypal-button-container {
    width: 30vw;
    min-width: 28rem;
  }
  .testInfo {
    background-color: #d1dfed;
    border: 1px solid #7c90a6;
    border-radius: 5px;
    padding: 0.5rem 1rem;
    margin: 0.5rem 0 1rem 0;
    h4 {
      margin: 0.2rem;
    }
  }
`;
