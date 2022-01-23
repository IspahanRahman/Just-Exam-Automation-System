exports.loginPostController=async (req,res,next)=>{
    let{email,password}=req.body
    let errors=validationResult(req).formatWith(errorFormatter)

    if(!errors.isEmpty()){
        req.flash('fail','Please Check Your form')
        return res.render('pages/login',{
            error:errors.mapped(),
            flashMessage:Flash.getMessage(req)
            
        })
    }
    try {
       let user=await Register.findOne({email})
       if(!user){
           req.flash('fail','Please Provide Valid Credentials')
           return res.render('pages/login',{
               error:{},
               flashMessage:Flash.getMessage(req)
           })
       }
       let match=await bcrypt.compare(password,user.password)
       if(!match){
           req.flash('fail','Please Provide valid Credentials')
          return res.render('pages/login',{
               error:{},
               flashMessage:Flash.getMessage(req)
           })
       }
    
       req.session.isLoggedIn=true
       req.session.user=user
       req.session.save(err => {
           if(err){
               console.log(err)
               return next(err)
           }
           req.flash('success','Successfully LoggedIn')
           res.redirect('/')
       })
        
    } catch(e) {
        next(e)
    }
}