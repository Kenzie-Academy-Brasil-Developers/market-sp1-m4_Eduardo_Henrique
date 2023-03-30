import { Request,Response } from "express";
import { market } from "./database";
import { ICleaningProduct, IFoodProduct, INewProduct, IProduct } from "./interfaces";

let nextId = 1;

const generateId = () => {
  const id = nextId;
  nextId += 1;

  return id;
};

export const readProduct = (request: Request, response: Response): Response => {
  return response.json(market);
}

export const readProductId = (request: Request, response: Response): Response => {
  const id = request.params.id;

  const findProduct = market.find((product) => product.id === parseInt(id));
  
  return response.json(findProduct);
}

export const createProduct = (request: Request, response: Response): Response | undefined => {
  const product: INewProduct = request.body;

  const expirationData = new Date();
  expirationData.setFullYear(expirationData.getFullYear() + 1);

  console.log(product);

  const newProduct: IProduct = {
    id: generateId(),
    ...product,
    expirationData: expirationData,
  };

  if (product.section === "food") {
    const productFood: IFoodProduct = {
      ...newProduct,
      calories: 0,
    };

    market.push(productFood);
    return response.status(201).json(productFood);
  }

  if (product.section === "cleaning") {
    const productClean: ICleaningProduct = {
      ...newProduct,
    };

    market.push(productClean);

    return response.status(201).json(productClean);
  }
}

export const deleteProduct = (request: Request, response: Response): Response => {
  const id = request.params.id;

  const findIndex = market.findIndex(
    (product) => product.id === parseInt(id)
  );

  market.splice(findIndex, 1);

  return response.status(204).send();
}