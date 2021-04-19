
const db = require('./db');

const savStockDetails=(companyName,symbols,marketCap,currentPrice)=>{
  return db.stock.findOne({
    symbols}).then(savedStock=>{
     console.log(savedStock);
    if(savedStock){
      return{
        status:false,
        statusCode:422,
        message:"stock already exist"
      }
    }
      else{
         const newStock = new db.stock({
          companyName,
          symbols,
          marketCap,
          currentPrice
      });
      console.log(newStock);
      newStock.save() ;
  return {
      status:true,
      statusCode: 200,
      message: "Successful added " 
     
  }
}
})
}
const getStockDetails=()=>{
  return db.stock.find().then(savedStock=>{
     console.log(savedStock);

  return {
    status:true,
    statusCode: 200,
    message: "Successful added " ,
    savedStock:savedStock
  }
});
}

const deleteStockDetails=(symbol)=>{
     return db.stock.deleteOne( { symbol: symbol} ).then(savedStock=>{
       console.log(savedStock);
       return{
         status:true,
         statusCode:200,
         message:"Stock Deleted",
       }
     });
}
        module.exports ={

          savStockDetails,
          getStockDetails,
          deleteStockDetails
           }