
import prisma from "../../database/db.config.js";
import bcrypt from "bcrypt";


export const createUser = async (req, res) => {
  const { username, email, password, roleIds, userStore } = req.body;

  if (!username || !email || !password || !roleIds || !userStore) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (!Array.isArray(roleIds) || roleIds.length === 0) {
    return res .status(400).json({ error: "Role IDs must be provided as a non-empty array" });}

  try {
    // Check if the user already exists
    const existingUser = await prisma.users.findFirst({
      where: { userEmail: email },
    });

    if (existingUser) {
      return res.status(400).json({ error: "A user with this email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 15); 
    // Create the user
    const newUser = await prisma.users.create({
      data: {
        userName: username,
        userEmail: email,
        userPassword: hashedPassword, // Consider hashing the password (e.g., bcrypt)
       
      },
    });
    await prisma.store_users.create({
      data: {
        userId: newUser.userId,
        userStore,
      },
    });

    // Create UserRole records for each roleId
    for (const roleId of roleIds) {
      await prisma.user_roles.create({
        data: {
          userId: newUser.userId,
         roleId,
        },
      });
    }
    return res.status(201).json({ message: "New user created successfully", newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Failed to create user" });
  }
};



  // update the user role and other details
export const userUpdate=async (req,res)=>{
const id = parseInt( req.params.id)
const { username, email, password, roleIds, userStore } = req.body;
 
try {
  const existingUser = await prisma.users.findUnique({
    where: { userId: id },
  });

  if (!existingUser) {
    return res.status(400).json({ error: "user not found" });
  }
  // const hashedPassword = await bcrypt.hash(password, 15); 
 await prisma.users.updateMany({
    where: { userId: id,},
    data: {
      userName: username,
      // userEmail: email,
      userPassword: password, // Consider hashing the password (e.g., bcrypt)
   
      update_at: new Date ()
    },
  });
  await prisma.store_users.update({
    data: {
      userId: newUser.userId,
      userStore: userStore,
    },
  });
  await prisma.user_roles.deleteMany({
    where: { userId: id },
  });

  const userrole = roleIds.map((roleId) => ({
    userId: id,
    roleId,
  }));

  await prisma.user_roles.createMany({
    data: userrole,
  });

  return res .status(201).json({ message: "user updated successfully",});

} catch (error) {
  console.error("Error updating user:", error);
  return res.status(500).json({ error: "Failed to update user" });
}
}



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
            role: true, // This will include the role details for each user
          },
        },
      },
    });

    // Format the response to only return role names
    const formattedUsers = allUsers.map((user) => ({
      ...user,
      roles: user.roles.map((userRole) => userRole.role.roleName), // Extract role names only
    }));

    return res
      .status(200)
      .json({ message: "Users retrieved successfully", data: formattedUsers });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to retrieve users" });
  }
};

//  delete user
export const deleteUser = async (req, res) => {
  const id = parseInt(req.params.id, 10); // Convert to integer

  // Validate if id is a valid number
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
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
      return res.status(404).json({ message: "User not found" });
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
      message: "User marked as deleted successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to delete user" });
  }
};


export const deleteAllUsers = async (req, res) => {
  try {
    // Delete all user roles first
    await prisma.user_roles.deleteMany({});

    // Then delete all users
    await prisma.users.deleteMany({});

   

    return res.status(200).json({
      message: "All users and their roles deleted, IDs reset to 1",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to delete users and reset IDs" });
  }
};
