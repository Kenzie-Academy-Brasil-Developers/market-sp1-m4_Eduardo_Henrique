export interface IProduct {
  id: number;
  name: string;
  price: number;
  weight: number;
  section: "food" | "cleaning";
  expirationData: Date;
}

export interface ICleaningProduct extends IProduct {}

export interface IFoodProduct extends IProduct {
  calories ?: number;
}

export type INewProduct = Omit <IProduct,'id'| 'expirationData' >
