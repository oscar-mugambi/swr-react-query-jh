import { useRef } from 'react'
import { Text } from '@mantine/core'
import { useQuery } from 'react-query'

function startTimer() {
  const startTime = Date.now()
  return () => {
    return Math.round((Date.now() - startTime) / 1000)
  }
}

function StopWatchTwo() {
  const timeRef = useRef(startTimer())

  const { data: time } = useQuery('timer', timeRef.current, { refetchInterval: 100 })
  return <Text>The time is {time}</Text>
}

export default StopWatchTwo
