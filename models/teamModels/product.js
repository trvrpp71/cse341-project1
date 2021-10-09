const fs = require('fs');
const path = require('path');

const p = path.join(path.dirname(process.mainModule.filename),
'data', 
'products.json'
);

const getProductsFromFile = (cb) => {

    fs.readFile(p,(err,fileContent) => {
        if(err) {
            cb([]);    
        } else {
            cb(JSON.parse(fileContent));
        }
    });
}

module.exports = class Product {
    constructor(tags, imageUrl, price, name, description) {
        this.tags = tags;
        this.imageUrl = imageUrl;
        this.price = price;
        this.name = name;  
        this.description = description;
    }

    static fetchAll(cb) {
        getProductsFromFile(cb);
    }

    static search(query, cb) {

        getProductsFromFile((products) => {
    
            const filteredProducts = products.filter((product) => {
                
                let tagFound = false;
                
                product.tags.forEach((tag) => {
                    if (tag.toLowerCase().includes(query)) 
                        tagFound = true;
                });

                return (
                    tagFound ||
                    product.name.toLowerCase().includes(query) ||
                    product.description.toLowerCase().includes(query)
                );

            });

            cb(filteredProducts);
        })
    }

};
