import { useUser } from '@auth0/nextjs-auth0';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

function insertDecimal(num) {
  return (num / 100).toFixed(2);
}

const CartTotal = ({ total }) => {
  const finalPrice = insertDecimal(total * 100);
  const { user } = useUser();

  return (
    <StyledTotal>
      <div className="totalWrapper">
        <div className="cardWrapper">
          <div className="spacing">
            <div className="subtotal">
              <p>Subtotal: </p>
              <p>${total} </p>
            </div>

            <hr />

            <div className="total">
              <h3>Order Total:</h3>
              <h3>${finalPrice}</h3>
            </div>
          </div>
        </div>

        <div className="checkoutBtn">
          <div className="btn proceed">
            {user && !user.email_verified ? (
              <button>Verify your mail to proceed</button>
            ) : user && user.email_verified ? (
              <Link href={'/checkout'}>
                <button>Proceed to checkout</button>
              </Link>
            ) : (
              <Link href={'/user/login'}>
                <button>Login to proceed</button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </StyledTotal>
  );
};

export default CartTotal;

const StyledTotal = styled.div`
  margin: 1.5rem 0 3rem 0;
  display: flex;
  justify-content: center;

  .totalWrapper {
    width: 18rem;
    .cardWrapper {
      border: 1px solid #7c90a6;
      border-radius: 5px;
      background-color: #d1dfed;
      .spacing {
        margin: 0 10%;
        p {
          margin: 0.2rem 0;
        }

        hr {
          border-top: 1px solid #7c90a6;
          margin-bottom: 0;
        }

        .subtotal {
          display: flex;
          justify-content: space-between;
          margin-top: 0.5rem;
        }
        .shipping {
          display: flex;
          justify-content: space-between;
        }
        .total {
          display: flex;
          justify-content: space-between;
        }
      }
    }
    .proceed {
      margin-top: 0.5rem;
      display: flex;
      a {
        flex-grow: 1;
      }
    }
  }
`;
