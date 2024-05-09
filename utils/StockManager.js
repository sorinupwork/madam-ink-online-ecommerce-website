import { GraphQLClient, gql } from 'graphql-request';

const graphcms = new GraphQLClient(process.env.NEXT_PUBLIC_HYGRAPH_API, {
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_HYGRAPH_TOKEN}`,
  },
});

const GetProductById = gql`
  query GetProductById($id: ID!) {
    phoneCase(where: { id: $id }) {
      id
      stock
    }
    tShirt(where: { id: $id }) {
      id
      stock
    }
    cup(where: { id: $id }) {
      id
      stock
    }
    clock(where: { id: $id }) {
      id
      stock
    }
    plate(where: { id: $id }) {
      id
      stock
    }
    tabletCase(where: { id: $id }) {
      id
      stock
    }
  }
`;

const UpdateProductStock = gql`
  mutation UpdateProductStock($id: ID!, $stock: Int) {
    updatePhoneCase(where: { id: $id }, data: { stock: $stock }) {
      id
      stock
    }
    publishPhoneCase(to: PUBLISHED, where: { id: $id }) {
      id
    }
    updateTShirt(where: { id: $id }, data: { stock: $stock }) {
      id
      stock
    }
    publishTShirt(to: PUBLISHED, where: { id: $id }) {
      id
    }
    updateCup(where: { id: $id }, data: { stock: $stock }) {
      id
      stock
    }
    publishCup(to: PUBLISHED, where: { id: $id }) {
      id
    }
    updateTabletCase(where: { id: $id }, data: { stock: $stock }) {
      id
      stock
    }
    publishTabletCase(to: PUBLISHED, where: { id: $id }) {
      id
    }
    updatePlate(where: { id: $id }, data: { stock: $stock }) {
      id
      stock
    }
    publishPlate(to: PUBLISHED, where: { id: $id }) {
      id
    }
    updateClock(where: { id: $id }, data: { stock: $stock }) {
      id
      stock
    }
    publishClock(to: PUBLISHED, where: { id: $id }) {
      id
    }
  }
`;

const StockManager = (cart) => {
  const checkProducts = async (theID, stockChange) => {
    const itemFromCart = await graphcms.request(GetProductById, {
      id: theID,
    });

    const productsArray = await Object.values(itemFromCart);

    productsArray.map((item) => {
      if (item && item.id === theID) {
        const stock = item.stock - stockChange;
        graphcms.request(UpdateProductStock, {
          id: theID,
          stock: stock,
        });
      }
    });
  };

  cart &&
    cart.map((item, idx) => {
      const theID = item.id;
      const stockChange = item.numItems;
      checkProducts(theID, stockChange);
    });
};

export default StockManager;
