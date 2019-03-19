const express = require('express');
const bodyParser = require('body-parser');
const Mongoose = require("mongoose");
const product = require('./routes/product.route'); // Imports routes for the products
const orders = require('./routes/orders'); // Imports routes for the products
const app = express();
const http = require("http");
var processImage = require('express-processimage');

Mongoose.connect("mongodb://127.0.0.1:27017/StockRes",{ useNewUrlParser: true }, function(err, db) {
	if(err){
		console.log("Not successfully connected to StockRes");
		throw err;
	}
	else{
		console.log("Connected successfully to StockRes");
	}
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




app.use('/products', product);
app.use('/orders', orders);


app.use('/uploads',express.static(__dirname+'/uploads'))
app.use(express.static('public'));

const port = process.env.PORT || 9090;
const server = http.createServer(app);

server.listen(port, function() {
    console.log("Server listening on port " + port);
});
