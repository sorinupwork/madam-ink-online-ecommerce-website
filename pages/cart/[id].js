import { gql, GraphQLClient } from 'graphql-request';
import { RichText } from '@graphcms/rich-text-react-renderer';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';

import MenuList from '../../components/menuList/MenuList';
import TopBar from '../../components/productSection/TopBar';
import useGetItemDetails from '../../utils/useGetItemDetails';
import { useProductContext } from '../../state/context/productContext';

const ProductByID = ({ product }) => {
  const { addToCart } = useProductContext();

  const productArray = Object.values(product);
  let item = {};
  productArray.map((items) => items.map((i) => (item = i)));

  const {
    isNewProduct,
    isPromoProduct,
    price,
    discount,
    id,
    discountPrice,
    imgsrc,
    mainImgSrc,
    title,
    numItems,
    stock,
    description,
    rawDescription,
  } = useGetItemDetails(item);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='description' content='Cart products details' />
      </Head>
      <ProductStyled>
        <div className='menuSection'>
          <MenuList />
        </div>

        <div className='productSection'>
          <div className='productTitle'>
            <TopBar title={title} />
          </div>
          <div className='productInfo'>
            <div className='productDetails'>
              <div className='product'>
                <div className='subtitle'>
                  <h3>{description}</h3>
                </div>

                <div className='allDescription'>
                  <div className='productDescriptionTitle'>
                    <p>Product Description: </p>
                  </div>

                  <div className='productDescription'>
                    <RichText content={rawDescription} />
                  </div>
                </div>
              </div>
            </div>

            <div className='productPreview'>
              <div className='previewWrapper'>
                <div className='imageWrapper'>
                  <div className='promoBanner'>
                    <Image
                      src={imgsrc}
                      alt={'promo-new-product'}
                      width={145}
                      height={90}
                    />
                  </div>
                  <Image
                    src={mainImgSrc}
                    width={478}
                    height={478}
                    alt={title}
                  />
                </div>

                <div className='priceSection'>
                  <div className='prices'>
                    {isPromoProduct ? (
                      <div>
                        <p className='fadedPrice'>
                          Price: ${price} <span>- {discount}% OFF</span>
                        </p>
                        <p className='promoPrice'>
                          Promo price = <span>${discountPrice}</span>
                        </p>
                      </div>
                    ) : isNewProduct ? (
                      <div>
                        <p className='newProduct'>
                          <span>NEW</span> Product
                        </p>
                        <p className='price'>Current price ${price}</p>
                      </div>
                    ) : (
                      <div>
                        <p className='regularProduct'>Regular Product</p>
                        <p className='price'>Current price ${price}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className={`btn ${stock < 1 && 'outOfStock'}`}>
                  <Link
                    href={`${stock > 0 ? '/cart' : '#'}`}
                    legacyBehavior
                    passHref
                  >
                    <button
                      onClick={() =>
                        stock > 0
                          ? addToCart(
                              id,
                              title,
                              stock,
                              price,
                              discount,
                              mainImgSrc,
                              numItems
                            )
                          : ''
                      }
                    >
                      {stock > 0 ? 'Add to Cart' : ' Out of Stock'}
                      <div className='cartIconWrap'>
                        <Image
                          priority
                          src={'/cartIcon-white.svg'}
                          height={18}
                          width={18}
                          alt='cartIcon'
                        />
                      </div>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ProductStyled>
    </>
  );
};

export default ProductByID;

const hygraph = new GraphQLClient(process.env.HYGRAPH_API, {
  headers: {
    Authorization: `Bearer ${process.env.HYGRAPH_TOKEN}`,
  },
});

export async function getServerSideProps(context) {
  const currentSlug = context.params.id;

  const query = gql`
    query ($currentSlug: ID) {
      phone_Cases(where: { id: $currentSlug }) {
        id
        slug
        price
        onPromotion
        onDiscount
        isNewProduct
        discount
        stock
        title
        images {
          url
        }
        description
        rawDescription {
          raw
        }
      }
      tShirts(where: { id: $currentSlug }) {
        id
        slug
        price
        onPromotion
        onDiscount
        isNewProduct
        discount
        stock
        title
        images {
          url
        }
        description
        rawDescription {
          raw
        }
      }
      cups(where: { id: $currentSlug }) {
        id
        slug
        price
        onPromotion
        onDiscount
        isNewProduct
        discount
        stock
        title
        images {
          url
        }
        description
        rawDescription {
          raw
        }
      }
      clocks(where: { id: $currentSlug }) {
        id
        slug
        price
        onPromotion
        onDiscount
        isNewProduct
        discount
        stock
        title
        images {
          url
        }
        description
        rawDescription {
          raw
        }
      }
      tablet_Cases(where: { id: $currentSlug }) {
        id
        slug
        price
        onPromotion
        onDiscount
        isNewProduct
        discount
        stock
        title
        images {
          url
        }
        description
        rawDescription {
          raw
        }
      }
      plates(where: { id: $currentSlug }) {
        id
        slug
        price
        onPromotion
        onDiscount
        isNewProduct
        discount
        stock
        title
        images {
          url
        }
        description
        rawDescription {
          raw
        }
      }
    }
  `;

  const variables = {
    currentSlug,
  };
  const product = await hygraph.request(query, variables);

  return {
    props: {
      product: product,
    },
  };
}

const ProductStyled = styled.div`
  display: flex;
  gap: 5%;
  padding: 0 10%;
  @media (max-width: 1440px) {
    padding: 0 5%;
  }
  @media (max-width: 768px) {
    gap: 0;
  }

  .productSection {
    width: 100%;

    .productInfo {
      display: flex;
      gap: 2rem;
      padding: 2% 3%;

      .text-bold {
        font-weight: bold;
      }

      .text-italic {
        font-style: italic;
      }

      .productDetails {
        padding: 0 1rem;

        .subtitle {
          text-align: center;
          padding-bottom: 0.2rem;

          h3 {
            background-color: #e9edf2;
            border: solid 1px #c3ced9;
            padding: 0.3rem 0.4rem;
            border-radius: 4px;
          }
        }

        .productDescriptionTitle {
          text-align: left;

          p {
            font-size: 1.05rem;
            font-weight: bold;
          }
        }

        .allDescription {
          margin: 5%;
        }
      }

      .productPreview {
        padding: 0 1rem;

        .previewWrapper {
          text-align: center;

          .promoBanner {
            position: absolute;
            transform: translate(+20%, +40%);
            z-index: 100;
            width: 8vw;
          }
        }
      }

      .prices {
        font-size: 1.1rem;

        p {
          margin: 0.7rem;
        }

        .fadedPrice {
          color: #7c90a6;

          span {
            color: #cc194c;
            font-size: 1.2rem;
            font-weight: 600;
          }
        }

        .newProduct {
          span {
            color: #cc194c;
            font-size: 1.2rem;
            font-weight: 600;
          }
        }

        .promoPrice {
          span {
            color: #cc194c;
            font-size: 1.2rem;
            font-weight: 600;
          }
        }

        .price {
          span {
            font-size: 1.2rem;
            font-weight: 600;
          }
        }
      }

      .btn {
        padding-top: 0.7rem;

        button {
          display: flex;
          align-items: center;
          margin: auto;
          padding: 0.5rem 2.2rem;

          .cartIconWrap {
            padding-left: 0.5rem;
          }
        }
      }
    }
  }
  @media (max-width: 480px) {
    .productInfo {
      display: flex;
      flex-flow: column;
    }
    .productPreview {
      order: 1;
    }
    .productDetails {
      order: 2;
    }
  }
`;
