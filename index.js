const express = require('express');
const app = express();
const Book = require('./model/book');
const store = require('./store');

app.use(express.json())

app.post('/api/user/login',(req, res)=>{
    res.status(201).send({
        id: 1,
        mail: "test@mail.ru"
    })
})
app.get('/api/books', (req, res)=>{
    res.status(200).send({
        data: store,
        meta: {
            allBooks: store.length
        }
    });
});

app.get('/api/books/:id', (req, res)=>{
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

app.post('/api/books', (req, res)=>{
    const {
        title,
        description,
        authors,
        favorite,
        fileCover,
        fileName
    } = req.body;
    const book = new Book(title, description, authors, favorite, fileCover, fileName );
    store.push(book);
    res.status(200).send(book)
})

app.delete('/api/books/:id', (req, res)=> {
    const {id} = req.params;
    const index = store.findIndex(i=>i.id===id)
    store.splice(index, 1)
    res.sendStatus(200).ok
})

app.put('/api/books/:id', (req, res)=>{
    const {id} = req.params;
    const bodyReq = req.body;
    console.log()
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

app.listen(5000);

