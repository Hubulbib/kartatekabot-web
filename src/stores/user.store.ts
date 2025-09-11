import { makeAutoObservable } from "mobx";
import { UserService } from "../services/user.service";
import type { City, Criteria, User } from "../entities/types";
import { CityService } from "../services/city.service";

export class UserStore {
  user: User | null = null;
  cities: City[] = [];

  constructor() {
    makeAutoObservable(this, {}, { deep: true });
  }

  setUser(user: User) {
    this.user = user;
  }

  setCityList(cities: City[]) {
    this.cities = cities;
  }

  getUser = async () => {
    try {
      const userData: User = (await UserService.getUserData()).data.data;
      this.setUser(userData);
    } catch (err) {
      throw err;
    }
  };

  editUserCriteria = async (criteria: Criteria) => {
    try {
      const updatedUser: User = (await UserService.editUserCriteria(criteria))
        .data.data;
      this.setUser(updatedUser);
    } catch (err) {
      throw err;
    }
  };

  editUserCity = async (city: string) => {
    try {
      const updatedUser: User = (await UserService.editUserCity(city)).data
        .data;
      this.setUser(updatedUser);
    } catch (err) {
      throw err;
    }
  };

  getCityList = async () => {
    try {
      const cities: City[] = (await CityService.getCityList()).data.data;
      this.setCityList(cities);
    } catch (err) {
      throw err;
    }
  };
}
