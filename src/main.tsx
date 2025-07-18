import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { initTGMiniApp } from "./tma-init.ts";
import { Context } from "./context/context.ts";
import { CartStore } from "./stores/cart.store.ts";
import { CatalogStore } from "./stores/catalog.store.ts";
import { OrderStore } from "./stores/order.store.ts";
import { ProductStore } from "./stores/product.store.ts";
import { UserStore } from "./stores/user.store.ts";

import "@telegram-apps/telegram-ui/dist/styles.css";
import { AppRoot } from "@telegram-apps/telegram-ui";

initTGMiniApp(!!import.meta.env.VITE_DEBUG);

const cartStore = new CartStore();
const catalogStore = new CatalogStore();
const orderStore = new OrderStore();
const productStore = new ProductStore();
const userStore = new UserStore();

createRoot(document.getElementById("root")!).render(
  <AppRoot>
    <Context.Provider
      value={{ cartStore, catalogStore, orderStore, productStore, userStore }}
    >
      <App />
    </Context.Provider>
  </AppRoot>
);
