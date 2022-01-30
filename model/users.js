
module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define('users', {
        googleId: {
            type: DataTypes.STRING
        },
        name: {
            type: DataTypes.STRING
        },
        avatar: {
            type: DataTypes.STRING
        },
        department_id: {
            type: DataTypes.STRING
        },
        student_id: {
            type: DataTypes.STRING
        },
        session: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        phone_number: {
            type: DataTypes.STRING
        },
        bank_account: {
            type: DataTypes.STRING
        },
        current_designation: {
            type: DataTypes.STRING
        },
        department_name: {
            type: DataTypes.STRING
        },
        university_name: {
            type: DataTypes.STRING
        },
        role: {
            type: DataTypes.STRING
        },
        status: {
            type: DataTypes.STRING
        }
    }, {
        timestamps: true
    })
    return Users
}