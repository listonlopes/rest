const { product } = require('../data.js');

module.exports = (req, res, id) => {
    console.log('DELETE',req.url);
    if(product[id]){
        console.log(`Deleting Product ${id}:`,product[id]);
        delete product[id];
        res.writeHead(201, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ sucess: "Product is sucessfully deleted." }));
    }
   
    res.writeHead(404, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ error: "Product not found." }));
    
}
