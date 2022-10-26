import express from 'express'
import { GetProductsBusiness } from '../business/GetProductsBusiness'
import { GetProductsController } from '../controller/GetProductsController'
import { StockDatabase } from '../data/StockDatabase'

export const productsRouter = express.Router()

const stockDatabase = new StockDatabase()
const getProductBusiness = new GetProductsBusiness(stockDatabase)
const getProductsController = new GetProductsController(getProductBusiness)

productsRouter.get("/getAll",getProductsController.getProducts)