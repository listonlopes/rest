const fs = require('fs'); 
var product = require('./product.json');

function writeData(prod) {
    fs.writeFileSync('./product.json', JSON.stringify(prod), 'utf8');
}

function getData(req) {
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

module.exports = {
    product,
    writeData,
    getData
}