import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { productsRouter } from './routes/productsRouter';
import { purchaseRouter } from './routes/purchasesRouter';


dotenv.config()
const app = express()

const port = process.env.PORT  || 3003

app.use(express.json())
app.use(cors())


app.use('/products',productsRouter)

app.use('/purchases',purchaseRouter)


app.listen(port, () => {
    console.log(`The server is running in http://localhost:${port}`)
})