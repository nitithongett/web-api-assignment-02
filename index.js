const express = require('express')
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId
const app = express()

app.use(express.json())

const url = 'mongodb+srv://superadmin:0822135597@cluster0.e0aem.mongodb.net/book?retryWrites=true&w=majority'
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true })
let db,bookscollection

async function connect(){
    await client.connect()
    db = client.db('book')
    bookscollection = db.collection('books')
}
connect()

app.get('/books', async (req, res) => {
    //input*

    //process*
    const cursor = await bookscollection.find({})
    const result = await cursor.toArray()

    //output*
    res.status(200).json(result)
})


app.get('/books/:id', async (req, res) =>{
    //input*
    let id = req.params.id
    
    //process*
    const book = await bookscollection.findOne({ _id: ObjectId(id)})

    //output*
    res.status(200).json(book)

})


app.post('/books', async (req, res) => { 

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
    const result = await bookscollection.insertOne(newBook)
//    books.push(newBook) 
    bookID = result.insertedId
//    bookID = books.length - 1 

    //output*

    res.status(201).json(bookID)
})

const port = 3000
app.listen(port, () => console.log(`Server started again at ${port}`))

