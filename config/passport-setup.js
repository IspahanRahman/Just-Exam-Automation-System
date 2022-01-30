require('dotenv').config()
const passport=require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys=require('./keys')
const db=require('../config/database')
const Users=db.users

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    Users.findOne({id})
    .then((user)=>{
      done(null,user)
    })
  });

passport.use(new GoogleStrategy({
    clientID:keys.google.clientID,
    clientSecret: keys.google.clientSecret,
    callbackURL: "/auth/google/redirect"
  },async(accessToken,refreshToken,profile,done)=>{
      console.log(profile)
    // validate the email for just institute email (teacher: just.edu.bd , student:student.just.edu.bd)
    if(profile._json.hd=='just.edu.bd'|| profile._json.hd=='student.just.edu.bd' || profile._json.email=='170117.cse@student.just.edu.bd'){
        const user=await Users.findOne({where:{googleId:profile.id}})

        if(user){
            // console.log('user already registered',user)
            done(null,user)
        }else{
            try{
                let role='';
                let student_id=''
                let department_name=''
                let department_id=''
                let session=''
               if(profile.emails[0].value=='170117.cse@student.just.edu.bd'){
                   role='01'
               }
               else if(profile._json.hd=='just.edu.bd'){
                    role='02'
                }else if(profile._json.hd=='student.just.edu.bd'){
                    role='03'
                    let profile_email=profile._json.email
                    let split_email=(profile_email.split('@'))[0].split('.')
                    //console.log(split_email)
                    student_id=split_email[0]
                    department_name=split_email[1]
                    department_id=split_email[0].substring(2,4)
                    session=split_email[0].substring(0,2)
                }
                //console.log(department_id+" "+session)

                const new_user=await Users.create({
                    googleId:profile.id,
                    name:profile._json.name,
                    avatar:profile._json.picture,
                    department_id:department_id,
                    student_id:student_id,
                    session:session,
                    email:profile._json.email,
                    phone_number:'',
                    bank_account:'',
                    current_designation:'',
                    department_name:department_name,
                    university_name:'just',
                    role:role,
                    status:'1'
                })
                if(new_user){
                    //console.log(new_user)
                    done(null,new_user)
                }else{
                    console.log('user create fail')
                }
            }catch(e){
                console.log(e)
            }
        }

        }else{
            console.log('it is not just instutute email')
        }

    })
)