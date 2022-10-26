import { Request,Response } from "express"
import { GetProductsBusiness } from "../business/GetProductsBusiness"
import { ProductDTO } from "../models/ProductDTO"

export class GetProductsController {
    constructor(private getProductBusiness:GetProductsBusiness){}
    public getProducts = async (req:Request,res:Response) =>{
  
        try{
            const productsList:ProductDTO[] = await this.getProductBusiness.getProducts()
            
            res.status(200).send(productsList)
        }catch(error:any){
            res.send(error.message)
        }
    }
}
