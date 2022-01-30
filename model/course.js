
module.exports = (sequelize, DataTypes) => {
    const Courses = sequelize.define('courses', {
    
        course_name: {
            type: DataTypes.TEXT
        },
        course_code: {
            type: DataTypes.STRING
        },
        course_credit: {
            type: DataTypes.DOUBLE
        },
        course_type: {
            type: DataTypes.STRING
        },
        session_id: {
            type: DataTypes.INTEGER
        },
        department_id: {
            type: DataTypes.INTEGER
        },
      
    }, {
        timestamps: true
    })
    return Courses
}