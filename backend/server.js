// Importing
const express = require("express");
const app = express();
const mongoose = require("mongoose")
const Messages = require("./dbMessages.js");
const Pusher = require("pusher");
const cors = require("cors");


// app config
const port = process.env.PORT || 9000;

const pusher = new Pusher({
    appId: "<appID>",
    key: "<key>",
    secret: "<secret>",
    cluster: "eu",
    useTLS: true
  });


// Middleware
app.use(express.json());
app.use(cors());
// app.use((req,res,next)=>{
//     res.setHeader("Access-Control-Allow-Origin","*");
//     res.setHeader("Access_Control_Allow_Header","*");
//     next();
// })



// DB config
const connection_url = "<MONGODB API KEY>"

mongoose.connect(connection_url,{
    useCreateIndex: true,
    useNewUrlParser:true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("Connection Successful")
}).catch((e)=>{
    console.log(e)
});

// #####

const db = mongoose.connection;
db.once("open",()=>{
    console.log("DB is connected");
    const msgCollection = db.collection("messagecontents");
    const changeStream = msgCollection.watch();

    changeStream.on("change",(change)=>{
        console.log(change)

        if(change.operationType === 'insert'){
            const messageDetails = change.fullDocument;
            pusher.trigger("messages","inserted",{
                name:messageDetails.name,
                message:messageDetails.message,
                timestamp:messageDetails.timestamp,
                received:messageDetails.received
            });
        } else{
            console.log("Pusher Error")
        }

    });

});


// app routing
app.get("/",(req,res)=>{
    res.status(200).send("Hello World");
});

app.get("/messages/sync",(req,res)=>{
    Messages.find((err,data)=>{
        if(err){
            res.status(500).send(err)
        } else{
            res.status(200).send(data)
        }
    })
})


app.post("/messages/new",(req,res)=>{
    const dbMessage = req.body;

    Messages.create(dbMessage,(err,data)=>{
        if(err){
            res.status(500).send(err)
        } else{
            res.status(201).send(`new message created ${data}`)
        }
    })
})

// listening
app.listen(port,()=>{
    console.log(`Listening to the port: ${port}`)
});