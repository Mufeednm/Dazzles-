import prisma from "../../database/db.config.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const login = async (req, res) => {
  const { username, password } = req.body;
console.log(username,password,"anas login check");
  // Validate if username and password are provided
  if (!username || !password) {
    return res.status(400).json({ message: "username and password are required" });
  }

  try {
    const user = await prisma.users.findFirst({
      where: { userName: username },
      include: {
        roles: {
          include: {
            role: true
          },
        },
      },
    });;
    if (!user ) {
      return res.status(404).json({ message: "Invalid credentials" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.userPassword);
    
    if (!isPasswordValid) {
      return res.status(404).json({ message: "Invalid credentials Password" });
    }
 

    // // Extract user roles
    const userRoles = user.roles.flatMap(role=>
      role.role.roleName
      );
      
  
    // Generate JWT token   only user id and user permissoins
    const token = jwt.sign(
      { userId: user.userId,roles: userRoles},
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );


    // 1. Check in the Admin table

    await prisma.login.create({
   data: { userName: username,
        userPassword:user.userPassword, },
  });
  
      return res.status(200).json({
        message: "Login successful, redirecting to Dashboard page",
    token:token,name:user.userName});   

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
