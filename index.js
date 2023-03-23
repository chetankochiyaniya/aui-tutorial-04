var mongoose = require('mongoose')
var express = require('express')
var route = require('./routes')
var bodyParser =require('body-parser')
mongoose.connect('mongodb://ckochiyaniya:test12345@cluster0-shard-00-00.lld3n.mongodb.net:27017,cluster0-shard-00-01.lld3n.mongodb.net:27017,cluster0-shard-00-02.lld3n.mongodb.net:27017/?ssl=true&replicaSet=atlas-13nykk-shard-0&authSource=admin&retryWrites=true&w=majority').then(()=>{
    console.log('connected')

    app = express();
    app.use(bodyParser.urlencoded({extended:false}))
    app.use('/api',route)
    
    app.get('/', (req,res)=>{
        res.sendFile('index.html',{root:__dirname})
    })

    app.listen((process.env.PORT||3000),()=>{
        console.log('server started')
    })
}).catch((e)=>{
    console.log(e.toString())
})
