import { createContext } from "react";
import { CafeStore } from "../stores/cafe.store";
import { UserStore } from "../stores/user.store";
import { RatingeStore } from "../stores/rating,store";

interface IContext {
  cafeStore: CafeStore;
  userStore: UserStore;
  ratingStore: RatingeStore;
}

export const Context = createContext<IContext>({
  cafeStore: new CafeStore(),
  userStore: new UserStore(),
  ratingStore: new RatingeStore(),
});
