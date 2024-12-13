import prisma from "../database/db.config.js"

export const createCustomer =async(req,res)=>{
    const {name ,email,mobile_number ,memberShip}=req.body
  
  const newUser = await prisma.customers.create ({
      data:{
          name:name,
          email:email,
          mobile_number:mobile_number , 
          memberShip:memberShip
      }    
    }) 
  return  res.json ({status:200,data:newUser,message:" new Customers "})
  } 