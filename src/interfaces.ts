type ProductSection = "food" | "cleaning";
export interface IProduct {
  id: number;
  name: string;
  price: number;
  weight: number;
  section: ProductSection;
  expirationData: Date;
}

export interface ICleaningProduct extends IProduct {}

export interface IFoodProduct extends IProduct {
  calories: number;
}
export interface IUpdateProduct {
  name?: string;
  price?: number;
  weight?: number;
  section?: ProductSection;
  calories?: number;
}
type IRequestCleaningProduct = Omit<ICleaningProduct, "id" | "expirationData">;
type IRequestFoodProduct = Omit<ICleaningProduct, "id" | "expirationData">;
export type INewProduct = IRequestCleaningProduct | IRequestFoodProduct;
