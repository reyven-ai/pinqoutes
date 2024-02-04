import { Router, Request, Response } from 'express';

import { add, getUserProfile, remove, update } from './profile.services';
import {
  isValidUserAddress,
  isValidUserBirthday,
  isValidUserMobileNumber,
  isValidUsername,
} from './profile.validation';

import { checkAuthMiddleware } from '../../middleware/checkAuthMiddleware';
import { handleError } from '../../errors/errors';
import { AuthResponse } from '../../types';

const router = Router();

router.post(
  '/',
  checkAuthMiddleware,
  async (req: Request, res: AuthResponse) => {
    try {
      const { image, description } = req.body;

      const data = {
        id: 1,
        userId: 2,
        description: description,
        imageUrl: 'funnycatimage.com',
        createdAt: '2021-01-01',
      };

      res.status(201).json({
        message: 'Pin created successfully.',
        pin: data,
      });
    } catch (error) {
      handleError(error, res);
    }
  }
);
