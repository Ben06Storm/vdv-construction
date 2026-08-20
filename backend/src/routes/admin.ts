import { Router } from 'express';

import type { AdminLoginData } from '../types/admin';
import { loginAdmin } from '../services/authService';

const router = Router();

router.post('/login', async (req, res) => {
  const data = req.body as AdminLoginData;

  if (!data.email || !data.password) {
    res.status(400).json({
      message: 'Email and password are required.',
    });

    return;
  }

  try {
    const token = await loginAdmin(data);

    if (!token) {
      res.status(401).json({
        message: 'Invalid email or password.',
      });

      return;
    }

    res.status(200).json({
      message: 'Login successful.',
      token,
    });
  } catch (error) {
    console.error('Admin login failed:', error);

    res.status(500).json({
      message: 'Admin login failed.',
    });
  }
});

export default router;