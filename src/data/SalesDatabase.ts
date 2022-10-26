import { SaleRepository } from "../business/SaleRepository";
import { BaseDatabase } from "./BaseDatabase";
import { TABLE_SALES } from "./TABLE_NAMES";

export class SalesDatabase extends BaseDatabase implements SaleRepository{
    public async registerSale(
        purchaseId:string,
        itemId:number,
        quantity:number
        ){
        await BaseDatabase.connection(TABLE_SALES)
        .insert({
            item_id:itemId,
            purchase_id:purchaseId,
            quantity
        })
    }
}