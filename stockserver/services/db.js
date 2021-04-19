const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/stock_details",{useNewUrlParser:true,useUnifiedTopology:true})

const stock = mongoose.model('stock',{
     companyName:String,
     symbols:String,
     marketCap:String,
     currentPrice:String 
})
module.exports = { 
    stock
}
