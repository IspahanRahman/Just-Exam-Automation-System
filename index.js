const express=require('express');
const passport=require('passport')
const authroutes=require('./routes/auth-routes')
const keys=require('./config/keys')
const cookieSession=require('cookie-session')
require('./config/database')
require('./config/passport-setup')
const app=express();

app.set('view engine','ejs')

app.use(cookieSession({
    maxAge: 24*60*60,
    keys:[keys.session.cookieKey]
  }));
app.use(passport.initialize())
app.use(passport.session())

app.use('/auth',authroutes)
app.get('/',(req,res)=>res.render('home'))


app.listen(8080,()=>console.log(`Server is running port on 8080`))