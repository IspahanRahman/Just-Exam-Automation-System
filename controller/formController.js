const db=require('../config/database')
const Course=db.courses
exports.formController=async(req,res,next)=>{
    try{
        let arr=[];
        let input_course={}
       for(let i=0;i<req.body.course_name.length;i++){
        input_course['course_name']=req.body.course_name[i];
        input_course['course_code']=req.body.course_code[i];
        input_course['course_credit']=req.body.course_credit[i];
        input_course['course_type']=req.body.course_type[i];
        input_course['session_id']=req.body.session_id[i];
        input_course['department_id']=req.body.department_id[i];
        arr.push(input_course)
        input_course={}
    }
    
    let result=await Course.bulkCreate(arr)
    if(result){
        console.log(result)
    }
    }catch(e){
        console.log(e)
        next(e)
    }
    res.redirect('/profile/save')
}

exports.getAllCourses=(req,res)=>{
    Course.findAll({
        order: [
            ['id', 'ASC'],
            
        ],
        attributes: ['id', 'course_name', 'course_code', 'course_credit','course_type','session_id', 'department_id']
    })
    .then(courses=>{
        res.render('pages/course_add/dynamic_form_add',{courses,error:{}})
    })
    .catch(e=>{
        console.log(e)
        res.json({
            message:'Error occurred'
        })
    })
}
exports.getSingleCourse=(req,res)=>{
   console.log(req.params.id)
   Course.findOne({
        where:{
            id:req.params.id
        },
        order: [ [ 'id', 'ASC' ]],
    })
    .then(course=>{

        res.json(course)
    })
    .catch(e=>{
        console.log(e)
        res.json({
            message:'Error occurred'
        })
    })
}

exports.updateCourse=(req,res)=>{
    let {course_name,course_code,course_credit,course_type,session_id,department_id}=req.body
    let {id}=req.params

    Course.update({
        where:{
            id:id
        },
        $set:{
            course_name,course_code,course_credit,course_type,session_id,department_id
        },
      
    })
    .then(course=>{
        res.json(course)
    })
    .catch(e=>{
        console.log(e)
        res.json({
            message:'Error occurred'
        })
    })
}

exports.deleteCourse=(req,res)=>{
    let{id}=req.params
    Course.destroy({
        where:{
            id:id
        }
    })
        .then(()=>{
        Course.findAll()
        .then(courses=>{
            res.redirect('/profile/save')
            console.log(courses)

        })
       
    })
    .catch(e=>{
        console.log(e)
        res.json({
            message:'Error occurred'
        })
    })

}
