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
  


  import prisma from "../../database/db.config.js";

  export const createCity =async(req,res)=>{
      const {city }=req.body
  
      try {
        const existingCity = await prisma.city.findFirst({
          where: { city: city },
        });
    
        if (existingCity) {
          return res.status(400).json({ error: "This City is  already exists" });
        }
     await prisma.city.create ({ data:{ city } }) 
    return  res.json ({status:200,message:" new city "})
  } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to add City' }); 
  } }
  
  
  
  export const allCity =async(req,res)=>{
      try {
    const allCitys= await prisma.city.findMany (
      {where:{isDeleted:false} }
      ) 
    return  res.json ({status:200,message:" all  Citys ",data:allCitys})
  } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to Show all events' }); 
  }}
  
  
  export const updateCity =async(req,res)=>{
    const id = parseInt( req.params.id)
    const {city }=req.body
      try {
        const existingCity = await prisma.city.findUnique({
          where: { cityId: id }, });
      
        if (!existingCity) {
          return res.status(400).json({ error: ' city is  not found  ' });}
  
     await prisma.city.update ({
      where :{cityId:id},
      
        data:{         
              city ,  
               update_at :new Date()
            
        }    
      }) 
    return  res.json ({status:200,message:" update events "})
  } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to update events' }); 
  }
    }
  
  
  
  
  export const deleteCity =async(req,res)=>{
    const id = parseInt( req.params.id)
      try {
        const existingCity = await prisma.city.findUnique({
          where: { cityId: id },
        });
      
        if (!existingCity) {
          return res.status(400).json({ error: 'city is  not found  ' });}
  
     await prisma.city.update ({
      where :{ cityId  :id},
      
        data:{         
          isDeleted:true
        }    
      }) 
    return  res.json ({status:200,message:" soft deleted  City "})
  } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to soft deleted City' }); 
  }
    }