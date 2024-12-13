import prisma from "../database/db.config.js"

export const createAdmin =async(req,res)=>{
    const {name ,email,password}=req.body
  
   
 
  
  const newUser = await prisma.admin.create ({
      data:{
          name:name,
          email:email,
          password:password
      }
      
    }) 
  
  return  res.json ({status:200,data:newUser,message:" new user "})
  } 