import { api } from '../lib/axios'
import { ReactNode, createContext, useState, useEffect } from 'react'

type Activity = {
  id: string
  name: string
  createdAt: string
  doneAt: string | null
}

type AddActivityProps = {
  name: string
  createdAt: string
}

type ActivityContextData = {
  activityList: Activity[]
  isLoading: boolean
  addActivity: (props: AddActivityProps) => Promise<void>
  doneActivity: (id: string) => Promise<void>
  deleteActivity: (id: string) => Promise<void>
}

export const ActivityContext = createContext({} as ActivityContextData)

export function ActivityProvider({ children }: { children: ReactNode }) {
  const [activityList, setActivityList] = useState<Activity[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    try {
      api.get<Activity[]>('activities').then((data) => {
        setActivityList(data.data)
      })
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  async function addActivity({ name, createdAt }: AddActivityProps) {
    try {
      const activity = await api.post<Activity>('activities', {
        activity_name: name,
        createdAt,
      })
      setActivityList((prev) => [...prev, activity.data])
    } catch (error) {
      console.log(error)
    }
  }

  async function doneActivity(id: string) {
    try {
      const activity = await api.patch<Activity>(`activities/done/${id}`, {
        doneAt: new Date().toISOString(),
      })
      setActivityList(activityList.filter((ac) => ac.id !== id))
      setActivityList((prev) => [...prev, activity.data])
    } catch (error) {
      console.log(error)
    }
  }

  async function deleteActivity(id: string) {
    try {
      const activity = await api.get<Activity>(`activities/${id}`)
      if (!activity) return
      await api.delete(`activities/${id}`)
      setActivityList(activityList.filter((ac) => ac.id !== id))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ActivityContext.Provider
      value={{
        activityList,
        isLoading,
        addActivity,
        doneActivity,
        deleteActivity,
      }}
    >
      {children}
    </ActivityContext.Provider>
  )
}
