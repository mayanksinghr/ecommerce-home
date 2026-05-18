const userModel = require("../../models/userModel")

async function updateUser(req,res){
    try{ 
    const sessionUser = req.userid;

    const {userid,email,name,role} = req.body
    
    const payload = {...(email && {email: email}),
                     ...(name && {name: name}),   
                     ...(role && {role: role})
                    }

    const user = await userModel.findById(sessionUser);

    console.log("user.role",role);
    console.log("userid",userid)
    console.log("sessionUser",sessionUser)

    const updateUser =  await userModel.findByIdAndUpdate(userid,payload)
    
   console.log(updateUser)
    
    res.json({
        data:updateUser, 
        message:"user update",
        success:true,
        error:false
    })

    }catch(err){
        res.status(400).json({
            message:err.message||err,
            error:true,
            success:false
        })
    }

}

module.exports = updateUser;