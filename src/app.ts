import express, { Application, json, Request, Response } from "express";
import { createProduct, deleteProduct, readProduct, readProductId } from "./logics";

const app: Application = express();
app.use(json());

app.get("/products",readProduct);

app.post("/products",createProduct);

app.get("/products/:id",readProductId);

app.patch("/products/:id" /* Callback */);

app.delete(
  "/products/:id",
  deleteProduct
);

const PORT: number = 3000;
const runningMsg: string = `Server running in http://localhost:${PORT}`;
app.listen(PORT, () => console.log(runningMsg));
