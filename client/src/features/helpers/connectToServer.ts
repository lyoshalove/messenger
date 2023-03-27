import { ApolloClient, from, InMemoryCache, split } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { createUploadLink } from "apollo-upload-client";
import { createClient } from "graphql-ws";
import { API } from "@/features/constants";

const authLink = setContext(async (_, { headers }) => {
  const userToken = localStorage.getItem("token");

  return {
    headers: {
      ...headers,
      authorization: userToken ? `Bearer ${userToken}` : "",
    },
  };
});

const httpLink = createUploadLink({
  uri: `https://${API}/graphql`,
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: `wss://${API}`,
    shouldRetry(errOrCloseEvent) {
      return true;
    },
    connectionParams: () => {
      const userToken = localStorage.getItem("token");

      if (!userToken) {
        return {};
      }

      return {
        isWebSocket: true,
        authorization: `Bearer ${localStorage.getItem("token")}`,
      };
    },
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  authLink.concat(httpLink)
);

export const client = new ApolloClient({
  link: from([authLink, splitLink]),
  cache: new InMemoryCache({
    addTypename: false,
  }),
});
