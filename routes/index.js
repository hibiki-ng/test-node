var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var router = express.Router();

const uri = "mongodb+srv://hibiki:test123@cluster0.akkrkpr.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

/* GET home page. */
router.get('/', (req, res) => {
  res.send('Homepage');
});

router.post('/insert', async (req, res) => {
  const data = req.body;
  console.log(data);
  const value = data.value;
  const user = data.user;

  const collection = client.db("test").collection(user);

  const lastDocument = await collection.findOne({}, { sort: { id: -1 } });
  const lastId = lastDocument ? Number.parseInt(lastDocument.id, 10) : 0;

  const newId = lastId + 1;
  const newData = {
    value: value,
    id: newId,
  };

  if (!user) {
    return res.status(400).send("Missing user parameter in request body");
  }


  console.log("data: ", data);
  console.log("value: ", value);
  console.log("user: ", user);
  console.log("lastId: ", lastId);
  console.log("newid: ", newId);
  console.log("collection: ", collection.namespace);
  
  collection.insertOne(newData)
      .then(result => {
          console.log("Value inserted into database");
          console.log("result:", result);
          console.log(res.headersSent); // Outputs: false
          res.send("Value inserted into database: " + value);
          console.log(res.headersSent); // Outputs: true
      })
      .catch(err => {
          console.log(err);
          return res.status(500).send("Error inserting data into database");
      });
});

router.post('/getData', (req, res) => {
  const user = req.body.user;
  const collection = client.db("test").collection(user);

  collection.find({}).toArray()
    .then(docs => {
      console.log("Data retrieved from database:", docs);
      res.send(docs);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send("Error retrieving data from database");
    });
});

router.post('/delete', (req, res) => {
  const data = req.body;
  const user = data.user;
  const id = data.id;

  if (!user) {
    return res.status(400).send("Missing user parameter in request body");
  }

  if (!id) {
    return res.status(400).send("Missing value parameter in request body");
  }

  const collection = client.db("test").collection(user);
  collection.deleteOne({ id: Number.parseInt(id) })
    .then(result => {
      if (result.deletedCount === 1) {
        console.log("Value deleted from database");
        res.send("Value deleted from database");
      } else {
        console.log("Value not found in database");
        res.send("Value not found in database");
      }
    })
    .catch(err => {
      console.log(err);
      return res.status(500).send("Error deleting data from database");
    });
});

module.exports = router;
