import prisma from "../../database/db.config.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const login = async (req, res) => {
  const { username, password } = req.body;

  // Validate if username and password are provided
  if (!username || !password) {
    return res.status(400).json({ message: "username and password are required" });
  }

  try {
   
    const hashedPassword = await bcrypt.hash(password, 10); 

    // 1. Check in the Admin table
    let user= await prisma.login.create({
   data: { userName: username,
        userPassword:hashedPassword,
      
    },
  });
  
  const token = jwt.sign(
    {  name: user.userName }, // Payload
    process.env.JWT_SECRET,         // Secret key
    { expiresIn: "1h" }             // Token expiry
  );
 

      return res.status(200).json({
        message: "Login successful, redirecting to Admin page",
        data: user,
        token:token
      });
    

    // 2. If not found in Admin, check in the Staff table (and fetch their Role)

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
