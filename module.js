var product = {
    id1: {
        name: 'book',
        price: 2000},
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
        const { id, name, price } = JSON.parse(body);
        const newProduct = {
            id,
            name,
            price
        }
        console.log(newProduct);
        if(!product['id'+newProduct.id]){
            if (!newProduct.id || !newProduct.name || !newProduct.price) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: "product is not valid" }));
            }
            else if (typeof(newProduct.id) !== 'number' || typeof(newProduct.name) !== 'string' || typeof(newProduct.price) !== 'number') {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: "Product is not defined properly" }));
            }
            else{
                res.writeHead(201, { 'Content-Type': 'application/json' });
                let newProductobj = {
                    ['id'+newProduct.id]: {
                        name: newProduct.name,
                        price: newProduct.price}
                };       
                Object.assign(product,newProductobj);
                console.log(`Creating Product:`,newProductobj);
                return res.end(JSON.stringify({ sucess: "Product is sucessfully added" }));  
            }  
        }
        else {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: "product id is already assigned." }));
        }

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
        console.log(`Upadating Product ${id}:`,product[id]);
        const body = await getPostData(req);
        const { name, price } = JSON.parse(body);
        const upProduct = {
            name,
            price
        }
        if(product[id]){
            if (!upProduct.name && !upProduct.price) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: "product is not valid" }));
            }
            else if (typeof(upProduct.name) !== 'string' && typeof(upProduct.price) !== 'number') {
                while(typeof(upProduct.name) == 'undefined'){
                    if(typeof(upProduct.price) !== 'number'){
                        res.writeHead(400, { 'Content-Type': 'application/json' });
                        return res.end(JSON.stringify({ error: "Product price  is not defined properly" }));
                    }
                }
                while(typeof(upProduct.price) == 'undefined'){
                    if(typeof(upProduct.name) !== 'string'){
                        res.writeHead(400, { 'Content-Type': 'application/json' });
                        return res.end(JSON.stringify({ error: "Product name  is not defined properly" }));
                    }
                }

            }
            else{
                res.writeHead(201, { 'Content-Type': 'application/json' }); 
                while(typeof(upProduct.name) == 'undefined'){
                    upProduct.name = product[id].name;
                }
                while(typeof(upProduct.price) == 'undefined'){
                    upProduct.price = product[id].price;
                }      
                Object.assign(product[id], upProduct);
                console.log(`Upadated Product ${id}:`,product[id]);
                return res.end(JSON.stringify({ sucess: "Product is sucessfully updated" }));  
            }  
        }
        else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: "Product does not exists." }));
        }

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