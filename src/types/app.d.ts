export interface CatPropT {
  id: number;
}

export interface CardT {
  card: CatT;
}

export interface CatT {
  id: number;
  name: string;
  image: string;
  age: number;
  rate: number;
  favorite: boolean;
  description: string;
}
