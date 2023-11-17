import { Request, Response, Router } from 'express';
import httpStatus from '../constants/httpStatusCodes';

const router = Router();

router.get(
    '/', 
    async (req: Request, res: Response) => {
      res.status(httpStatus.success).json({
        message: 'teste'
      })
  });

export default router;
