import { Request, Response } from 'express'
import { userServicesToController } from './user.service'

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body
    const result = await userServicesToController.createUserInDB(userData)

    res.send(201).json({
      success: true,
      message: 'User created successfully!!',
      data: result,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!!',
      error: error,
    })
  }
}

export const userControllers = {
  createUser,
}
