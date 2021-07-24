const { product, getData } = require('../data.js');

module.exports = async(req, res, id) => {
    try {
        console.log('PUT',req.url);
        if(!product[id]){
            res.writeHead(404, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: "Product does not exists." }));
        }

        console.log(`Upadating Product ${id}:`,product[id]);
        const body = await getData(req);
        const { name, price } = JSON.parse(body);

        if (!name || !price) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: "product is not valid" }));
        }
        
        if (typeof(name) !== 'string' || typeof(price) !== 'number'){ 
            res.writeHead(400, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: "Product is not defined properly" }));
        }

        product[id] = {
            name, 
            price
        };

        res.writeHead(201, { 'Content-Type': 'application/json' }); 
        console.log(`Upadated Product ${id}:`,product[id]);
        return res.end(JSON.stringify({ sucess: "Product is sucessfully updated" }));         
        
    } 
    catch (error) {
        console.log(error.message, 'catch');
        res.writeHead(400, { 'Content-Type': 'application/json' });     
        return res.end(JSON.stringify({ error: 'Not valid JSON' }));
    }
}