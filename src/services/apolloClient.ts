import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import JwtManager from '~/utils/jwt';

const httpLink = createHttpLink({
  uri: `${import.meta.env.VITE_BASE_URL_SERVER}/graphql`,
  credentials: 'include',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from JwtManager if it exists
  const token = JwtManager.getToken();
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
