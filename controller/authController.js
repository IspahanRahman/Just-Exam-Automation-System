
exports.loginController=(req,res)=>{
    res.render('pages/auth/login',{title:'Login page',user:req.user});
}

exports.logoutController=(req,res)=>{
    req.logout()
    res.redirect('/')
}
