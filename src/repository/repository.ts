import { model, Schema, Types } from 'mongoose';

type UserType = {
  name: string
  userId: Types.ObjectId
  creatData: Date
  secondName: string
}

const userSchema = new Schema<UserType>({
  name: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId },
  creatData: Date,
  secondName: String,
});
const Users = model<UserType>('MyUsers', userSchema);

export const getUsers = async (): Promise<UserType[]> => {
  const users = await Users.find()
  return users.map(({ userId, name, secondName, creatData }) => ( {
    userId,
    name,
    creatData,
    secondName,
  } ))
}

export const getUser = async (id: string): Promise<UserType | null> => {
  const UserId = await getBaseUserId(id)
  return Users.findById(UserId)
}


export const getBaseUserId = async (userId: string): Promise<Types.ObjectId> => {
  const user = await Users.findOne({ userId })
  if (user) {
    return user._id
  }
  throw new Error('user not found')
}

export const deleteUser = async (id: string): Promise<null> => {
  const UserId = await getBaseUserId(id)
  return Users.findByIdAndDelete(UserId)
}

export const addUser = async (name: string): Promise<UserType> => {
  const userId = new Types.ObjectId()
  const creatData = new Date()
  return Users.create({ name, userId, creatData })
}

export const renameUser = async (id: string, name: string): Promise<null | Error> => {

  const userId = await getBaseUserId(id)
  if (userId) {
    return Users.findByIdAndUpdate(userId, { name })
  }
  throw new Error('user not found')
}
