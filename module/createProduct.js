const { product, getData } = require('../data.js');

module.exports = async(req, res) => {
    try {
        console.log('POST',req.url);
        const body = await getData(req);
        const { id, name, price } = JSON.parse(body);

        if(product['id'+id]){
            res.writeHead(400, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: "Product already exists" }));
        }

        if(!id || !name  || !price){
            res.writeHead(400, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: "Product is not valid" }));
        }
        
        if(typeof(id) !== 'number' || typeof(name) !== 'string' || typeof(price) !== 'number'){
            res.writeHead(400, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: "Product is not defined properly" }));
        }  

        product['id'+id] = {
                name ,
                price
        }; 

        console.log(`Creating Product ${'id'+id}:`,product['id'+id])  
        res.writeHead(201, { 'Content-Type': 'application/json' });    
        return res.end(JSON.stringify({ sucess: "Product is sucessfully added" }));  

    } 
    catch (error) {
        console.log(error.message, 'catch');
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Not valid JSON' }));
    }
}