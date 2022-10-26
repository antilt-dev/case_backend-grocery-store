import { Request, Response } from "express"
import { CreatePurchaseBusiness } from "../business/CreatePuschaseBusiness"
import { PurchaseDTO } from "../models/PurchaseDTO"

export class CreatePurchaseController{
    constructor(private createPurchaseBusiness:CreatePurchaseBusiness){}
    public createPurchase = async (req:Request,res:Response) =>{
        try{
            const {name,date,purchaseItems}:PurchaseDTO = req.body
            const input = {
                name,
                date,
                purchaseItems
            }
    
            await this.createPurchaseBusiness.createPurchase(input)
            
            res.status(201).send("Compra registrada com sucesso!")
    
        }catch(error:any){
            res.status(error.statusCode).send(error.message)
        }
    }
}
