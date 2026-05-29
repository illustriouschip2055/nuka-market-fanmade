import type { Request, Response } from "express";
import * as service from '../services/products.service.js'

export const getAllProducts = async (
    _req: Request,
    res: Response
) => {
    const products = await service.getAllProducts()
    return res.json(products)
}

export const getProduct = async (
    _req: Request,
    res: Response
) => {
    const id = Number(_req.params.id)
    const product = await service.getProduct(id)
    return res.json(product) 
}