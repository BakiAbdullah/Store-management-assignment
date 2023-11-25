import express, { Application, Request, Response } from 'express'
import cors from 'cors'
export const app: Application = express()

app.use(express.json())
app.use(cors())
// app.use('app/users', userRoute)

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to Store Management portal Server with Mongoose!',
  })
})
