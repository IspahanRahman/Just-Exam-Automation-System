const users = require("../model/users")

exports.homepageController=async(req,res,next)=>{
    if(req.user.role==='01'){
        return res.render('pages/homepage/admin_homepage',{title:"Admin Page",user:req.user})
    }
    else if(req.user.role==='02'){
        return res.render('pages/homepage/teacher_homepage',{title:"Teacher Page",user:req.user})
    }
    else if(req.user.role==='03'){
        return res.render('pages/homepage/student_homepage',{title:"Student Page",user:req.user})
    }
   // res.render('pages/homepage/admin_homepage')
    
}