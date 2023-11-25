import { Request, Response } from 'express'
import { userServicesToController } from './user.service'
import { userValidationWithZod } from './user.validation.zod'

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body
    const validatedData = userValidationWithZod.parse(userData)
    const result = await userServicesToController.createUserInDB(validatedData)

    res.status(201).json({
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

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServicesToController.getAllUserFromDB()
    res.status(200).json({
      sucess: true,
      message: 'Users retrieved successfully!',
      data: result,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error: error,
    })
  }
}

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId)
    const user = await userServicesToController.getSingleUser(userId)

    if (!user)
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      })

    res.status(200).json({
      success: true,
      message: 'User retrieved successfully!',
      data: user,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error: error,
    })
  }
}

export const userControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
}
