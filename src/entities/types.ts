// Перечисления
export enum SocialNetworkType {
  INSTAGRAM = "INSTAGRAM",
  VK = "VK",
  TELEGRAM = "TELEGRAM",
  MAX = "MAX",
}

export enum ReviewStatus {
  APPROVED = "APPROVED",
  MODERATION = "MODERATION",
  REJECTED = "REJECTED",
  BLOCKED = "BLOCKED",
}

export enum UserRole {
  BASIC = "BASIC",
  BUSINESS = "BUSINESS",
  MODERATOR = "MODERATOR",
  ADMIN = "ADMIN",
}

export enum SocialNetworkRequest {
  INSTAGRAM = "INSTAGRAM",
  VK = "VK",
}

export enum ReportType {
  CAFE = "CAFE",
  POST = "POST",
  PROMOTION = "PROMOTION",
  REVIEW = "REVIEW",
}

// Модели
export type SocialNetwork = {
  id: number;
  type: SocialNetworkType;
  link: string;
  cafeInfoId: number;
  cafeInfo: CafeInfo;
};

export type Cafe = {
  id: number;
  name: string;
  description: string;
  avatar: string;
  ownerId?: number | null;
  cityId?: number | null;
  address: string[];
  schedule?: CafeSchedule | null;
  city?: City | null;
  user?: User | null;
  info?: CafeInfo | null;
  bages: CafeBage[];
  reviews: Review[];
  editors: Editor[];
  posts: Post[];
  promotions: Promotion[];
  createdAt: Date;
  updatedAt: Date;
  score?: number;
};

export type CafeInfo = {
  id: number;
  cafeId: number;
  phones: string[];
  email?: string | null;
  cafe: Cafe;
  socialNetworks: SocialNetwork[];
};

export type CafeBage = {
  id: number;
  name: string;
  cafeId: number;
  cafe: Cafe;
};

export type CafeSchedule = {
  id: number;
  cafeId: number;
  scheduleMonday?: string | null;
  scheduleTuesday?: string | null;
  scheduleWednesday?: string | null;
  scheduleThursday?: string | null;
  scheduleFriday?: string | null;
  scheduleSaturday?: string | null;
  scheduleSunday?: string | null;
  scheduleNotes?: string | null;
  cafe: Cafe;
};

export type Editor = {
  id: number;
  userId?: number | null;
  cafeId: number;
  user?: User | null;
  cafe: Cafe;
};

export type Post = {
  id: number;
  title: string;
  text: string;
  cafeId?: number | null;
  cafe?: Cafe | null;
  media: string[];
  createdAt: Date;
  updatedAt: Date;
};

export type Promotion = {
  id: number;
  title: string;
  description: string;
  dateStart: Date;
  dateEnd: Date;
  condition?: string | null;
  media: string[];
  cafeId?: number | null;
  cafe?: Cafe | null;
  createdAt: Date;
  updatedAt: Date;
};

export type City = {
  id: number;
  name: string;
  cafe: Cafe[];
  user: User[];
};

export type Review = {
  id: number;
  text: string;
  createdAt: Date;
  updatedAt: Date;
  updateCount: number;
  status: ReviewStatus;
  userId?: number | null;
  cafeId?: number | null;
  criteria: CriteriaReview[];
  cafe?: Cafe | null;
  user?: User | null;
};

export type User = {
  id: number;
  tgId: string;
  cityId?: number | null;
  role: UserRole;
  cafe: Cafe[];
  reviews: Review[];
  criteria: CriteriaUser[];
  city?: City | null;
  businessRequests: BusinessRequest[];
  editor?: Editor | null;
  reports: Report[];
  createdAt: Date;
  updatedAt: Date;
};

export type Criteria = {
  id: number;
  name: string;
  CriteriaReview: CriteriaReview[];
  CriteriaUser: CriteriaUser[];
};

export type CriteriaReview = {
  id: number;
  mark: number;
  criteriaId: number;
  reviewId: number;
  criteria: Criteria;
  review: Review;
};

export type CriteriaUser = {
  id: number;
  weight: number;
  criteriaId: number;
  userId: number;
  criteria: Criteria;
  user: User;
};

export type BusinessRequest = {
  id: number;
  cafeName: string;
  cafeUsername: string;
  code: string;
  socialNetwork: SocialNetworkRequest;
  ownerId?: number | null;
  owner?: User | null;
  createdAt: Date;
  updatedAt: Date;
};

export type Report = {
  id: number;
  type: ReportType;
  text?: string | null;
  userId?: number | null;
  user?: User | null;
  createdAt: Date;
  updatedAt: Date;
};

export type ReviewCriteriaOrder = { [key: string]: number }[];

export const valuesDesc = [1.7, 1.5, 1.3, 1.0];
