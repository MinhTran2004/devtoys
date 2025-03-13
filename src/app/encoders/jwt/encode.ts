import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

const encodeHandler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { payload } = req.body;
    
    if (!payload) {
      return res.status(400).json({ error: 'Payload is required' });
    }

    try {
      // Mã hóa payload thành token
      const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '1h' });
      return res.status(200).json({ token });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to generate token' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};

export default encodeHandler;
