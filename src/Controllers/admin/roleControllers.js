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
        await prisma.RolePermission.create({
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
     return res.status(201).json({ message :"role details",data:roleDetails });
  } catch (error) {
     console.error(error);
      return res.status(500).json({ error: 'Failed to role details' });
  }
  
  }
  
  
  export const updateRole = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { permissionIDs } = req.body;
  
    try {
      const existingRole = await prisma.role.findUnique({
        where: { roleId: id },
      });
  
      if (!existingRole) {
        return res.status(404).json({ error: 'Role not found' });
      }
      await prisma.rolePermission.deleteMany({
        where: { roleId: id },
      });
  
      const rolePermissions = permissionIDs.map((permissionId) => ({
        roleId: id,
        permissionId,
      }));
  
      await prisma.rolePermission.createMany({
        data: rolePermissions,
      });
  
      return res.status(200).json({ message: 'Role permissions updated successfully',data:rolePermissions });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to update permissions' });
    }
  };
  
  