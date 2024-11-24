/**
 * Middleware to check if the user is an admin.
 * Assumes that authenticateToken middleware has already been applied.
 */
export const isAdmin = (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }
  
    const { isAdmin } = req.user;
    if (!isAdmin) {
      return res.status(403).json({ error: 'Access denied. Admins only.' });
    }
    next();
  };