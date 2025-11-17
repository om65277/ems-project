const { UserModel } = require("../models/userModel");
const { EmpModel } = require("../models/emp.model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const jwt_auth_secret = "@#$$$%$^&**@*()";

// random int function
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


// register controller
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if user already exists
    const existUser = await UserModel.findOne({ email });
    if (existUser) {
      throw new Error("User already registered");
    }

    // hash password
    const hash_pass = await bcryptjs.hash(password, 10);

    // create user
    const user = await UserModel.create({
      name,
      email,
      password: hash_pass
    });

    // generate token
    const token = jwt.sign(
      { userId: user._id },
      jwt_auth_secret,
      { expiresIn: "3d" }
    );

    res.send({ message: "Register Successfully", token });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
 
// userProfile controller
exports.UserProfile = async (req, res) => {
  try { 
    const user = await UserModel.findById(req.user).select("name email -_id");
    const employees = await EmpModel.countDocuments({user:req.user})
    return res.status(200).send({...user.toObject(),total_emp:employees});

  

  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// login controller
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existUser = await UserModel.findOne({ email });
    if (!existUser) {
      throw new Error("User not registered");
    }

    const isMatch = await bcryptjs.compare(password, existUser.password);

    if (!isMatch) {
      throw new Error("Invalid Credentials");
    }

    const token = jwt.sign(
      { userId:existUser._id },
      jwt_auth_secret,
      { expiresIn: "3d" }
    );

    res.send({ message: "Login Successfully", token });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};


// add employee controller

exports.addEmployee = async(req, res)=>{
  try {
    
    await EmpModel.create({
      ...req.body,
      user:req.user,
      empId:'EMP'+randomInt(111,999)+'ID'
    })

    res.status(200).send({message:"Employee Created"})

  } catch (error) {
    res.status(400).send({ error: error.message });
  }
}



// All Emp Controller

exports.allEmployees = async(req, res)=>{
  try {
    
    const employees =  await EmpModel.find({
      user:req.user,
    })

    res.status(200).send(employees)

  } catch (error) {
    res.status(400).send({ error: error.message });
  }
}


// DELETE Emp Controller


exports.deleteEmployee = async(req, res)=>{
  try {
    
    const id = req.params.id

    const dopc = await EmpModel.findByIdAndDelete(id)
    if (!dopc) {
      throw new Error("Employee Does Not Exist")
    }
    res.send({message:"Employee Add"})

  } catch (error) {
    res.status(400).send({ error: error.message });
  }
}



// Get Emp Details


exports.getEmployeeDetails = async(req, res)=>{
  try {
    
    const id = req.params.id

    const dopc = await EmpModel.findById(id)
    if (!dopc) {
      throw new Error("Employee Does Not Exist")
    }
    res.send(dopc)

  } catch (error) {
    res.status(400).send({ error: error.message });
  }
}


// Update Emp controller


exports.updateEmployee = async(req, res)=>{
  try {
    
    const id = req.params.id

    const dopc = await EmpModel.findByIdAndUpdate(id,{
      ...req.body
    })
    if (!dopc) {
      throw new Error("Employee Does Not Exist")
    }
    res.send({message:"Employee Updated"})

  } catch (error) {
    res.status(400).send({ error: error.message });
  }
}