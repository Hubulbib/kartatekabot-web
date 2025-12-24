import { createContext } from "react";
import { CafeStore } from "../stores/cafe.store";
import { UserStore } from "../stores/user.store";
import { RatingeStore } from "../stores/rating,store";
import { PostStore } from "../stores/post.store";
import { PromotionStore } from "../stores/promotion.store";
import { ReportStore } from "../stores/report.store";

interface IContext {
  cafeStore: CafeStore;
  userStore: UserStore;
  ratingStore: RatingeStore;
  postStore: PostStore;
  promotionStore: PromotionStore;
  reportStore: ReportStore;
}

export const Context = createContext<IContext>({
  cafeStore: new CafeStore(),
  userStore: new UserStore(),
  ratingStore: new RatingeStore(),
  postStore: new PostStore(),
  promotionStore: new PromotionStore(),
  reportStore: new ReportStore(),
});
