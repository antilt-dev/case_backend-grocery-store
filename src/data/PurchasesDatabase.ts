import { PurchaseRepository } from "../business/PurchaseRepository";
import { BaseDatabase } from "./BaseDatabase";
import { TABLE_PURCHASES } from "./TABLE_NAMES";

export class PurchaseDatabase extends BaseDatabase implements PurchaseRepository{
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