import { ActivityContext } from '../contexts/ActivityContext'
import { useContext } from 'react'

export function useActivity() {
  const context = useContext(ActivityContext)
  return context
}
