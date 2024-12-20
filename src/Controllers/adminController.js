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
  
    // create users


    export const createUser = async (req, res) => {
      const { username, email, password, roleIds, userStore } = req.body;
    
      if (!username || !email || !password || !roleIds || !userStore) {
        return res.status(400).json({ error: 'All fields are required' });
      }
    
      try {
        // Check if the user already exists
        const existingUser = await prisma.users.findFirst({
          where: { userName: username },
        });
    
        if (existingUser) {
          return res.status(400).json({ error: 'User with this username already exists' });
        }
    
        // Create the user
        const newUser = await prisma.users.create({
          data: {
            userName: username,
            userEmail: email,
            userPassword: password,
            userStore,
          },
        });
    
        // Create UserRole records for each roleId
        for (const roleId of roleIds) {
          await prisma.userRole.create({
            data: {
              userId: newUser.userId,
              roleId,
            },
          });
        }
    
        return res.status(201).json({ message: 'New user created successfully', newUser });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to create user' });
      }
    };
    
    //  showw all users
export const showUser = async (req, res) => {
  try {
    const allUsers = await prisma.users.findMany({
      where: {
        isDeleted: false, // Assuming you want only non-deleted users
      },
      include: {
        roles: {
          include: {
            role: true,  // This will include the role details for each user
          },
        },
      },
    });

    // Format the response to only return role names
    const formattedUsers = allUsers.map(user => ({
      ...user,
      roles: user.roles.map(userRole => userRole.role.roleName), // Extract role names only
    }));

    return res.status(200).json({ message: "Users retrieved successfully", data: formattedUsers });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to retrieve users' });
  }
};


  //  delete user
  export const deleteUser = async (req, res) => {
    const id = parseInt(req.params.id, 10); // Convert to integer
  
    // Validate if id is a valid number
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }
  
    console.log(id);
    try {
      // Check if the user exists
      const user = await prisma.users.findUnique({
        where: {
          userId: id,
        },
      });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Update the user's isDeleted field to true
      const updatedUser = await prisma.users.update({
        where: {
          userId: id,
        },
        data: {
          isDeleted: true,
        },
      });

      
  
      return res.status(200).json({
        message: 'User marked as deleted successfully',
        data: updatedUser,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to delete user' });
    }
  };
  
  export const updateUser = async (req, res) => {
    const id = parseInt(req.params.id); // Convert to integer
    const { username, email, password , roleId,userStore} = req.body;
    

    try {
      // Check if the user exists
      const user = await prisma.users.findUnique({
        where: {
          userId: id,
        },
      });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Update the user's isDeleted field to true
      const updatedUser = await prisma.users.update({
        where: {
          userId: id,
        },
        data: {
          userName: username,
          userEmail:email,
          userPassword:password,
          userRole:roleId,
          userStore:userStore,
          update_at :new Date()

        },
      });

      
  
      return res.status(200).json({
        message: 'User marked as deleted successfully',
        data: updatedUser,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to delete user' });
    }
  };



  
 export const createRole = async (req, res) => {
  const { name, permissionIDs } = req.body;

  // Ensure role name and permission IDs are provided
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

    // If the role doesn't exist, return a 404 error
    if (!existingRole) {
      return res.status(404).json({ error: 'Role not found' });
    }

    // Clear existing permissions for the role
    await prisma.rolePermission.deleteMany({
      where: { roleId: id },
    });

    // Assign new permissions in bulk
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
  


