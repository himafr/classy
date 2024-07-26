const express =require("express")
const router= express.Router()
const userControllers=require('../controllers/userControllers')
router
.route('/')
.get(userControllers.logout)
.post(userControllers.signup)
router
.route('/:id')
// .get()
// .patch()
// .delete()
router
.route('/log')
.post(userControllers.login)


module.exports=router

