import { Request, Response } from "express";
import prisma from "../prisma";

export async function listProducts(req: Request, res: Response) {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Error fetching products" });
  }
}

export async function getProduct(req: Request, res: Response) {
  const { slug } = req.params;
  try {
    const product = await prisma.product.findUnique({ where: { slug } });
    if (!product) return res.status(404).json({ error: "Not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: "Error fetching product" });
  }
}
