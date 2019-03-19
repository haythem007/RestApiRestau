
const Product = require('../models/product.model');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};


// controllers/products.js
exports.product_create =  function (req, res) {
    let product = new Product(
        {
            name: req.body.name,
            price: req.body.price,
            productImage: req.file.path 

        }
    );

    product.save(function (err) {
        if (err) {
            return next(err);
        }
        res.status(200).json(product)
    })
};




exports.product_details = function (req, res) {
    Product.findById(req.params.id, function (err, product) {
        if (err) {
            return res.status(500).json(err);
        }
        res.status(200).json(product)
    })
};


exports.product_all = function (req, res) {
    Product.find().exec().then(products=>{
        res.status(200).json(products);
    }).catch(err=>{
        res.status(404).json(err);
    })
};



exports.product_update = function (req, res) {
    Product.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, product) {
        if (err) {
            return next(err);
        }
        res.status(200).json(product)
    });
};

exports.product_delete = function (req, res) {
    Product.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};