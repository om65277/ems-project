const express = require("express")
const { registerUser, UserProfile,loginUser, addEmployee, allEmployees, deleteEmployee,getEmployeeDetails,updateEmployee } = require("../controllers/main.controller")
const { registerUserValidation,loginUserValidation,addEmpValidation,empId } = require("../validations/main.validation")
const { validationmiddleware } = require("../middleware/validationMiddleware");

const { authValidationMiddleware } = require("../middleware/authValidation");

const router = express.Router()

router.route('/register').post(registerUserValidation, validationmiddleware, registerUser)

router.route('/login').post(loginUserValidation, validationmiddleware, loginUser)

router.use(authValidationMiddleware)

router.route('/profile').get(authValidationMiddleware, UserProfile)

router.route('/add-emp')
.post(addEmpValidation,validationmiddleware,addEmployee)

router.route('/emp/:id')
.get(empId,validationmiddleware,getEmployeeDetails)
.delete(empId,validationmiddleware,deleteEmployee)
.put([...empId,addEmpValidation],validationmiddleware,updateEmployee)


router.route('/all-emp')
.get(allEmployees)

module.exports = router