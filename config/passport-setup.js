const passport=require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys=require('./keys')
const db=require('../config/database')
const Users=db.users

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id.then((user)=>{
      done(null, user);
    }));
  });

passport.use(new GoogleStrategy({
    clientID:keys.google.clientID,
    clientSecret: keys.google.clientSecret,
    callbackURL: "/auth/google/redirect"
  },
  function(accessToken, refreshToken, profile, done) {
    Users.findOne({where:{googleId:profile.id}})
    .then((currentUser)=>{
      if(currentUser){
        console.log('user is :',currentUser)
        done(null,currentUser)
      }
      else{
        new Users({
          googleId:profile.id,
          name:profile._json.name,
        }).save().then((newUser)=>{
            console.log('new user created:'+newUser)
            done(null,newUser)
        })
      }
    })
    
  }
));









// const passport=require('passport')
// const GoogleStrategy=require('passport-google-oauth20')
// const keys=require('./keys')
// const db=require('../config/database')
// const Users=db.users

// passport.serializeUser((user,done)=>{
//     done(null,user.id);
// })

// passport.deserializeUser(async(id,done)=>{
//     await Users.findByPk(id).then((user)=>{
//         done(null,user)
//     })
// })


// passport.use(
//     new GoogleStrategy({
//           clientID:keys.google.clientID,
//     clientSecret: keys.google.clientSecret,
//     callbackURL: "/auth/google/redirect"
//     },async(accessToken,refreshToken,profile,done)=>{
//         //console.log('passport callback fuction call')
//         //console.log(profile.emails[0].value)
//         console.log(profile)
       
//         // validate the email for just institute email (teacher: just.edu.bd , student:student.just.edu.bd)
//         if(profile._json.hd=='just.edu.bd'|| profile._json.hd=='student.just.edu.bd'||profile.emails[0].value=='samiulcse2018@gmail.com'){
//             const user=await Users.findOne({where:{googleId:profile.id}})

//         if(user){
//             //console.log('user already registered',user)
//             done(null,user)
//         }else{
//             try{
//                 let role='';
//                 let student_id=''
//                 let department_name=''
               
//                 if(profile._json.hd=='just.edu.bd'){
//                     role='teacher'
//                 }else if(profile._json.hd=='student.just.edu.bd'){
//                     role='student'
//                     let profile_email=profile._json.email
//                     let split_email=(profile_email.split('@'))[0].split('.')
//                     //console.log(split_email)
//                     student_id=split_email[0]
//                     department_name=split_email[1]
//                 }

//                 const new_user=await Users.create({
//                     googleId:profile.id,
//                     name:profile._json.name,
//                     avatar:profile._json.picture,
//                     department_id:'',
//                     student_id:student_id,
//                     email:profile._json.email,
//                     phone_number:'',
//                     bank_account:'',
//                     current_designation:'',
//                     department_name:department_name,
//                     university_name:'just',
//                     role:role,
//                     status:'active'
//                 })
//                 if(new_user){
//                     //console.log(new_user)
//                     done(null,new_user)
//                 }else{
//                     console.log('user create fail')
//                 }
//             }catch(e){
//                 console.log(e)
//             }
//         }

//         }else{
//             console.log('it is not just instutute email')
//         }

//     })
// )