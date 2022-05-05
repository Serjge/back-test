import { model, Schema, Types } from 'mongoose';

type UserType = {
  name: string
  id: string
}

const userSchema = new Schema({
  name: String,
  id: Types.ObjectId,
});
const Users = model<UserType>('MyUsers', userSchema);


export const getUsers = async (): Promise<UserType[]> => {
  return Users.find()
}

export const getUser = async (id: string): Promise<UserType | null> => {
  return Users.findById(id)
}

export const deleteUser = async (id: string): Promise<null> => {
  return Users.findByIdAndDelete(id)
}

export const addUser = async (name: string): Promise<UserType> => {
  const id = new Types.ObjectId()
  return Users.create({ name, id })
}

export const renameUser = async (id:string,name: string): Promise<null> => {
  return Users.findByIdAndUpdate(id, {name})
}
