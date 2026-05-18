const  userModel =require('../../models/userModel');
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function userSignInController(req,res){
 try{
  const {email,password} = req.body

  if(!email){
    throw new Error("please provide email")
  }
  if(!password){
    throw new Error("please provide password")
  }

  const user = await userModel.findOne({email})

  if(!user){
    throw new Error("User not Found")
  }

const checkpassword = await bcrypt.compare(password,user.password)

if(checkpassword){
const tokenData={
  _id:user._id,
  email:user.email,
}
 const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 * 8 }); 

const tokenOption={
  httpOnly:true, 
  secure:true,
  sameSite:"none",
}


res.cookie("token",token,tokenOption).json({
  message:"Login successfully",
  data:token,
  success:true,
  error:false,
 })

}else{
  throw new Error("please check password")
}

console.log("checkpassword",checkpassword)

}catch(err){
 res.json({
 message:err.message||err, 
 error:true,
 success:false
 })
 }
}

module.exports = userSignInController