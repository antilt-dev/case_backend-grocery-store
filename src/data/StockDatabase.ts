import { StockRepository } from "../business/StockRepository";
import { ProductDTO } from "../models/ProductDTO";
import { BaseDatabase } from "./BaseDatabase";
import { TABLE_STOCK } from "./TABLE_NAMES";


export class StockDatabase extends BaseDatabase implements StockRepository{
    
    public async getStockItems(){
        const result:ProductDTO[] = await BaseDatabase.connection(TABLE_STOCK).select()
        return result
    }
    
    public async getById(id:number){
        const result:ProductDTO[] = await BaseDatabase.connection(TABLE_STOCK)
        .select()
        .where({id})

        return result
    }
 
    public async setNewQty(
        id:number, 
        newQty:number
        ){
        await BaseDatabase.connection(TABLE_STOCK)
        .update({qty_stock:newQty})
        .where({id})
    }
 
}