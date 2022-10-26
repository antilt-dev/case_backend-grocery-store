export interface PurchaseRepository{
    createPurchase(
        id:string,
        name:string,
        date:string
        ):Promise<void>
}