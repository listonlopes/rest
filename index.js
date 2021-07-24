const http = require('http');
const {  getProducts, getProduct } = require('./module/getProduct.js');
const createProduct = require('./module/createProduct');
const updateProduct = require('./module/updateProduct');
const deleteProduct = require('./module/deleteProduct');


const port = 3000;
const hostname = 'localhost';

const server = http.createServer((req,res) => {
    try {
    	if(req.url === '/Product' && req.method === 'POST') {
        	createProduct(req, res);	
   	 	}
   	 	else if(req.url === '/Products' && req.method === 'GET') {
            getProducts(req, res);	
   	 	}
        else if(req.url == req.url.match(/\/Product\/id\d+/) && req.method === 'GET') {
            const id = req.url.split('/')[2];
            getProduct(req, res, id);
        }
        else if(req.url == req.url.match(/\/Product\/id\d+/) && req.method === 'PUT') {
            const id = req.url.split('/')[2];
            updateProduct(req, res, id);
        }
        else if(req.url == req.url.match(/\/Product\/id\d+/) && req.method === 'DELETE') {
            const id = req.url.split('/')[2];
            deleteProduct(req, res, id);
        }
   	 	else{
   	 		res.writeHead(404, { 'Content-Type': 'application/json' })
        	res.end(JSON.stringify({ message: 'Route Not Found' }))
   	 	}
    }catch(err){
       console.log(err);
    }
});

server.listen(port, hostname, () => {
	console.log(`Server listening at: http://${hostname}:${port}`);
});