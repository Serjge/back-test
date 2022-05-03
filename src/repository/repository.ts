let users = [
  { 'id': 1, 'name': 'Sasha' },
  { 'id': 2, 'name': 'Igor' },
]

export const getUsers = () => {
  return users
}

export const addUser = (name:string) => {
  users.push({ 'id': 3, 'name': name })
}

// export.getUsers = getUsers