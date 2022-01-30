const router=require('express').Router()
const{
    formController,
    getAllCourses,
    getSingleCourse,
    updateCourse,
    deleteCourse
}=require('../controller/formController')

router.post('/',formController)
router.get('/',getAllCourses)
router.get('/:id',getSingleCourse)
router.put('/:id',updateCourse)
router.get('/delete/:id',deleteCourse)

module.exports=router