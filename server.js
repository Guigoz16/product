const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/productModel');
require('dotenv').config();
 

const app = express();

app.use(express.json()); //using middlewares

//declare routes to access the app on the browser

app.get('/', (req, res) => {
    res.send('hello node API')
})
app.get('/product', async(req, res) =>{
    try {
        const products = await Product.find({});
        res.status(200).json(products)
        
    } catch (error) {
        res.status(500).json({message: error.message})
        
    }
})

app.get('/product/:id', async(req,res) =>{
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message})
        
    }

})
app.post('/product', async(req, res) =>{
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

app.put('/product/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if(!product){
            return res.status(404).json({message: 'can not find the product with id ${id}'});

        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);

    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.delete('/product/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id, req.body);
        if(!product){
            return res.status(404).json({message: 'can not find the product with id ${id}'});

        }
        
        res.status(200).json(Product);

    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
.then(() => {
    app.listen(3000, ()=>{
        console.log("Node API app is running ...")
    })
    console.log('connected to mongodb')
})
.catch((error) =>{
    console.log(error)
})