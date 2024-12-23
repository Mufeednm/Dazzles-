import prisma from "../../database/db.config.js";

export const createRole = async (req, res) => {
    const { name, permissionIDs } = req.body;  
    if (!name) {
      return res.status(400).json({ error: 'Role name is required' });
    }
    if (!permissionIDs || !Array.isArray(permissionIDs)) {
      return res.status(400).json({ error: 'Permission IDs must be provided as an array' });
    }
  
    try {
      // Check if the role already exists
      const existingRole = await prisma.role.findFirst({
        where: { roleName: name },
      });
  
      // If the role exists, return a 400 error
      if (existingRole) {
        return res.status(400).json({ error: 'Role with this name already exists' });
      }
  
      // Create the new role in the database
      const newRole = await prisma.role.create({
        data: {
          roleName: name,
        },
      });
  
      // Assign permissions to the role
      for (const permissionId of permissionIDs) {
        await prisma.role_permissions.create({
          data: {
            roleId: newRole.roleId,
            permissionId,
          },
        });
      }
  
      // Return the newly created role in the response
      return res.status(201).json({ role: newRole });
    } catch (error) {
      // Log the error and respond with an error message
      console.error(error);
      return res.status(500).json({ error: 'Failed to create role' });
    }
  };
  
    
    // role details  with permissons
  
export const roleDetails =async (req,res)=>{
    const id = parseInt(req.params.id)
    console.log(id);
  try {
    const existingRole = await prisma.role.findUnique({
      where: { roleId: id },
    });
  
    // If the role exists, return a 400 error
    if (!existingRole) {
      return res.status(400).json({ error: 'Role not found  ' });
    }
     const roleDetails = await prisma.role.findMany({
      where :{roleId:id},
      include:{
         permissions:{ include:{ permission:true} }
  }
     
     })
     const formattedroleDetails = roleDetails.map(role => ({
      ...role,
      permissions: role.permissions.map(permissions => permissions.permission.permission), // Extract role names only
    }));
  
    console.log(formattedroleDetails);
     return res.status(201).json({ message :"role details",data:formattedroleDetails });
  } catch (error) {
     console.error(error);
      return res.status(500).json({ error: 'Failed to role details' });
  }
  
  }
  
export const allRoles =async (req,res)=>{
  try {
    
    const allRole = await prisma.role.findMany()
    return res.status(201).json({ message :"all role ",data:allRole });
  } catch (error) {
       console.error('Error updating all roles:');
      return res.status(500).json({
        error: error.message || 'Failed to update permissions',})
  }
 
}



  export const updateRole = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { permissionIDs } = req.body;
  
    // Validate input
    if (!id || !Array.isArray(permissionIDs) || permissionIDs.length === 0) {
      return res.status(400).json({ error: 'Invalid input: role ID and permissions are required' });
    }
  
    try {
      // Use a transaction to ensure all operations succeed or fail together
      const result = await prisma.$transaction(async (prisma) => {
        // Check if the role exists
        const existingRole = await prisma.role.findUnique({
          where: { roleId: id },
        });
  
        if (!existingRole) {
          throw new Error('Role not found');
        }
  
        // Delete existing permissions for the role
        await prisma.role_permissions.deleteMany({
          where: { roleId: id },
        });
  
        // Add new permissions
        const rolePermissions = permissionIDs.map((permissionId) => ({
          roleId: id,
          permissionId,
        }));
  
        await prisma.role_permissions.createMany({
          data: rolePermissions,
        });
  
        // Return the updated role with its permissions
        const updatedRole = await prisma.role.findUnique({
          where: { roleId: id },
          include: {
            permissions: {
              include: {
                permission: true, // Include permission details
              },
            },
          },
        });
  
        return updatedRole;
      });
  
      return res.status(200).json({
        message: 'Role permissions updated successfully',
        data: result,
      });
    } catch (error) {
      console.error('Error updating role permissions:', error.message);
      return res.status(500).json({
        error: error.message || 'Failed to update permissions',
      });
    }
  };
  