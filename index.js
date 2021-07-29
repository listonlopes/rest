const http = require('http');
const {  getProducts, getProduct } = require('./module/getProduct.js');
const createProduct = require('./module/createProduct');
const updateProduct = require('./module/updateProduct');
const deleteProduct = require('./module/deleteProduct');


const port = 3000;
const hostname = 'localhost';
const regex = /^\/Product\/id\d+$/;

const server = http.createServer((req,res) => {
    try {
    	if(req.url === '/Product' && req.method === 'POST') {
        	createProduct(req, res);	
   	 	}
   	 	else if(req.url === '/Products' && req.method === 'GET') {
            getProducts(req, res);	
   	 	}
        else if(regex.test(req.url) && req.method === 'GET') {
            const id = req.url.split('/')[2];
            getProduct(req, res, id);
        }
        else if(regex.test(req.url) && req.method === 'PUT') {
            const id = req.url.split('/')[2];
            updateProduct(req, res, id);
        }
        else if(regex.test(req.url) && req.method === 'DELETE') {
            const id = req.url.split('/')[2];
            deleteProduct(req, res, id);
        }
   	 	else{
   	 		res.writeHead(404, { 'Content-Type': 'application/json' })
        	res.end(JSON.stringify({ message: 'Route Not Found' }))
   	 	}
    }
    catch(err) {
       console.log(err);
    }
});

server.listen(port, hostname, () => {
	console.log(`Server listening at: http://${hostname}:${port}`);
});

server.listen(9000, hostname, () => {
    console.log(`Server listening at: http://${hostname}:9000`);
});

process.on('SIGINT', () => {
    console.log(' : SIGINT signal received.');
    console.log('Closing http server.');
    server.close(() => {
        console.log('HTTP server closed.');
    });
});