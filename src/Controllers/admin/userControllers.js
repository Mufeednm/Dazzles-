
// create users

import prisma from "../../database/db.config.js";

export const createUser = async (req, res) => {
  const { username, email, password, roleIds, userStore } = req.body;

  if (!username || !email || !password || !roleIds || !userStore) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Check if the user already exists
    const existingUser = await prisma.users.findFirst({
      where: { userName: username },
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this username already exists" });
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

    return res
      .status(201)
      .json({ message: "New user created successfully", newUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to create user" });
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

export const updateUser = async (req, res) => {
  const id = parseInt(req.params.id); // Convert to integer
  const { username, email, password, roleId, userStore } = req.body;

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
        userName: username,
        userEmail: email,
        userPassword: password,
        userRole: roleId,
        userStore: userStore,
        update_at: new Date(),
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
