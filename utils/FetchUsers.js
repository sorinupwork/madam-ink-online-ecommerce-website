import { GraphQLClient, gql } from 'graphql-request';
import { useUser } from '@auth0/nextjs-auth0';
import { useEffect } from 'react';

const graphcms = new GraphQLClient(process.env.NEXT_PUBLIC_HYGRAPH_API, {
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_HYGRAPH_TOKEN}`,
  },
});

const GetCustomerByEmail = gql`
  query GetUserByEmail($email: String) {
    customers: customers(where: { email: $email }, stage: DRAFT) {
      id
      email
    }
  }
`;

const CreateCustomerByEmail = gql`
  mutation CreateCustomerByEmail($email: String) {
    newUser: createCustomer(data: { email: $email }) {
      id
      email
    }
  }
`;

export default function FetchUsers() {
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      const checkUsers = async () => {
        const existingUser = await graphcms.request(GetCustomerByEmail, {
          email: user.email,
        });
        const existingUserLength = existingUser.customers.length;

        if (existingUserLength === 0) {
          await graphcms.request(CreateCustomerByEmail, {
            email: user.email,
          });
        }
      };
      checkUsers();
    }
  }, [user]);
}
