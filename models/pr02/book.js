const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data', 
    'books.json'
);

const getBooksFromFile = cb => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            cb([]);
        } else {
            cb(JSON.parse(fileContent));
        }
    });
};

module.exports = class Book {
    constructor(title, author, summary, price) {
        this.title = title;
        this.author = author;
        this.price = price;
        this.summary = summary;
    }

    save() {
        getBooksFromFile(books => {
            books.push(this);
            fs.writeFile(p, JSON.stringify(books), err => {
                console.log(err);
            });
        });
    }

    static fetchAll(cb) {
        getBooksFromFile(cb);
    }

}