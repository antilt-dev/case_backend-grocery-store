import { BaseDatabase } from "./db";
import { TABLE_PURCHASES } from "./TABLE_NAMES";

export class PurchaseDB extends BaseDatabase{
    public async createPurchase(
        id:string,
        name:string,
        date:string
        ){
        await BaseDatabase.connection(TABLE_PURCHASES)
        .insert({
            id,
            name,
            delivery_date:date
        })
    }
}