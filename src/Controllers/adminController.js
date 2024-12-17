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
  

  
  export const createRole = async (req, res) => {
    const { name, permissionID } = req.body;
  
    // Ensure role name is provided
    if (!name) {
      return res.status(400).json({ error: 'Role name is required' });
    }
  
    // Ensure permissionID is provided
    if (!permissionID) {
      return res.status(400).json({ error: 'Permission ID is required' });
    }
  
    try {
      // Check if the role already exists
      const existingRole = await prisma.role.findUnique({
        where: { name: name },
      });
  
      // If the role exists, return a 400 error
      if (existingRole) {
        return res.status(400).json({ error: 'Role with this name already exists' });
      }
  
      // Create the new role in the database
      const newRole = await prisma.role.create({
        data: {
          name: name,
          permission: {
            connect: { id: permissionID },  // Connect to the existing permission by ID
          },
        },
      });
  
      // Return the newly created role in the response
      return res.status(201).json({ role: newRole });
    } catch (error) {
      // Log the error and respond with an error message
      console.error(error);
      return res.status(500).json({ error: 'Failed to create role' });
    }
  };
  
  
  export const createStaff = async (req, res) => {
    const { name, email, password , roleId} = req.body;
  
    // Ensure role name is provided
    if (!name) {
      return res.status(400).json({ error: 'Role name is required' });
    }
  
    try {
      // Check if the role already exists
      const existingRole = await prisma.staff.findUnique({
        where: { email: email },
      });
  
      // If the role exists, return a 400 error
      if (existingRole) {
        return res.status(400).json({ error: 'Role with this name already exists' });
      }
  
      // Create the new role in the database
      const newStaff = await prisma.staff.create({
        data: {
          name: name,
          email:email,
          password:password,
          roleId:roleId,
       

        },
      });
  
      // Return the newly created role in the response
      return res.status(201).json({message:"new Staff", role: newStaff });
    } catch (error) {
      // Log the error and respond with an error message
      console.error(error);
      return res.status(500).json({ error: 'Failed to create role' });
    }
  };
  
  
  export const createPermission = async (req, res) => {
    const { name} = req.body;
  
    // Ensure role name is provided
    if (!name) {
      return res.status(400).json({ error: 'permission  name is required' });
    }
  
    try {
      // Check if the role already exists
      const existingRole = await prisma.permission.findUnique({
        where: { name: name },
      });
  
      // If the role exists, return a 400 error
      if (existingRole) {
        return res.status(400).json({ error: 'Role with this name already exists' });
      }
  
      // Create the new role in the database
      const newPermission = await prisma.permission.create({
        data: {
          name: name
        }
      });
  
      // Return the newly created role in the response
      return res.status(201).json({message:"new Permission", permission: newPermission });
    } catch (error) {
      // Log the error and respond with an error message
      console.error(error);
      return res.status(500).json({ error: 'Failed to create role' });
    }
  };
  
 
  
  export const getStaffWithRoles = async (req, res) => {
    try {
      // Fetch staff data with related role information
      const staffWithRoles = await prisma.staff.findMany({
        include: {
          role: {include :{
            permission:true
          }   
        }
          // Include the related role data for each staff
        
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
  


