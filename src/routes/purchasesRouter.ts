import express from "express";
import { CreatePurchaseBusiness } from "../business/CreatePuschaseBusiness";
import { CreatePurchaseController } from "../controller/CreatePuschaseController";
import { PurchaseDatabase } from "../data/PurchasesDatabase";
import { SalesDatabase } from "../data/SalesDatabase";
import { StockDatabase } from "../data/StockDatabase";

export const purchaseRouter = express.Router()



const stockDatabase = new StockDatabase()
const salesDatabase = new SalesDatabase()
const purchasesDatabase = new PurchaseDatabase()
const createPurchaseBusiness = new CreatePurchaseBusiness(stockDatabase,salesDatabase,purchasesDatabase)
const createPurchaseController = new CreatePurchaseController(createPurchaseBusiness)



purchaseRouter.post("/", createPurchaseController.createPurchase)