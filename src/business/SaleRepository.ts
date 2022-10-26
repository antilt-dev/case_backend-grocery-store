export interface SaleRepository{
    registerSale(
        purchaseId:string,
        itemId:number,
        quantity:number
        ):Promise<void>
}