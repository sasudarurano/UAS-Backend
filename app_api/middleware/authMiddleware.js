// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // Get the token from the Authorization header 
  const token = req.header("Authorization")?.split(" ")[1]; 

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // Verify the token using the JWT_SECRET environment variable
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  
    
    // Store the decoded payload (user information) in req.user
    req.user = decoded;  
    next(); // Move to the next middleware
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" }); 
  }
};

module.exports = authMiddleware;