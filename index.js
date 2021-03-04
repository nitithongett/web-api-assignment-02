const express = require('express')
const app = express()

app.use(express.json())
let books = [] 

app.get('/books', (req, res) => {
    //input*

    //process*

    //output*
    res.status(200).json(books)
})


app.get('/books/:id', (req, res) =>{
    //input*
    let id = req.params.id

     let book = {} 

    //process*
    book = books[id] 

    //output*
    res.status(200).json(book)

})

app.post('/books', (req, res) => { 

    //input*
    let newtitle = req.body.title 
    let newprice = req.body.price 
    let newunit = req.body.unit 
    let newisbn = req.body.isbn 
    let newimageurl = req.body.imageurl 

    //key:value
    let newBook = {
        title: newtitle, 
        price: newprice,
        unit: newunit,
        isbn: newisbn,
        imageurl: newimageurl,
    }
    let bookID = 0


    //process*
   books.push(newBook) 
   bookID = books.length - 1 

    //output*

    res.status(201).json(bookID)
})

const port = 3000
app.listen(port, () => console.log(`Server started again at ${port}`))