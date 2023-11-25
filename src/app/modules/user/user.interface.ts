interface IOrder {
  productName: string
  producPrice: number
  quantity: number
}

interface IUser {
  userName: string
  userId: number
  password: string
  fullName: {
    firstName: string
    lastName: string
  }
  age: number
  email: string
  isActive: boolean
  hobbies: string[]
  address: {
    street: string
    city: string
    country: string
  }
  orders?: IOrder[]
}

export { IUser, IOrder }
