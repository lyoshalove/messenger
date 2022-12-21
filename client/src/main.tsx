import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  from,
  InMemoryCache,
} from "@apollo/client";
import { ThemeProvider } from "./contexts/ThemeContext";
import { setContext } from "@apollo/client/link/context";
import { Provider } from "react-redux";
import { store } from "./store";

const httpLink = createHttpLink({
  uri: "http://localhost:3000/graphql",
});

const authLink = setContext(async (_, { headers }) => {
  const userToken = localStorage.getItem("token");

  return {
    headers: {
      ...headers,
      authorization: `Bearer ${userToken}`,
    },
  };
});

const client = new ApolloClient({
  link: from([authLink, httpLink]),
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
