const authUrl = 'http://127.0.0.1:3000/auth/login'

async function login(email, password) {
  const resp = await fetch(authUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })

  console.log(resp.status)

  const data = await resp.json()

  return data
}

export default login
