import { Schema, model } from 'mongoose'
import { IUser } from './user.interface'
import bcrypt from "bcrypt";
// 2. User Schema corresponding to the user interface.
const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  userId: { type: Number, required: true, unique: true },
  password: { type: String, required: true },
  fullName: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  age: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  isActive: { type: Boolean, default: true },
  address: {
    street: { type: String, required: true },
    city: { type: String },
    country: { type: String },
  },
  hobbies: [String],
  orders: [
    {
      productName: { type: String },
      price: { type: Number },
      quantity: { type: Number },
    },
  ],
})

// Hiding the password
userSchema.pre("save", function (next) {
  const hidePassword = bcrypt.hashSync(this.password, 10);
  this.password = hidePassword;
  next();
});
userSchema.set("toJSON", {
  transform: function (doc, rec) {
    delete rec.password;
  },
});

// User Model
export const UserModel = model<IUser>('User', userSchema)
