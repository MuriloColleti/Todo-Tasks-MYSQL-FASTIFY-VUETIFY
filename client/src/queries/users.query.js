const url = 'http://127.0.0.1:3000/users'

const token = localStorage.getItem('token')

async function parseJSON(resp) {
  return await resp.json()
}

async function getAllUsers() {
  const resp = await fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  })

  return await parseJSON(resp)
}

export async function createUser(username, email, password) {
  const resp = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ username, email, password }),
  })

  return await parseJSON(resp)
}

export async function editUser(id_user, username, email, password) {
  const resp = await fetch(`${url}/${id_user}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ username, email, password }),
  })

  return await parseJSON(resp)
}

export async function deleteUser(id_user) {
  await fetch(`${url}/${id_user}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
export default { getAllUsers, createUser, editUser, deleteUser }
