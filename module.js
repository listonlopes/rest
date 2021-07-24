var product = {
    id1: {
        name: 'book',
        price: 2000
    },
    id2: {
        name: 'pen',
        price: 20
    }
};

function getPostData(req) {
    return new Promise((resolve, reject) => {
        try {
            let body = '';

            req.on('data', (chunk) => {
                body += chunk.toString();
            })

            req.on('end', () => {
                resolve(body);
            })
        } catch (error) {
            reject(err);
        }
    });
};

async function createProduct(req, res) {
    try {
        console.log('POST',req.url);
        const body = await getPostData(req);
        const { id, name, price } = JSON.parse(body);//check !id !name !price
        if(product['id'+id]){
            res.writeHead(400, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: "product already exists" }));
        }
        if(!id || !name  || !price){
            res.writeHead(400, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: "product is not valid" }));
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

function getProduct(req, res, id) {
    console.log('GET',req.url);
    console.log(`Getting Product ${id}:`,product[id]);
    if(product[id]){
        res.writeHead(201, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify(product[id]));
    }
    else{
        res.writeHead(404, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: "Product not found." }));
    }
}

async function updateProduct(req, res, id) {
    try {
        console.log('PUT',req.url);
        if(!product[id]){
            res.writeHead(404, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: "Product does not exists." }));
        }
        console.log(`Upadating Product ${id}:`,product[id]);
        const body = await getPostData(req);
        let { name, price } = JSON.parse(body);
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

function deleteProduct(req, res, id) {
    console.log('DELETE',req.url);
    if(product[id]){
        console.log(`Deleting Product ${id}:`,product[id]);
        delete product[id];
        res.writeHead(201, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ sucess: "Product is sucessfully deleted." }));
    }
    else{
        res.writeHead(404, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: "Product not found." }));
    }
}

module.exports = {
    product,
    createProduct,
    getProduct, 
    updateProduct, 
    deleteProduct
}