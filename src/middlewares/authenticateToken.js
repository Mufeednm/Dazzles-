import jwt from 'jsonwebtoken';

export const authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Access denied, token missing" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Decoded user data (ID, role, permissions)
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
