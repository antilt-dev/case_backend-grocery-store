import { ProductDTO } from "../models/ProductDTO";

export interface StockRepository{
    getStockItems():Promise<ProductDTO[]>,
    getById(id:number):Promise<ProductDTO[]>,
    setNewQty(id:number,newQty:number):Promise<void>
}