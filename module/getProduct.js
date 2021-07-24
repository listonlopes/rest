const { product } = require('../data.js');

const getProducts = (req, res) => {
    console.log('GET',req.url);
    if(Object.keys(product).length !== 0){
        console.log(`Getting Products:`,product);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify(product));
    } 

    res.writeHead(404, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ error: "No products not found." }));
}

const getProduct = (req, res, id) => {
    console.log('GET',req.url);
    console.log(`Getting Product ${id}:`,product[id]);
    if(product[id]){
        res.writeHead(201, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify(product[id]));
    }   

    res.writeHead(404, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ error: "Product not found." }));
}


module.exports = { 
    getProducts,
    getProduct
}