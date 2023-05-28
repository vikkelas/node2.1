const express = require('express');
const store = require("../store");
const Book = require("../model/book");
const router = express.Router();
const fileMulter = require('../middleware/file')
const fs = require('fs');

router.get('/', (req, res)=>{
    res.status(200).send({
        data: store,
        meta: {
            allBooks: store.length
        }
    });
});

router.get('/:id', (req, res)=>{
    const {id} = req.params;
    const book = store.find(i=>i.id===id)
    if(!book){
        res.status(404).send({
            error: {
                message: 'книга не найдена'
            }
        })
    }
    res.status(200).send({
        data: book
    });
});

router.post('/',
    fileMulter.single('book'),
    (req, res)=>{
    const {
        title,
        description,
        authors,
        favorite,
        fileCover,
    } = req.body;
    const book = new Book(title, description, authors, favorite, fileCover );
    if(req.file){
        book.fileName = req.file.name
        book.fileBook = req.file.path
    }

    store.push(book);
    res.status(200).send(book)
})

router.delete('/:id', (req, res)=> {
    const {id} = req.params;
    const index = store.findIndex(i=>i.id===id)
    store.splice(index, 1)
    res.sendStatus(200).ok
})
router.get('/:id/download',(req, res)=>{
    const {id} = req.params;
    const index = store.findIndex(i=>i.id===id)
    if(index===-1){
        res.status(404).send({
            error: {
                message: 'Такой книги не существует'
            }
        })
    }
    const pathFile = store[index].fileBook;
    fs.readFile(pathFile, (err, data)=>{
        if(err){
            res.statusCode = 404;
            res.end("Resourse not found!");
        }
        else{
            res.end(data);
        }
    })
})
router.put('/:id', (req, res)=>{
    const {id} = req.params;
    const bodyReq = req.body;
    const index = store.findIndex(i=>i.id===id)
    if(index===-1){
        res.status(404).send({
            error: {
                message: 'Такой книги не существует'
            }
        })
    }
    for(let key in bodyReq){
        if(store[index][key]&&key!=='id'){
            store[index][key]=bodyReq[key]
        }
    }
    res.status(201).send({
        data: store[index]
    })

})

module.exports = router;