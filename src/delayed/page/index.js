import React, { memo } from 'react'
import { colors } from '../arrayOfColors'

const Page = ({
  handleSubmit,
  handleChange,
  results,
  handleChangeActivity,
  handleDelete,
  user,
}) => {
  return (
    <div>
      <form style={{ marginTop: 20 }} onSubmit={handleSubmit}>
        <input
          style={{ padding: 10, marginRight: 10, width: 300, fontSize: 30 }}
          type='text'
          onChange={handleChange}
          value={user}
        />
        <button style={{ padding: 10, fontSize: 30, cursor: 'pointer' }}>Delayed Send</button>
      </form>

      <div style={{ marginTop: '10rem' }}></div>
      {results.data.map((user) => (
        <div
          key={user.id}
          style={{
            marginBottom: '1rem',
            background:
              colors[
                Math.floor(((user.id * (user.active ? 0.5 : 0.9)) / 3) * 0.8) +
                  (user.active ? 20 : 30)
              ],
            padding: 60,
            display: 'flex',
            gap: 10,
            flexDirection: 'column',
            fontSize: 25,
            alignItems: 'center',
            color: '#fff',
          }}
        >
          <span style={{ background: '#000', padding: 20 }}>{user.name}</span>

          <button
            style={{ cursor: 'pointer', marginLeft: 10, fontSize: 25, width: 250 }}
            onClick={() => handleDelete(user.id)}
          >
            delete
          </button>
        </div>
      ))}
    </div>
  )
}

export default memo(Page)
