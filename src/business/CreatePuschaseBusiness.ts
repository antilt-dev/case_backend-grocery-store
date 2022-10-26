import { ProductDTO } from "../models/ProductDTO"
import { CustomError } from "../error/CustomError"
import { idGenerator } from "../services/idGeneretair"
import { PurchaseDTO } from "../models/PurchaseDTO"
import { StockRepository } from "./StockRepository"
import { SaleRepository } from "./SaleRepository"
import { PurchaseRepository } from "./PurchaseRepository"

export class CreatePurchaseBusiness{
    constructor(
        private stockDatabase:StockRepository,
        private saleDatabase:SaleRepository,
        private PurchaseDatabase:PurchaseRepository
    ){}
    public createPurchase = async (input:PurchaseDTO) =>{
        let statusCode:number = 500
        
        try{

            const {name,date,purchaseItems} = input
            const purchaseId = idGenerator()

            if(!name){
                statusCode = 412
                throw new CustomError(statusCode,'É necessário informar o nome do cliente.')
            }
            if(!date){
                statusCode = 412
                throw new CustomError(statusCode,'É necessário informar a data de entrega.')
            }
            if(!purchaseItems || purchaseItems.length < 1){
                statusCode = 412
                throw new CustomError(statusCode,'É necessário ter ao menos um item no carrinho.')
            }

            let checkedItems:ProductDTO[] = []

            for(let item of purchaseItems){
                const product:ProductDTO[] = await this.stockDatabase.getById(item.id)
                if(product.length > 0){
                    checkedItems = [...checkedItems,product[0]]
                }
            }
            
            if(checkedItems.length < purchaseItems.length){
                statusCode = 406
                throw new CustomError(statusCode,'Algum "id" fornecino não foi encontrado no estoque.')
            }
        
            let overBookItems:number[] = []

            for(let item of purchaseItems){
                const product:ProductDTO[] = await this.stockDatabase.getById(item.id)
                const stock = product[0].qty_stock
                if(stock < item.quantity){
                    overBookItems = [...overBookItems,item.id]
                }
            }
        
            if(overBookItems.length > 0){
                statusCode = 406
                throw new CustomError(statusCode,`${overBookItems.length} ${overBookItems.length === 1?"item":"itens"} da sua compra não tem estoque suficiente para atender sua solicitação. Verificar ${overBookItems.length === 1?"o produto com o seguinte id":"os produtos com os seguintes id's"}: ${overBookItems.toString().split(",").join("-")}`)
            }

            await this.PurchaseDatabase.createPurchase(purchaseId,name,date)

            for(let item of purchaseItems){
                const product = await this.stockDatabase.getById(item.id)
                const stock = product[0].qty_stock
                const newQty = stock - item.quantity

                await this.stockDatabase.setNewQty(
                    item.id,
                    newQty
                )
                await this.saleDatabase.registerSale(
                    purchaseId,
                    item.id,
                    item.quantity
                )
            }

        }catch(error:any){
        throw new CustomError(error.statusCode || 400,error.message || error.sqlMessage)
        }
    }
}