const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

console.log(process.env.DB_USER);

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qfpc4js.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server (optional starting in v4.7)
        await client.connect();

        const productCollection = client.db('productDB').collection('apple');
        const samsungCollection = client.db('productDB').collection('samsung');
        const intelCollection = client.db('productDB').collection('intel');
        const sonyCollection = client.db('productDB').collection('sony');
        const googleCollection = client.db('productDB').collection('google');
        const huaweiCollection = client.db('productDB').collection('huawei');
        const MyCartCollection = client.db('mycartDB').collection('mycart');

        app.post('/apple', async (req, res) => {
            const newProduct = req.body;
            console.log(newProduct);
            const result = await productCollection.insertOne(newProduct);
            res.send(result);
        });
        app.post('/samsung', async (req, res) => {
            const newProduct = req.body;
            const result = await samsungCollection.insertOne(newProduct);
            res.send(result);
        });
        app.post('/intel', async (req, res) => {
            const newProduct = req.body;
            const result = await intelCollection.insertOne(newProduct);
            res.send(result);
        });

        app.post('/huawei', async (req, res) => {
            const newProduct = req.body;
            const result = await huaweiCollection.insertOne(newProduct);
            res.send(result);
        });

        app.post('/google', async (req, res) => {
            const newProduct = req.body;
            const result = await googleCollection.insertOne(newProduct);
            res.send(result);
        });
        app.post('/sony', async (req, res) => {
            const newProduct = req.body;
            const result = await sonyCollection.insertOne(newProduct);
            res.send(result);
        });
        app.post('/mycart/:productId', async (req, res) => {
            const newProduct = req.body;

            const result = await MyCartCollection.insertOne(newProduct);
            res.send(result);
        });

    
        app.delete('/mycart/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: id }
            const result = await MyCartCollection.deleteOne(query);
            res.send(result);
        })
        
        app.put('/apple/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) }
            const options = { upsert: true };
            const updatedProduct = req.body;

            const product = {
                $set: {
                    name: updatedProduct.name,
                    brand: updatedProduct.brand,
                    price: updatedProduct.price,
                    rating: updatedProduct.rating,
                    type: updatedProduct.type,
                    image: updatedProduct.image
                }
            }

            const result = await productCollection.updateOne(filter, product, options);
            res.send(result);
        })



        // Define a GET route to retrieve product data
        app.get('/apple', async (req, res) => {
            const products = await productCollection.find({}).toArray();
            res.json(products);
        });
        app.get('/samsung', async (req, res) => {
            const products = await samsungCollection.find({}).toArray();
            res.json(products);
        });
        app.get('/intel', async (req, res) => {
            const products = await intelCollection.find({}).toArray();
            res.json(products);
        });
        app.get('/huawei', async (req, res) => {
            const products = await huaweiCollection.find({}).toArray();
            res.json(products);
        });
    
        app.get('/mycart', async (req, res) => {
            const products = await MyCartCollection.find({}).toArray();
            res.json(products);
        });
        app.get('/apple/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await productCollection.findOne(query);
            res.send(result);
        });
        app.get('/samsung/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await samsungCollection.findOne(query);
            res.send(result);
        });
        app.get('/samsung/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await samsungCollection.findOne(query);
            res.send(result);
        });

    

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Running!')
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
