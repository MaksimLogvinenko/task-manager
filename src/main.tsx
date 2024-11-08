import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { store } from "@/redux/store.ts";
import { Provider } from "react-redux";
//COMPONENTS
import App from "./App.tsx";
//STYLES
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
