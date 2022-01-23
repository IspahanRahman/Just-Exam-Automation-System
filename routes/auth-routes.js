const router=require('express').Router()
const passport=require('passport')
//auth login
router.get('/login',(req,res)=>{
    res.render('login');
})
//auth logout
router.get('/logout',(req,res)=>{
    res.send('logging out')
})
router.get('/google',passport.authenticate('google',{
    scope:['profile','email']
}))

router.get('/google/redirect',passport.authenticate('google'),(req,res)=>{
    res.send('you reached the callback URI')
})
module.exports=router;