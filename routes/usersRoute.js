const express = require('express')

 const getAllUsers = ((req,res)=>{
  res.status(500).json({
    status:'error',
    message: 'intrenal server error'
  })
}) 

 const getSingleUser = ((req,res)=>{
  res.status(500).json({
    status:'error',
    message: 'intrenal server error'
  })
}) 

const createUser = ((req,res)=>{
  res.status(500).json({
    status:'error',
    message: 'intrenal server error'
  })
}) 

const updateUser = ((req,res)=>{
  res.status(500).json({
    status:'error',
    message: 'intrenal server error'
  })
}) 

const deleteUser = ((req,res)=>{
  res.status(500).json({
    status:'error',
    message: 'intrenal server error'
  })
}) 



const router = express.Router();

router.route('/').get(getAllUsers).post(createUser)
router.route('/:id').get(getSingleUser).patch(updateUser).delete(deleteUser)

module.exports = router 