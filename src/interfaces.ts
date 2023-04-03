type ProductSection = "food" | "cleaning";
export interface IProduct {
  id: number;
  name: string;
  price: number;
  weight: number;
  section: ProductSection;
  expirationDate: Date;
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
type IRequestCleaningProduct = Omit<ICleaningProduct, "id" | "expirationDate">;
type IRequestFoodProduct = Omit<ICleaningProduct, "id" | "expirationDate">;
export type INewProduct = IRequestCleaningProduct | IRequestFoodProduct;
