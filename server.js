const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');


mongoose.connect(process.env.MONGODB_ATLAS_URL)
.then(()=>{
        console.log("connect successfully");

})
.catch( (err)=>{
    console.log("problem in connect",err.message,err);
    mongoose.disconnect();
})
const app = express();
const port = process.env.PORT || 3000;

let tasks = require('./routes/tasks/');
let users = require('./routes/users/');


app.use("/images",express.static(path.join('images')));
app.use("/",express.static(path.join('todolist-mean-frontend')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());
app.set('port',port);

app.use('/api/tasks/',tasks);
app.use('/api/users/',users);
app.use((req,res,next)=>{
        res.sendFile(path.join(__dirname,'todolist-mean-frontend','index.html'));
})

const server = http.createServer(app);
server.on('error',(err)=>{
        console.log("error in server",err.message,err);
})
server.on('listening',()=>{
        console.log("I am listening on port",port);
})
server.listen(port)

