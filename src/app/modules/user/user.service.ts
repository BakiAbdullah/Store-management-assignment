import { IUser } from './user.interface'
import { UserModel } from './user.model'

const createUserInDB = async (user: IUser) => {
  const result = await UserModel.create(user)
  return result
}

const getAllUserFromDB = async () => {
  const result = await UserModel.find().select({
    userName: 1,
    fullName: 1,
    age: 1,
    email: 1,
    address: 1,
  })

  return result
}

const getSingleUser = async (userId: number) => {
  const result = await UserModel.findOne({ userId })
  return result
}

const updateAUser = async (userId: number, updateData: Partial<IUser>) => {
  const result = await UserModel.findOneAndUpdate({ userId }, updateData, {
    new: true,
    runValidators: true,
  })
  return result
}

const deleteAUser = async (userId: number) => {
  const result = await UserModel.deleteOne({ userId })
  return result
}

export const userServicesToController = {
  createUserInDB,
  getAllUserFromDB,
  getSingleUser,
  updateAUser,
  deleteAUser
}
