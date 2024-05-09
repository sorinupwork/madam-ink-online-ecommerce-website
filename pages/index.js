import { gql, GraphQLClient } from 'graphql-request';
import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';

import MenuList from '../components/menuList/MenuList';
import ProductCard from '../components/ProductCard';
import TopBar from '../components/productSection/TopBar';
import FetchUsers from '../utils/FetchUsers';

const Home = ({ data }) => {
  FetchUsers();
  const topBarTitle = 'New & Promo products';

  const productsArr = Object.values(data);

  let myItems = [];
  productsArr.map((items) => items.map((item) => myItems.push(item)));

  return (
    <>
      <Head>
        <title>Madam Ink Online</title>
        <meta name='title' content='Madam Ink Online' />
        <meta
          name='description'
          content='At our sublimation small business, we specialize in creating personalized and customized products using the sublimation printing technique. With our cutting-edge technology and expertise, we bring your ideas to life on a wide range of items, from apparel and accessories to promotional products and home decor.'
        />

        <meta property='og:type' content='website' />
        <meta property='og:url' content='https://ecommerce-pet.vercel.app/' />
        <meta property='og:title' content='Madam Ink Online' />
        <meta
          property='og:description'
          content='At our sublimation small business, we specialize in creating personalized and customized products using the sublimation printing technique. With our cutting-edge technology and expertise, we bring your ideas to life on a wide range of items, from apparel and accessories to promotional products and home decor.'
        />
        <meta
          property='og:image'
          content='https://i.ibb.co/Lry3hMk/download.png'
        />

        <meta property='twitter:card' content='summary_large_image' />
        <meta
          property='twitter:url'
          content='https://ecommerce-pet.vercel.app/'
        />
        <meta property='twitter:title' content='Madam Ink Online' />
        <meta
          property='twitter:description'
          content='At our sublimation small business, we specialize in creating personalized and customized products using the sublimation printing technique. With our cutting-edge technology and expertise, we bring your ideas to life on a wide range of items, from apparel and accessories to promotional products and home decor.'
        />
        <meta
          property='twitter:image'
          content='https://i.ibb.co/Lry3hMk/download.png'
        />
      </Head>

      <HomeStyled>
        <div className='menu'>
          <MenuList />
        </div>

        <div className='mainProductSection'>
          <TopBar title={topBarTitle} />
          <div className='productCardsLayout'>
            {myItems.map((item) => (
              <Link key={item.id} href={`/products/${item.slug}`}>
                <ProductCard item={item} />
              </Link>
            ))}
          </div>
        </div>
      </HomeStyled>
    </>
  );
};

export default Home;

const hygraph = new GraphQLClient(process.env.HYGRAPH_API, {
  headers: {
    Authorization: `Bearer ${process.env.HYGRAPH_TOKEN}`,
  },
});

const MyQuery = gql`
  {
    phone_Cases(
      where: { OR: [{ isNewProduct: true }, { onPromotion: true }] }
    ) {
      id
      discount
      description
      rawDescription {
        raw
      }
      price
      onPromotion
      onDiscount
      isNewProduct
      images {
        url
      }
      slug
      title
      stock
    }
    tShirts(where: { OR: [{ isNewProduct: true }, { onPromotion: true }] }) {
      id
      discount
      description
      rawDescription {
        raw
      }
      price
      onPromotion
      onDiscount
      isNewProduct
      images {
        url
      }
      slug
      title
      stock
    }
    cups(where: { OR: [{ isNewProduct: true }, { onPromotion: true }] }) {
      id
      discount
      description
      rawDescription {
        raw
      }
      price
      onPromotion
      onDiscount
      isNewProduct
      images {
        url
      }
      slug
      title
      stock
    }
    clocks(where: { OR: [{ isNewProduct: true }, { onPromotion: true }] }) {
      id
      discount
      description
      rawDescription {
        raw
      }
      price
      onPromotion
      onDiscount
      isNewProduct
      images {
        url
      }
      slug
      title
      stock
    }
    plates(where: { OR: [{ isNewProduct: true }, { onPromotion: true }] }) {
      id
      discount
      description
      rawDescription {
        raw
      }
      price
      onPromotion
      onDiscount
      isNewProduct
      images {
        url
      }
      slug
      title
      stock
    }
    tablet_Cases(
      where: { OR: [{ isNewProduct: true }, { onPromotion: true }] }
    ) {
      id
      discount
      description
      rawDescription {
        raw
      }
      price
      onPromotion
      onDiscount
      isNewProduct
      images {
        url
      }
      slug
      title
      stock
    }
  }
`;

export async function getServerSideProps() {
  const data = await hygraph.request(MyQuery);
  return {
    props: { data },
  };
}

const HomeStyled = styled.div`
  display: flex;
  gap: 5%;
  padding: 0 10%;
  @media (max-width: 1440px) {
    padding: 0 5%;
  }
  @media (max-width: 768px) {
    gap: 0;
  }
  .mainProductSection {
    width: 100%;

    .productCardsLayout {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      justify-content: space-around;
    }
  }
`;
