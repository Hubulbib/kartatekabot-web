import { createRoot } from "react-dom/client";
import "./index.css";
import "rc-slider/assets/index.css";
import App from "./App.tsx";
import { initTGMiniApp } from "./tma-init.ts";
import { Context } from "./context/index.ts";
import { CafeStore } from "./stores/cafe.store.ts";
import { UserStore } from "./stores/user.store.ts";
import { RatingeStore } from "./stores/rating,store.ts";
import { PostStore } from "./stores/post.store.ts";
import { PromotionStore } from "./stores/promotion.store.ts";
import { ReportStore } from "./stores/report.store.ts";

initTGMiniApp(!!import.meta.env.VITE_DEBUG);

const cafeStore = new CafeStore();
const userStore = new UserStore();
const ratingStore = new RatingeStore();
const postStore = new PostStore();
const promotionStore = new PromotionStore();
const reportStore = new ReportStore();

createRoot(document.getElementById("root")!).render(
  <Context.Provider
    value={{
      cafeStore,
      userStore,
      ratingStore,
      postStore,
      promotionStore,
      reportStore,
    }}
  >
    <App />
  </Context.Provider>
);
