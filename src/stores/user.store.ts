import { makeAutoObservable } from "mobx";
import { UserService } from "../services/user.service";

export class UserStore {
  isSubscriptionActive: boolean = false;

  constructor() {
    makeAutoObservable(this, {});
  }

  setSubscriptionStatus(isActive: boolean) {
    this.isSubscriptionActive = isActive;
  }

  getSubscriptionStatus = async () => {
    try {
      const subscriptionData: { isSubscriptionActive: boolean } = (
        await UserService.getSubscriptionStatus()
      ).data.data;
      this.setSubscriptionStatus(subscriptionData.isSubscriptionActive);
    } catch (err) {
      throw err;
    }
  };
}
