import { Request, Response, NextFunction } from 'express'

import httpStatus from '../constants/httpStatusCodes'

export default {
    getEvents: async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.status(httpStatus.success).json({
                message: 'teste',
            })
        } catch (error) {
            next(error)
        }
    },
}
