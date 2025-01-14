import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

import { useProductContext } from '../../state/context/productContext';

function insertDecimal(num) {
  return (num / 100).toFixed(2);
}

const CartComponent = ({ item }) => {
  const { removeItem, decreaseNum, increaseNum } = useProductContext();

  const fullPrice = item.price * 100;
  const price = item.discount
    ? insertDecimal(fullPrice - fullPrice * (item.discount / 100))
    : insertDecimal(fullPrice);

  const decreaseHandler = () => {
    if (item.numItems > 1) {
      decreaseNum(item);
    } else {
      removeItem(item.id);
    }
  };

  return (
    <StyledCartItem>
      <div className="cartWrapper">
        <div className="imgAndTitle">
          <Link href={`/cart/${item.id}`} passHref>
            <div className="imgWrapper">
              <Image
                src={item.mainImgSrc}
                alt={item.title}
                width={80}
                height={80}
              />
            </div>
          </Link>
        </div>
        <div className="price">
          <p>${price}</p>
        </div>
        <div className="quantity">
          <div className="toggleBTNs">
            <button className="decrease" onClick={() => decreaseHandler(item)}>
              <Image
                src={'/remove.svg'}
                alt={'decrease'}
                width={14}
                height={14}
              />
            </button>
            <p>{item.numItems}</p>
            <button className="increase" onClick={() => increaseNum(item)}>
              <Image src={'/add.svg'} alt={'increase'} width={14} height={14} />
            </button>
          </div>
        </div>
        <div className="subtotal">
          <p>
            $
            {insertDecimal(
              fullPrice * item.numItems -
                fullPrice * item.numItems * (item.discount / 100)
            )}
            <span className="clearBTN" onClick={() => removeItem(item.id)}>
              <Image
                src={'/deleteItem.png'}
                alt={'remove item from cart'}
                width={14}
                height={14}
              />
            </span>
          </p>
        </div>
      </div>
    </StyledCartItem>
  );
};

export default CartComponent;

const StyledCartItem = styled.div`
  margin: 0 5%;
  @media (max-width: 480px) {
    margin: 0;
    :last-child {
      margin-right: 2%;
    }
  }
  .cartWrapper {
    display: flex;
    align-items: center;
    justify-content: space-around;

    .imgAndTitle {
      flex: 1;
      position: relative;
      cursor: pointer;
      text-align: left;
    }

    .price {
      flex: 1;
      text-align: left;
      padding-left: 4%;
      @media (max-width: 480px) {
        padding-left: 1%;
      }
      @media (max-width: 414px) {
        margin-right: -1.5rem;
      }
    }

    .quantity {
      flex: 1;
      display: flex;
      justify-content: center;
      p {
        padding: 0 0.5rem;
      }
      .toggleBTNs {
        margin-right: 12%;
        display: flex;
        button {
          background-color: white;
          cursor: pointer;
          border: none;
        }
        .decrease {
          margin-top: 5px;
        }
        .increase {
          margin-top: 5px;
        }
      }
    }

    .subtotal {
      display: flex;
      flex: 1;
      justify-content: flex-end;
      .clearBTN {
        margin-left: 15px;
        cursor: pointer;
      }
    }
  }
`;
