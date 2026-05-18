const express =  require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const connectDB = require('./config/db');
const router = require('./routes');
const webhooks = require('./controller/order/webhook');


const app = express()
app.use(cors({
origin:"https://ecommerce-home-frontend.onrender.com",
credentials:true
}))


app.post(
   "/webhook",
   express.raw({ type: "application/json" }),
   webhooks
)

app.use(express.json())
app.use(cookieParser())

app.use("/api",router);

const PORT = process.env.PORT||8080

connectDB().then(()=>{
   app.listen(PORT,()=>{
    console.log("connected to DB");
    console.log("server is running");
    })

})


