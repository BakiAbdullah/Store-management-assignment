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
  const result = await UserModel.findOne({ userId });
  return result;
};


export const userServicesToController = {
  createUserInDB,
  getAllUserFromDB,
  getSingleUser
}
