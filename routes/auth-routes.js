const router=require('express').Router()
const passport=require('passport')
const{
    loginController,
    logoutController
}=require('../controller/authController')
//auth login
router.get('/login',loginController)
//auth logout
router.get('/logout',logoutController)

router.get('/google',passport.authenticate('google',{
    scope:['profile','email']
}))

router.get('/google/redirect',passport.authenticate('google'),(req,res)=>{
     //res.send(req.user)
    res.redirect('/profile/')
})
module.exports=router;