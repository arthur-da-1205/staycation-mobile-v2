import { ApolloCache } from "@apollo/client/cache";
import { ApolloClient, ApolloLink, gql, HttpLink, InMemoryCache } from "@apollo/client/core";
import { ApolloQueryResult, DefaultContext, OperationVariables } from "@apollo/client/core/types";
import { MutationOptions, QueryOptions } from "@apollo/client/core/watchQueryOptions";
import { setContext } from "@apollo/client/link/context";
import { FetchResult } from "@apollo/client/link/core";
import AsyncStorage from "@react-native-async-storage/async-storage";

export { ApolloCache, gql };

export type { ApolloQueryResult, DefaultContext, FetchResult, MutationOptions, OperationVariables, QueryOptions };

const httpLink = new HttpLink({
  // uri: process.env.GQL_URL,
  uri: "https://a78e-66-96-225-132.ngrok-free.app/graphql", // TODO: should get value from .env
  fetchOptions: {
    reactNative: { textSreaming: true },
  },
});

// ERROR DEBUG
// const errorLink = onError(({ graphQLErrors, networkError }) => {
//   if (!environment.production) {
//     if (graphQLErrors)
//       graphQLErrors.forEach(({ message, locations, path }) =>
//         console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
//       );
//
//     if (networkError) {
//       console.log(`[Network error]: ${networkError}`);
//     }
//   }
// });

const getSessionToken = () => {
  return AsyncStorage.getItem("user_token");
};

const authLink = setContext(
  (request) =>
    new Promise((success, fail) => {
      getSessionToken().then((token) => success({ headers: { authorization: `Bearer ${token}` } }));
    })
);

export const apollo = new ApolloClient({
  link: ApolloLink.from([authLink, httpLink]),
  cache: new InMemoryCache(),
});
