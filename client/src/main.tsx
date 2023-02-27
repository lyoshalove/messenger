import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { ThemeProvider, UserProvider } from "@/contexts";
import { client } from "@/features/helpers";
import { Compose } from "./components/Compose";

createRoot(document.getElementById("root") as HTMLElement).render(
  <ApolloProvider client={client}>
    <Compose components={[BrowserRouter, UserProvider, ThemeProvider]}>
      <App />
    </Compose>
  </ApolloProvider>
);
