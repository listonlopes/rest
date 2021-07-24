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
    getData
}