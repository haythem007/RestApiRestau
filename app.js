const express = require('express');
const bodyParser = require('body-parser');
const Mongoose = require("mongoose");
const product = require('./routes/product.route'); // Imports routes for the products
const app = express();
const http = require("http");


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


const port = process.env.PORT || 9090;
const server = http.createServer(app);

server.listen(port, function() {
    console.log("Server listening on port " + port);
});
