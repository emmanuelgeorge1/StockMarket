
const dataService = require('./services/data.service');

const session = require('express-session');

const express= require('express');
const cors = require('cors');

const app = express();

const PORT= process.env.PORT ||  5000;



app.use(cors({
  origin:"*",
  credentials:true
}))

 app.use(session({
     secret: 'randomsecurestring',
     resave: false,
     saveUninitialized: false

 }))

app.use(express.json());


app.get('/getStock',(req,res)=>{
    dataService.getStockDetails()
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
})

app.post('/saveStock',(req,res)=>{
    dataService.savStockDetails(req.body.companyName,
        req.body.symbols,
        req.body.marketCap,
        req.body.currentPrice)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
})

app.put('/',(req,res)=>{
    res.send("Put method");
})

app.patch('/',(req,res)=>{
    res.send("Patch method");
})

app.delete('/deleteStock',(req,res)=>{
    dataService.deleteStockDetails(req.body.symbols)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
})

app.listen(PORT, ()=> console.log('Server Listening on port ' + PORT))

