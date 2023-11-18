import { Request, Response, NextFunction } from 'express'
import { errorResponse } from '../utils/responseHelper'

export const errorLogger = (
    err,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log('Path: ', req.path)
    console.error('Error: ', err)
    next(err)
}

export const errorRes = (
    err,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    return errorResponse(res, { message: err.message, status: err.status })
}
