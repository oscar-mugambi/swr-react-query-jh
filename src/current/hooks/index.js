const url = 'http://localhost:4000/'

export const createUser = async (user) => {
  const newUser = { user }
  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(newUser),
  })

  const data = await response.json()
  return data
}

export const handleChangeActivity = async (user) => {
  const active = !user.active
  const results = await fetch(`${url}${user.id}`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'PUT',
    body: JSON.stringify({ ...user, active: active }),
  })
  const data = results.json()
  return data
}

export const handleDelete = async (id) => {
  const results = await fetch(`${url}${id}`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'DELETE',
  })
  return results
}
