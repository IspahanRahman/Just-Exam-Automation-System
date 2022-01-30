const router=require('express').Router()
const {authCheck}=require('../middleware/profileMiddleware')
const {
    homepageController
}=require('../controller/homePageController')

router.get('/',authCheck,homepageController)

module.exports=router