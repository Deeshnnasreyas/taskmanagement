import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import Router from "./routes/Router";
import { store } from "./redux/store.js";
import { DarkModeProvider } from "./context/DarkModeContext";
import "./index.css";

//  Create a QueryClient instance
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <DarkModeProvider>
        <RouterProvider router={Router} />
      </DarkModeProvider>
    </Provider>
  </QueryClientProvider>
);
