const cors =require("cors")
const express = require("express")

const stripe = require("stripe")("sk_test_51H58mlHlWzMPlMkJINHUl1T7lw4GV4YmqBhMZSCZJdAG7v9kOfjfwS0fhqF6FRBv5uFKNQSBrKqp1F7Z2f2I1zPE00IanpYiwz")
const uuid = require("uuid")
const { default: Stripe } = require("stripe")


const app = express ("uuid/v4")

//middleware
app.use(express.json())
app.use(cors())

//routes
app.get("/",(req,res) =>{
    res.send("it works")
})

app.post("/payment",(req,res) => {
    const {product,token} = req.body
    console.log("PRODUCT", product)
    console.log("PRICE",product.price)
    const idempotencyKey = uuid()

    return stripe.customers
    .create({
        email: token.email,
        source: token.id,

    }).then(customer =>{
        stripe.charges.create({
            amount: product.price *100,
            currency: 'usd',
            customer: customer.id,
            receipt_email: token.email,
            description: `purchase of ${product.name}`,
            shipping: {
                name: token.card.name,
                address: {
                    country: token.card.address_country
                }
            }
            
        },{idempotencyKey})
    })
    .then(result => res.status(200).json(result))
    .catch(err => console.log(err))
})

//listen
app.listen(8282,() => console.log("LISTENING AT PORT 8282"))