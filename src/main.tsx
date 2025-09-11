import { createRoot } from "react-dom/client";
import "./index.css";
import "rc-slider/assets/index.css";
import App from "./App.tsx";
import { initTGMiniApp } from "./tma-init.ts";
import { Context } from "./context/context.ts";
import { CafeStore } from "./stores/cafe.store.ts";
import { UserStore } from "./stores/user.store.ts";
import { RatingeStore } from "./stores/rating,store.ts";

initTGMiniApp(!!import.meta.env.VITE_DEBUG);

const cafeStore = new CafeStore();
const userStore = new UserStore();
const ratingStore = new RatingeStore();

createRoot(document.getElementById("root")!).render(
  <Context.Provider value={{ cafeStore, userStore, ratingStore }}>
    <App />
  </Context.Provider>
);
