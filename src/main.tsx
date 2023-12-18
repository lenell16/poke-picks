import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { store } from "./store/index.ts";
import PokemonList from "./pages/PokemonList.tsx";

import "./index.css";
import PokemanDetails from "./pages/PokemonDetails.tsx";
import SearchHistory from "./pages/SearchHistory.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PokemonList />,
  },
  {
    path: "/search-history",
    element: <SearchHistory />,
  },
  {
    path: "/:pokemon",
    element: <PokemanDetails />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
