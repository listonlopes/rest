const http = require('http');
const { product, createProduct, getProduct, updateProduct, deleteProduct } = require('./module');


const port = 3000;
const hostname = 'localhost';

const server = http.createServer(async(req,res) => {
    try {
    	if(req.url === '/Product' && req.method === 'POST') {
        	createProduct(req, res);	
   	 	}
   	 	else if(req.url === '/Products' && req.method === 'GET') {
   	 		console.log('GET',req.url);
   	 		console.log(`Getting Products:`,product);
        	res.writeHead(201, { 'Content-Type': 'application/json' });
        	return res.end(JSON.stringify(product));	
   	 	}
        else if(req.url.match(/\/Product\/\w+/) && req.method === 'GET') {
            const id = req.url.split('/')[2];
            getProduct(req, res, id);
        }
        else if(req.url.match(/\/Product\/\w+/) && req.method === 'PUT') {
            const id = req.url.split('/')[2];
            updateProduct(req, res, id);
        }
        else if(req.url.match(/\/Product\/\w+/) && req.method === 'DELETE') {
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

server.listen(port, hostname, ()=>{
	console.log(`Server listening at: http://${hostname}:${port}`);
});