require('dotenv').config();
const passport=require('passport')
const express=require('express')
const keys=require('./config/keys')
const cookieSession=require('cookie-session')
const authroutes=require('./routes/auth-routes')
const profileroutes=require('./routes/profile-routes')
const formroute=require('./routes/formroute')
const setMiddleware=require('./middleware/middleware')
//const cookieKey=process.env.cookieKey

require('./config/database')
require('./config/passport-setup')
 
const app=express();

app.set('view engine','ejs')
app.set('views')



app.use(cookieSession({
    maxAge: 24*60*60,
    keys:[keys.session.cookieKey]
  }));
  app.use(passport.initialize())
  app.use(passport.session())
  setMiddleware(app)


app.use('/auth',authroutes)
app.use('/profile',profileroutes)
app.use('/profile/save',formroute)
app.get('/',(req,res)=>res.render('pages/homepage/home',{title:"Just Exam Automation System",user:req.user}))

const PORT=process.env.PORT
app.listen(PORT,()=>console.log(`Server is running port on 8080`))