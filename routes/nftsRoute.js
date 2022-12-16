const express = require('express')
const nftConrtollers = require('../controllers/nftControllers')

const router = express.Router();

router.route('/').get(nftConrtollers.getAllNfts).post(nftConrtollers.createNft)
router.route('/:id').get(nftConrtollers.getSingleNft).patch(nftConrtollers.updateNfts).delete(nftConrtollers.deteleNfts)

module.exports = router 