import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { userRoutes } from './app/modules/user/user.router'

export const app: Application = express()

// middlewares
app.use(express.json())
app.use(cors())

// All api default endpoint
app.use('/api/users', userRoutes)

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to Store Management portal Server with Mongoose!',
  })
})
