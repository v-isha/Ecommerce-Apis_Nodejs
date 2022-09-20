import express from 'express'
import dotenv from 'dotenv'
import connectDB from './Config/connectdb.js'
import authroutes from './Routes/auth.js'
import userroutes from './Routes/user.js'
import productroutes from './Routes/product.js'
dotenv.config()
const app = express()
const port = process.env.PORT
const DATABASE_URL=process.env.DATABASE_URL
app.use(express.json())


// Routing
app.use('/api/registration',authroutes)
app.use('/api/users',userroutes)
app.use('/api/products',productroutes)








// Database connection and serverConnection
connectDB(DATABASE_URL)
app.listen(port,()=>{
    console.log(`server run at localhost http://localhost:${port}`)
})