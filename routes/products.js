const router = require('express').Router();
const { verifyTokenAndAdmin } = require('./verifyToken');
const Products = require("../models/Products");

//CREATE PRODUCT
router.post("/", verifyTokenAndAdmin, async(req,res) => {
    const newProduct = new Products({
        title: req.body.title,
        img: req.body.img,
        desc: req.body.desc,
        categories: req.body.categories,
        price: req.body.price,
        size: req.body.size
    })
    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch (err) {
        res.status(500).json(err)
    }
})
//EDIT PRODUCTS
router.put("/:id",verifyTokenAndAdmin, async(req, res) => {
    try {
        const updatedProduct = await Products.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true})
        res.status(200).json(updatedProduct)
    } catch (err) {
        res.status(500).json(err)
    }
})

//DELETE PRODUCT
router.delete('/:id', verifyTokenAndAdmin, async(req, res) => {
    try {
        await Products.findByIdAndDelete(  req.params.id );
        res.status(200).json(" Product has been deleted");
    } catch(err) {
        res.status(500).json(err)
    }
})

//GET A PRODUCT
router.get('/find/:productId', async(req, res) => {
    try {
        const product = await Products.findById(  req.params.id );
        res.status(200).json(product);
    } catch(err) {
        res.status(500).json(err)
    }
})
//GET ALL PRODUCTS
router.get('/', async(req, res) => {
    const qNew = req.query.new;
    const category = req.query.category
    try {
       let products;
       if (qNew ) {
           products = await Products.find().sort({ _id: -1}).limit(5);
       } else if (category) {
           products = await Products.find({ 
               categories : {
                   $in: [category]
               }
            })
       } else {
           products =  await Products.find();
       }
        res.status(200).json(products);
    } catch(err) {
        res.status(500).json(err)
    }
})






module.exports = router;