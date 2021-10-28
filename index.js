const express = require('express')
const { MongoClient } = require('mongodb');
const cors = require('cors')
require('dotenv').config()


const app = express()
const port = 4700

app.use(cors())
app.use(express.json())

// userName = carMechanic1
// password = gb5JIrYz4sRPiAZU



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ox5tn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run(){
    try{
        await client.connect()
        console.log('connected');

        const database = client.db("carMechanics");
        const haiku = database.collection("services");
        //get api
        app.get('/services', async(req,res)=> {
          const cursor = haiku.find({})
          const services = await cursor.toArray()
          res.send(services)
        })
        // get one 
        app.get("/services/:Id" , (req,res)=> {
          const id = req.params.id
        })

        //Post Api
        app.post('/services',async(req,res)=> {
            const service = req.body

            const result = await haiku.insertOne(service)
            console.log('hit the post');
            res.send(result)

           
            // const result = haiku.insertOne(service)
            // console.log(result);
        })
    }
    finally{
        // await client.close()
    }
}
run().catch(console.dir)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})