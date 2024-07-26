const express =require('express')
const offersControllers=require('../controllers/offersControllers')
const router=express.Router()
router
.route('/')
.get(offersControllers.getAllOffers)
router
.route('/:id')
.get(offersControllers.getOffers)
.patch(offersControllers.editOffers)
.delete(offersControllers.deleteOffers)
module.exports=router