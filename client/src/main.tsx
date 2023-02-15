import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  from,
  InMemoryCache,
  split,
} from "@apollo/client";
import { ThemeProvider } from "./contexts/ThemeContext";
import { setContext } from "@apollo/client/link/context";
import { Provider } from "react-redux";
import { store } from "./store";
import { API } from "./constants/api";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { createUploadLink } from "apollo-upload-client";

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
  uri: `http://${API}/graphql`,
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: `ws://${API}/graphql`,
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

const client = new ApolloClient({
  link: from([authLink, splitLink]),
  cache: new InMemoryCache({
    addTypename: false,
  }),
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </ApolloProvider>
  </Provider>
);
