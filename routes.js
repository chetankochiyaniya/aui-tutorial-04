var express = require('express');
var router = express.Router();
var Product = require('./Models/Product')


//to fetch data
router.get('/products',async(req,res)=>{
    const product = await Product.find()
    res.send(product)
})

//to add the data
router.post("/products",async(req,res)=>{
    const product = new Product({
        name:req.body.name,
        price:req.body.price,
        likes:req.body.likes
    })

    await product.save((err,msg)=>{
        if(err){
            res.status(500).json({
                "error":err
            })
        }
        else{
            res.status(200).json({
                "My-message":msg
            })
        }
    })

})


// api for updating data
router.patch('/products/:id',async (req,res)=>{
    const product = await Product.findOne({_id:req.params.id})
    product.name = req.body.name
    product.price=req.body.price
    product.likes = req.body.likes

    await product.save((err,msg)=>{
        if(err){
            res.status(500).json({
                error:err
            })
        }
        else{
            res.status(200).json({
                msg:msg
            })
        }
    })
})


router.delete('/products/:id', async (req, res) => {   // delete by id
   try{
    const _id = req.params.id;
    const deleteItem = await Product.findByIdAndDelete(_id);
    res.send(deleteItem);
   }
    catch (e){
        res.send(e);
    }
})

module.exports = router;
