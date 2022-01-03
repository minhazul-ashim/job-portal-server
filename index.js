const express=require('express');
const { MongoClient } = require('mongodb');
const ObjectId=require('mongodb').ObjectId;
require('dotenv').config();
const app=express();
const port=process.env.PORT || 5000;
const cors=require('cors');

app.use(cors());
app.use(express.json());

//Checking if Ashim is connected or not;

//<------------- Database Code Here ---------->

  const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pxp8q.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    
    async function run() {
      try {
        await client.connect();

        //<------------Database All Collection ------------->
 
        const database = client.db("Dev-Team-Job-Portal");
        const allJobs = database.collection("AllJobs");
        const featuredEmployee=database.collection("Featured")

        
        //<------------ Get Featured Employee ------------->

        app.get('/allJobs',async(req,res)=>{
          const getAllJobs=await allJobs.find({}).toArray();
          res.send(getAllJobs)
          console.log(getAllJobs);
        }); 





      } finally {
        // await client.close();
      }
    }
    run().catch(console.dir);
    
    app.get('/',(req,res)=>{
      res.send('Running Dev-Team-Job-Portal')
    });


app.listen(port,()=>{
    console.log("Running Server Port is",port);
});