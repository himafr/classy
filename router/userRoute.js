const express =require("express")
const router= express.Router()
const userControllers=require('../controllers/userControllers')
router
  .route('/')
  .get(userControllers.logout)
  .post(userControllers.signup)
router
  .route('/:id')
  .get(userControllers.getUserInfo)
  .patch(userControllers.updateUser)
  .delete(userControllers.deleteUser)
router
  .route('/log')
  .post(userControllers.login)


module.exports=router

