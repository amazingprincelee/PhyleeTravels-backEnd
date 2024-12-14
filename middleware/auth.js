//../middleware
import { verifyToken } from "../utils/jwt.js"
import { tokenBlacklist } from "../controllers/authController.js";

export const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access token missing" });

  if (tokenBlacklist.has(token)) {
    return res.status(403).json({ message: "Token has been blacklisted" });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
      next();
  } else {
      res.status(403).json({ message: 'Access denied. Admins only.' });
  }
};

