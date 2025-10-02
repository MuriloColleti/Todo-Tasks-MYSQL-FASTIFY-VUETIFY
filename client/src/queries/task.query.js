const url = 'http://127.0.0.1:3000/tasks'

const token = localStorage.getItem('token')

async function parseJSON(resp) {
  if (!resp.ok) throw new Error(await resp.text())
  const text = await resp.text()
  return text ? JSON.parse(text) : {}
}
async function getAllTasks() {
  const resp = await fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  })

  return await parseJSON(resp)
}

async function createTask(title, body, id_status, id_users) {
  const resp = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, body, id_status, id_users }),
  })

  return await parseJSON(resp)
}

async function editTask(id_task, title, body) {
  const resp = await fetch(`${url}/${id_task}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, body }),
  })

  return await parseJSON(resp)
}

async function deleteTask(id_task) {
  await fetch(`${url}/${id_task}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

async function getTaskByUser(id_user) {
  const resp = await fetch(`${url}/user/${id_user}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  return await parseJSON(resp)
}

async function getAllStatus() {
  const resp = await fetch(`${url}/statuses`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  })

  return await parseJSON(resp)
}

export default { getAllTasks, createTask, editTask, deleteTask, getTaskByUser, getAllStatus }
