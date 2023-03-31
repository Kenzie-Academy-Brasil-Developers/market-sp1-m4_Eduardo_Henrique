import { Request, Response } from "express";
import { market } from "./database";
import { INewProduct, IProduct } from "./interfaces";

export const readProduct = (
  request: Request,
  response: Response
): Response | undefined => {
  const sectionProduct: any = request.query.section;
  console.log(sectionProduct);
  if (sectionProduct !== undefined) {
    const filterProducts = market.filter(
      (product) => product.section === sectionProduct
    );
    return response.status(200).json(filterProducts);
  }
  const marketProducts:IProduct[] = market
  const total: number = marketProducts.reduce((acc, product) => {
    return acc + product.price;
  }, 0);
  return response.status(200).json({total,marketProducts});
};

export const readProductId = (
  request: Request,
  response: Response
): Response => {
  const product = response.locals.product.findProduct;
  return response.json(product);
};

export const createProduct = (
  request: Request,
  response: Response
): Response | undefined => {
  const productsBody: INewProduct[] = request.body;

  const expirationData = new Date();

  expirationData.setFullYear(expirationData.getFullYear() + 1);

  const marketProducts = productsBody.map((product) => {
    const newProduct: IProduct = {
      id: market.length
        ? Math.max(...market.map((product) => product.id)) + 1
        : 1,
      expirationData: expirationData,
      ...product,
    };
    market.push(newProduct);
    return newProduct;
  });

  const total: number = marketProducts.reduce((acc, product) => {
    return acc + product.price;
  }, 0);
  return response.status(201).json({ total: `${total}`, marketProducts });
};

export const patchProduct = (
  request: Request,
  response: Response
): Response => {
  const id = request.params.id;
  let product = market.findIndex((product) => product.id === Number(id));
  const updateProduct = request.body;
  console.log(updateProduct);
  market[product] = {
    ...market[product],
    ...updateProduct,
  };
  console.log(market[product]);
  return response.json(market[product]);
};

export const deleteProduct = (
  request: Request,
  response: Response
): Response => {
  const id = request.params.id;

  const findIndex = market.findIndex((product) => product.id === parseInt(id));

  market.splice(findIndex, 1);

  return response.status(204).send();
};

/* erros para corrigir */
//funcao de atualizar tudo esta funcinando na hora de enviar ele envia so nao atualiza na database
//utilizar um novo array sem ser o market nao entendi isso
//é para utilizar o zod ?
