export type Criteria = {
  taste: number;
  atmosphere: number;
  speed: number;
  aroma: number;
};

export type City = {
  id: number;
  name: string;
};

export type User = {
  id: number;
  tgId: string;
  criteria: Criteria;
  city: City;
  cafe: Cafe[];
};

export type Review = {
  id: number;
  text: string;
  criteria: Criteria;
  user: User;
  cafe: Cafe;
  createdAt: Date;
  updatedAt: Date;
  updateCount: number;
};

export type Cafe = {
  id: number;
  name: string;
  description: string;
  avatar: string;
  address: string[];
  owner: User;
  city: City;
  reviews: Review[];

  score?: number;
};

export type CriteriaOrder = { key: keyof Criteria; label: string }[];

export const initialCriteria: CriteriaOrder = [
  { key: "aroma", label: "Аромат" },
  { key: "atmosphere", label: "Атмосфера" },
  { key: "speed", label: "Скорость" },
  { key: "taste", label: "Вкус" },
];

export const valuesDesc = [1.7, 1.5, 1.3, 1.0];
