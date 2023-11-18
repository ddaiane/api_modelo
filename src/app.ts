import express, { Request, Response, NextFunction } from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import mongoSanitize from 'express-mongo-sanitize'

import httpStatus from './constants/httpStatusCodes'
import { errorLogger, errorRes } from './middlewares/errorHandler'
import { errorResponse } from './utils/responseHelper'

// importa rotas
import eventRouter from './routes/event'

global.appRoot = path.resolve(__dirname)

const app = express()

// Configure min settings
app.use(bodyParser.json({ limit: '100mb' }))

// Sanitize input to prevent mongo injection
app.use(mongoSanitize())

// "catch" de erro de sintaxe Ex: json quebrado
app.use(function (error, req: Request, res: Response, next: NextFunction) {
    if (error instanceof SyntaxError)
        return errorResponse(res, { status: httpStatus.badRequest })
    return next()
})

// Log de rotas chamadas
app.use((req, res, next) => {
    if (process.env.NODE_ENV !== 'production') {
        console.log('Request Recebida: ')
        console.log('  - rota: ', req.url)
        console.log('  - método: ', req.method)
        console.log('  - parâmetros: ', req.params)
        console.log('  - body: ', req.body)
    }
    next()
})

// CORS Headers
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
        'Access-Control-Allow-Headers',
        'Authorization, Origin, X-Requested-With, Content-Type, Accept'
    )
    res.header(
        'Access-Control-Allow-Methods',
        'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    )
    next()
})

app.use(express.json())

// routers
app.use('/event', eventRouter)

// Not found and default router
app.use('/', (req: Request, res: Response) => {
    if (req.url !== '' && req.url !== '/')
        return errorResponse(res, { status: httpStatus.notFound })

    return res.status(httpStatus.success).json('Hello world')
})

// middlewares de tratamento de erros
app.use(errorLogger)
app.use(errorRes)

export default app
