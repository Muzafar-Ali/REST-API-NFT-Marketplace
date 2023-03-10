const { json } = require('express');
const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const nftsRouter = require('./routes/nftsRoute')
const usersRouter = require('./routes/usersRoute')

//create serever
const app = express()
//use middleware this will provide data in POST METHOD
app.use(express.json())
//run mrogan only in development env
if(process.env.NODE_ENV === "development"){
  app.use(morgan('dev'))
}

//Serving TEMPLATE Demo
app.use(express.static(`${__dirname}/nft-data/img`));

//crete custome MIDDLEWARE
app.use((req,res,next)=>{
  console.log('Hello from Middleware')
  next();
})

// middleware for Timestamp whenever hits getAllNft request
app.use((req,res,next)=>{
  req.requestTime = new Date().toString();
  next();
})

//ROUTERS
app.use('/api/v1/nfts',nftsRouter)
app.use('/api/v1/users',usersRouter)

module.exports= app