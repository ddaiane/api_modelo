import { Response } from 'express'

import httpStatus from '../constants/httpStatusCodes'

interface IGenericResponse {
    (
        response: Response,
        {
            status,
            message,
            payload,
            error,
        }: { status: number; message?: string; payload?: any; error?: boolean }
    ): void
}

export const defaultResponse: IGenericResponse = (
    response,
    { status, message = '', payload = null, error = false }
) => {
    return response.status(status).json({
        status,
        error,
        message,
        payload,
    })
}

export const errorResponse: IGenericResponse = (
    response,
    { status = httpStatus.serverError, message = '', payload = null }
) => {
    response.status(status).json({
        status,
        error: true,
        message,
        payload,
    })
}
