import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { getProducts } from './endpoints/getProducts';
import { createPurchase } from './endpoints/createPuschase';

dotenv.config()
const app = express()

const port = process.env.DB_PORT  || 3003

app.use(express.json())
app.use(cors())

app.get('/products',getProducts)

app.post('/purchases',createPurchase)

app.listen(port, () => {
    console.log(`The server is running in http://localhost:${port}`)
})