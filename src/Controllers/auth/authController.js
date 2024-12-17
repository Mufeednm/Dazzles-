import prisma from "../../database/db.config.js";

export const login = async (req, res) => {
  const { username, password } = req.body;

  // Validate if username and password are provided
  if (!username || !password) {
    return res.status(400).json({ message: "username and password are required" });
  }

  try {
    let user;

    // 1. Check in the Admin table
    user = await prisma.admin.findUnique({
      where: { name: username },
    });

    if (user) {
      // Validate the password for Admin
      if (user.password !== password) {
        return res.status(401).json({ message: "Incorrect password" });
      }

      return res.status(200).json({
        status: 200,
        role: "admin",
        message: "Login successful, redirecting to Admin page",
        data: user,
      });
    }

    // 2. If not found in Admin, check in the Staff table (and fetch their Role)
    user = await prisma.staff.findUnique({
      where: { name: username },
      include: { role: true }, // Include the associated Role model
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Validate the password for Staff
    if (user.password !== password) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // Check the role of the Staff user
    const userRole = user.role.name; // Access the role name from the Role model

    return res.status(200).json({
      status: 200,
      role: userRole,
      message: `Login successful, redirecting to ${userRole} page`,
      data: user,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
