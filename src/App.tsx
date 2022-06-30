import { ApolloProvider } from "@apollo/client";
import React from "react";
import { Router } from "./router";
import client from "./lib/apollo";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <React.Fragment>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </ApolloProvider>
    </React.Fragment>
  );
}

export default App;
