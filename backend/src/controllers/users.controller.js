import { getUserModel } from "../models/users.model.js";

export const getUser = async (req, res) => {
    try {
      const userId = req.params.id;
      console.log(`getUser called with id: ${userId}`);
      const result = await getUserModel(userId);
      console.log('Query result:', result.recordset);
      if (result.recordset.length === 0) {
        res.status(404).json({ error: 'User not found' });
      } else {
        res.json(result.recordset[0]);
      }
    } catch (err) {
      console.error('Error fetching user data:', err);
      res.status(500).json({ error: 'Failed to retrieve user data' });
    }
  };

