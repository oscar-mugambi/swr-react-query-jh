import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { createUser, handleChangeActivity, handleDelete } from './hooks'
import { Helmet } from 'react-helmet'
import Page from './page'

const fetchUsers = () => fetch('http://localhost:4000/').then((res) => res.json())

const Mutation = () => {
  const { data: results, status } = useQuery('users', fetchUsers, {
    keepPreviousData: true,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })

  const queryClient = useQueryClient()

  const { mutate } = useMutation(createUser, {
    onSuccess: (data) => {
      queryClient.setQueryData('users', (prevState) => {
        return {
          ...prevState,
          data: [...data.data, ...prevState.data],
        }
      })
    },
  })
  const { mutate: mutateDelete } = useMutation(handleDelete, {
    onSuccess: async (data) => {
      const {
        data: { item },
      } = await data.json()
      queryClient.setQueriesData('users', (prevState) => {
        const filteredData = prevState.data.filter((sms) => sms.id !== item)
        return {
          ...prevState,
          data: [...filteredData],
        }
      })
    },
  })
  const { mutate: mutateEdit } = useMutation(handleChangeActivity, {
    onSuccess: (data) => {
      queryClient.setQueryData('users', (prevState) => {
        console.log(prevState.data)
        const filteredData = prevState.data.filter((item) => item.id !== data.data[0].id)
        return {
          ...prevState,
          data: [...filteredData, ...data.data].sort((a, b) => {
            if (parseInt(a.id) > parseInt(b.id)) {
              return -1
            } else {
              return 1
            }
          }),
        }
      })
    },
  })

  const [user, setUser] = useState('')

  if (status === 'loading') {
    return <div>loading...</div>
  }

  if (status === 'error') {
    return <div>Error...</div>
  }

  const handleChange = (e) => {
    const user = e.target.value
    setUser(user)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    mutate(user)
    setUser('')
  }

  return (
    <>
      <Helmet>
        <title>3. Real World</title>
        <meta name='description' content='Helmet application' />
      </Helmet>
      <div style={{ margin: '100px 0 0 0', fontSize: 30 }}>
        <div>Send a Bulk SMS</div>
        <Page
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          results={results}
          handleChangeActivity={mutateEdit}
          handleDelete={mutateDelete}
          user={user}
        />
      </div>
    </>
  )
}

export default Mutation
