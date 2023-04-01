import express, { Application, json, Request, Response } from "express";
import {
  createProduct,
  deleteProduct,
  patchProduct,
  readProduct,
  readProductId,
} from "./logics";
import { checkProductExists, findProductId, filterProductSection, validateProductCreation, checkNameExists } from "./middlewares";

const app: Application = express();
app.use(json());

app.get("/products",filterProductSection  ,readProduct);

app.post("/products",validateProductCreation,checkProductExists,createProduct);

app.get("/products/:id", findProductId, readProductId);
 
app.patch("/products/:id", findProductId,checkNameExists,patchProduct);

app.delete("/products/:id",findProductId, deleteProduct);

const PORT: number = 3000;
const runningMsg: string = `Server running in http://localhost:${PORT}`;
app.listen(PORT, () => console.log(runningMsg));
