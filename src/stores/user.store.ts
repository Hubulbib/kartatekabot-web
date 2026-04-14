import { makeAutoObservable } from "mobx";
import { UserService } from "../services/user.service";
import type {
  BusinessRequest,
  Cafe,
  City,
  Criteria,
  Review,
  User,
} from "../entities/types";
import { CityService } from "../services/city.service";
import { CriteriaService } from "../services/criteria.service";

/**
 * Хранилище пользовательских данных клиентского приложения.
 *
 * Отвечает за:
 * - загрузку и кэширование профиля пользователя;
 * - получение справочных данных (города, критерии);
 * - операции редактирования профиля и пользовательских сущностей.
 */
export class UserStore {
  user: User | null = null;
  cities: City[] = [];
  criteriaList: Criteria[] = [];
  userReviews: (Review & { cafe: Cafe })[] = [];
  businessRequestList: BusinessRequest[] = [];

  isUserLoading: boolean = false;
  isCriteriaLoading: boolean = false;

  constructor() {
    makeAutoObservable(this, {}, { deep: true });
  }

  /** Обновляет состояние профиля пользователя в store. */
  setUser(user: User) {
    this.user = user;
  }

  setIsUserLoading(isLoading: boolean) {
    this.isUserLoading = isLoading;
  }

  setIsCriteriaLoading(isLoading: boolean) {
    this.isCriteriaLoading = isLoading;
  }

  setCityList(cities: City[]) {
    this.cities = cities;
  }

  setCriteriaList(criteriaList: Criteria[]) {
    this.criteriaList = criteriaList;
  }

  setUserReviews(reviews: (Review & { cafe: Cafe })[]) {
    this.userReviews = reviews;
  }

  setBusinessRequestList(businessRequestList: BusinessRequest[]) {
    this.businessRequestList = businessRequestList;
  }

  /**
   * Загружает профиль текущего пользователя.
   * Использует флаг isUserLoading для индикации состояния запроса в UI.
   */
  getUser = async () => {
    this.setIsUserLoading(true);
    try {
      const userData: User = (await UserService.getUserData()).data.data;
      this.setUser(userData);
    } catch (err) {
      throw err;
    } finally {
      this.setIsUserLoading(false);
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

  /**
   * Получает список критериев для оценки заведений.
   * Используется при формировании отзыва и пользовательских предпочтений.
   */
  getCriteriaList = async () => {
    this.setIsCriteriaLoading(true);
    try {
      const criteriaList: Criteria[] = (await CriteriaService.getCriteriaList())
        .data.data;
      this.setCriteriaList(criteriaList);
    } catch (err) {
      throw err;
    } finally {
      this.setIsCriteriaLoading(false);
    }
  };

  /** Загружает список отзывов, созданных текущим пользователем. */
  getUserReviews = async () => {
    this.setIsUserLoading(true);
    try {
      const reviews: (Review & { cafe: Cafe })[] = (
        await UserService.getUserReviews()
      ).data.data;
      this.setUserReviews(reviews);
    } catch (err) {
      throw err;
    } finally {
      this.setIsUserLoading(false);
    }
  };

  /** Загружает список заявок пользователя на подтверждение бизнеса. */
  getBusinessRequestList = async () => {
    this.setIsUserLoading(true);
    try {
      const businessRequestList: BusinessRequest[] = (
        await UserService.getBusinessRequests()
      ).data.data;
      this.setBusinessRequestList(businessRequestList);
    } catch (err) {
      throw err;
    } finally {
      this.setIsUserLoading(false);
    }
  };

  /**
   * Создает заявку на подтверждение принадлежности заведения владельцу.
   * @param body Минимальный набор реквизитов для идентификации заведения.
   */
  createBusinessRequest = async (
    body: Pick<BusinessRequest, "cafeName" | "cafeUsername" | "socialNetwork">
  ) => {
    this.setIsUserLoading(true);
    try {
      // const businessRequest: BusinessRequest =
      (await UserService.createBusinessRequest(body)).data.data;
    } catch (err) {
      throw err;
    } finally {
      this.setIsUserLoading(false);
    }
  };
}
