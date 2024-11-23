import jwt from 'jsonwebtoken';

/**
 * Middleware to authenticate JWT tokens.
 * Populates req.user with decoded token data if valid.
 */
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  jwt.verify(authHeader, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.error('JWT verification failed:', err);
      return res.status(403).json({ error: 'Invalid token. Forbidden access.' });
    }
    
    req.user = user; // { id: user.id, isAdmin: user.isAdmin }
    next();
  });
};
