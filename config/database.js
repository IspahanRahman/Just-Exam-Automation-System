const {Sequelize,DataTypes}=require('sequelize')

const sequelize=new Sequelize('just_exam_automation','root','',{
    host:'localhost',
    dialect:'mysql',
    pool:{max:5,min:0,idle:10000}
})

sequelize.authenticate()
.then(()=>{
    console.log("Connection has been established successfully.")
})
.catch(err=>{
    console.log("Unable to connect to the database"+err);
})

const db={}

db.Sequelize=Sequelize
db.sequelize=sequelize

db.sequelize.sync({force:false})
.then(()=>{
    console.log("yes re-sync")
})

db.users=require('../model/users')(sequelize,DataTypes);
db.courses=require('../model/course')(sequelize,DataTypes);

module.exports=db;
