const express = require('express')
const nftConrtollers = require('../controllers/nftControllers')

const router = express.Router();

//params middleware for NFT id call
router.param("id",nftConrtollers.checkId)

router.route('/')
.get(nftConrtollers.getAllNfts)
.post(nftConrtollers.checkBody, nftConrtollers.createNft)
  
router.route('/:id').get(nftConrtollers.getSingleNft).patch(nftConrtollers.updateNfts).delete(nftConrtollers.deteleNfts)

module.exports = router 