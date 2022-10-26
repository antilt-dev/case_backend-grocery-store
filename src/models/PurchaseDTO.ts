import { SaleDTO } from "./SaleDTO";

export interface PurchaseDTO{
    name:string,
    date:string,
    purchaseItems:SaleDTO[]
}