import './index.css'
import { listUsers } from './api'
import { useState } from 'react'
import { User } from './api/types'

function App() {

  const [users, setUsers] = useState<User[]>([])

  const handleClick = async () => {
    const response = await listUsers()

    setUsers(response)
  }

  return (
    <>
      <button onClick={handleClick}>clique aqui</button>
      {users.map((user) => {
        return (
          <div key={user.id}>
            <p>{user.name}</p>
            <p>{user.city}</p>
            <p>{user.country}</p>
            <p>{user.favorite_sport}</p>
          </div>
        )
      })}
    </>
  )
}

export default App
