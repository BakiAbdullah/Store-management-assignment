import { IOrder, IUser } from './user.interface'
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

const makeOrder = async (userId: number, orderInfo: IOrder) => {
  const result = await UserModel.findOneAndUpdate(
    { userId },
    { $push: { orders: orderInfo } },
  )
  return result
}

const getAllOrders = async (userId: number) => {
  const result = await UserModel.findOne({ userId }).select({ orders: 1 })
  return result
}

const getTotalPrice = async (userId: number) => {
  const result = await UserModel.aggregate([
    {
      $match: {
        userId,
      },
    },

    { $unwind: '$orders' },

    {
      $group: {
        _id: null,
        totalPrice: {
          $sum: { $multiply: ['$orders.price', '$orders.quantity'] },
        },
      },
    },

    // stage-4
    {
      $project: {
        _id: 0,
        totalPrice: { $round: ['$totalPrice', 2] },
      },
    },
  ])

  if (result.length > 0) return result[0]
  else return (result[0] = { totalPrice: 0 })
}

export const userServicesToController = {
  createUserInDB,
  getAllUserFromDB,
  getSingleUser,
  updateAUser,
  deleteAUser,
  makeOrder,
  getAllOrders,
  getTotalPrice,
}
