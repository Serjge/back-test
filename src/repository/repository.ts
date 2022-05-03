import { promises } from 'fs'

const pathFile = './src/repository/users'

type UserType = {
  id:number,
  name: string
}

export const getUsers = async (): Promise<UserType[]> => {

  const users = await promises.readFile(pathFile)

  return JSON.parse(users.toString())
}


export const addUser = async (name: string) => {
  const users = await getUsers()
  const id = users.length + 1
  users.push({ 'id': id, 'name': name })

  return await promises.writeFile(pathFile, JSON.stringify(users))

}
