import { NextFunction, Request, Response } from "express";
import { market } from "./database";
import { INewProduct, IProduct } from "./interfaces";

export const findProductId = (
  request: Request,
  response: Response,
  next: NextFunction
): Response | void => {
  const id = request.params.id;

  const findProduct = market.find((product) => product.id === Number(id));
  if (!findProduct) {
    return response.status(404).json({ error: "Product not found" });
  }
  response.locals.product = {
    findProduct: findProduct,
  };
  return next();
};

export const validateProductCreation = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const products: INewProduct[] = request.body.map((product: INewProduct) => {
    if (
      !product.name ||
      !product.section ||
      !product.price ||
      !product.weight
    ) {
      return response
        .status(400)
        .json({ error: "Missing required fields: name, section or price" });
    }
  });

  next();
};

export const checkProductExists = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const products: INewProduct = request.body.map((productBody: INewProduct) => {
    const existingProduct = market.filter(
      (productData) => productData.name === productBody.name
    );
    if (existingProduct.length > 0) {
      return response.status(409).json({ error: "Product already exists" });
    }
  });

  return next();
};

export const checkNameExists = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { name } = request.body;
  const existingProduct = market.find((product) => product.name === name);
  if (existingProduct) {
    return response.status(409).json({ error: "Product already exists" });
  } else {
    return next();
  }
};
export function preventUpdates(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const product: IProduct = req.body;
  if (
    product.id !== undefined ||
    product.expirationDate !== undefined
  ) {
    res
      .status(400)
      .json({
        message:
          "You are not allowed to update id or expirationData.",
      });
    return;
  }

  next();
}
export const filterProductSection = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const sectionProduct: any = request.query.section;
  if (sectionProduct) {
    if (sectionProduct !== "food" && sectionProduct !== "cleaning") {
      return response.status(404).json({ error: "section not found" });
    }
  }
  return next();
};
