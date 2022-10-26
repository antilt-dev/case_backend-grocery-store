import { ProductDTO } from "../models/ProductDTO"
import { StockRepository } from "./StockRepository"

export class GetProductsBusiness {
    constructor(private stockDatabase:StockRepository){}
    public getProducts = async () =>{
        try{
            const result:ProductDTO[] = await this.stockDatabase.getStockItems()

            return result
        }catch(error:any){
            throw new Error(error.message || error.sqlMessage)
        }
    }
}

