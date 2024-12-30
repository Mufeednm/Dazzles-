import prisma from "../../database/db.config.js";


export const createPermission = async (req, res) => {
    const { name} = req.body;
  
    // Ensure role name is provided
    if (!name) {
      return res.status(400).json({ error: 'permission  name is required' });
    }
  
    try {
      // Check if the role already exists
      const existingRole = await prisma.global_permission.findFirst({
        where: { permission : name },
      });
  
      // If the role exists, return a 400 error
      if (existingRole) {
        return res.status(400).json({ error: 'Role with this name already exists' });
      }
  
      // Create the new role in the database
      const newPermission = await prisma.global_permission.create({
        data: {
          permission : name
        }
      });
  
      // Return the newly created role in the response
      return res.status(201).json({message:"new Permission", permission: newPermission });
    } catch (error) {
      // Log the error and respond with an error message
      console.error(error);
      return res.status(500).json({ error: 'Failed to create permission' });
    }
  };


  export const allpermission =async(req,res)=>{
    try {
  const allCitys= await prisma.global_permission.findMany () 
  return  res.json ({status:200,message:" all  permisson ",data:allCitys})
} catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to Show all events' }); 
}}
