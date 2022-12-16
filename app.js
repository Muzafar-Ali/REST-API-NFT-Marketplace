
//IMPORTS
const { json } = require('express');
const express = require('express');
const fs = require('fs')

//create serever
const app = express()
//use middleware this will provide data in POST METHOD
app.use(express.json())

//create port we can add any number 5000/3000
const port = 3000;
app.listen(port,()=>{console.log(`App is running on Port ${port}`)})

const nfts = JSON.parse(fs.readFileSync(`${__dirname}/nft-data/data/nft-simple.json`)) //coverted to JSON object
const addNfts = JSON.parse(fs.readFileSync(`${__dirname}/nft-data/data/addData.json`)) //coverted to JSON object

//create get Request All NFTS
const getAllNfts = ((req,res)=>{
  res.status(200).json({
    status:'Succes',
    addNfts
  })
})

//create GET Request for Single NFT
const getSingleNft = ((req,res)=>{
  //convert received id to nummber
  const receivedId = req.params.id * 1; // or as follow
  //const receivedId = Number(req.params.id)
  
  const nft = addNfts.find((x)=> x.id === receivedId);
  
  if(!nft){
    return res.status(404).json({
      status:"Failed",
      message:"No NFT with such id"
    })
  }
  res.status(200).json({
    status:'Success',
    
    nft
    
  })
})

//create POST Method to create NFTs
const createNft = ((req,res)=>{
  const nftId = addNfts[addNfts.length - 1].id + 1
  const newNFTs = Object.assign({id:nftId},req.body)
  addNfts.push(newNFTs)
  
  fs.writeFile(
    `${__dirname}/nft-data/data/addData.json`,
    JSON.stringify(addNfts), 
    (err) =>{
      res.status(201).json({
        status:'success',
        nft:newNFTs
      });
    });
  })
  
  // cretae PATCH Method - update only price of NFT
  const updateNfts = ((req,res)=>{
    // just testing will add logic later
    const receivedId = Number(req.params.id)
    const nft = addNfts.find((x)=> x.id === receivedId);
    if(!nft){
      return res.status(404).json({
        status:"Failed",
        message:"No NFT with such id"
      })
    }
    res.status(200).json({
      status:'success',
      message:'Update NFT Price'
    })
  })
  
  // cretae DELETE Method
  const deteleNfts = ((req,res)=>{
    // just testing will add logic later
    const receivedId = Number(req.params.id)
    const nft = addNfts.find((x)=> x.id === receivedId);
    if(!nft){
      return res.status(404).json({
        status:"Failed",
        message:"No NFT with such id"
      })
    }
    res.status(200).json({
      status:'success',
      message:'DELETE NFT Price'
    })
  })
  
  
  app.route('/api/v1/nfts').get(getAllNfts).post(createNft)
  app.route('/api/v1/nfts/:id').get(getSingleNft).patch(updateNfts).delete(deteleNfts)
  