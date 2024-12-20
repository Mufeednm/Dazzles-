import prisma from "../../database/db.config.js"

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
  
 
  
  export const getStaffWithRoles = async (req, res) => {
    try {
      const staffWithRoles = await prisma.staff.findMany({
        include: {
          role: {include :{
            permission:true
          }   
        }
        
      }
    }
      );
  
      // Return the staff with roles
      return res.status(200).json({ staff: staffWithRoles });
    } catch (error) {
      // Handle any errors
      console.error(error);
      return res.status(500).json({ error: 'Failed to fetch staff data' });
    }
  };
  


