// authMiddleware.js
const jwt = require('jsonwebtoken');

// exports.authenticateUser = async(req, res, next) => {
  
//   // Extract token from SQS message body
//   const authHeader = req.headers['authorization'];
//   console.log(req.headers)

//   if (!authHeader || !authHeader.startsWith('Bearer ')) {
//     return res.status(401).json({ error: 'Unauthorized: No token provided' });
//   }



//   const token = authHeader.split(' ')[1];
//   try {
//     // Verify JWT token
//     const decoded = jwt.verify(token, 'XXXYTHSRATAV');
//     req.user = decoded.user; // Add user information to the request object
//     next();
//   } catch (error) {
//     return res.status(401).json({ error: 'Unauthorized: Invalid token' });
//   }

// };

// middleware/authMiddleware.js
exports.authenticateUser = async (req, res, next) => {
  // Extract token from Authorization header
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  // Extract the token
  const token = authHeader; // Assuming token is directly sent without "Bearer" prefix

  try {
    // Verify JWT token
    const decoded = jwt.verify(token, 'XXXYTHSRATAV');
    req.user = decoded.user; // Add user information to the request object
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};

// authorizationMiddleware.js
exports.authorizeUser = (req, res, next) => {
  // Check if user is authenticated
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized: User not authenticated' });
  }
  // Add your authorization logic here
  // For example, check if the user is allowed to access the endpoint
  
  // Assuming all authenticated users are authorized
  next();
};
