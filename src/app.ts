import express, { Application, json, Request, Response } from "express";
import { market } from "./database";
import {
  ICleaningProduct,
  IFoodProduct,
  INewProduct,
  IProduct,
} from "./interfaces";

const app: Application = express();
app.use(json());

let nextId = 1;

const generateId = () => {
  const id = nextId;
  nextId += 1;

  return id;
};

app.get("/products", (request: Request, response: Response): Response => {
  return response.json(market);
});

app.post(
  "/products",
  (request: Request, response: Response): Response | undefined => {
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
      return response.status(201).json();
    }

    if (product.section === "cleaning") {
      const productClean: ICleaningProduct = {
        ...newProduct,
      };

      market.push(productClean);

      return response.status(201).json();
    }
  }
);

app.get("/products/:id", (request: Request, response: Response): Response => {
  const id = request.params.id;

  return response.json();
});

app.patch("/products/:id" /* Callback */);

app.delete(
  "/products/:id",
  (request: Request, response: Response): Response => {
    const id = request.params.id;
    console.log(id);
    return response.json("Deletado");
  }
);

const PORT: number = 3000;
const runningMsg: string = `Server running in http://localhost:${PORT}`;
app.listen(PORT, () => console.log(runningMsg));
