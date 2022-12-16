const fs = require('fs')

const nfts = JSON.parse(fs.readFileSync(`${__dirname}/../nft-data/data/nft-simple.json`)) //coverted to JSON object
const addNfts = JSON.parse(fs.readFileSync(`${__dirname}/../nft-data/data/addData.json`)) //coverted to JSON object

//middleware for NFT id request
exports.checkId = ((req, res, next, value)=>{
    console.log(`ID: ${value}`)
    if(req.params.id * 1 > addNfts.length){
        return res.status(404).json({
            status:"fail",
            message:"No NFT with such id"
        })
    }
    // //OR we can write logic as follow 
    // const receivedId = Number(req.params.id)
    // const nft = addNfts.find((x)=> x.id === receivedId);
    // if(!nft){
    //   return res.status(404).json({
    //     status:"Failed",
    //     message:"No NFT with such id"
    //   })
    // }   
    next();
})

exports.checkBody = ((req, res, next)=>{
    if(!req.body.name || !req.body.price){
        return res.status(400).json({
            status:'Fail',
            message:'Missing nams and price'
        })
    }
    next();
})

//create get Request All NFTS
exports.getAllNfts = ((req,res)=>{
  res.status(200).json({
    status:'Succes',
    requestTime: req.requestTime,
    addNfts
  })
})

//create GET Request for Single NFT
exports.getSingleNft = ((req,res)=>{
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
exports.createNft = ((req,res)=>{
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
  exports.updateNfts = ((req,res)=>{
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
  exports.deteleNfts = ((req,res)=>{

    res.status(200).json({
      status:'success',
      message:'DELETE NFT Price'
    })
  })
