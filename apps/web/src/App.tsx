import {
  LucideTwitter,
  LucideInstagram,
  LucideMail,
  LucideLoader2,
} from 'lucide-react'
import { ToDoCard } from './components/ToDoCard'
import { AddActivityButton } from './components/AddActivityButton'
import { useActivity } from './hooks/useActivity'

export default function App() {
  const { isLoading, activityList: todoList } = useActivity()

  return (
    <>
      <div className="flex flex-col bg-zinc-900 h-screen">
        <header className="flex gap-2 items-center justify-end p-3">
          <AddActivityButton />
        </header>
        <main className="mt-10 mx-auto flex flex-col gap-3">
          {isLoading && (
            <LucideLoader2 className="animate-spin text-rose-600" size={48} />
          )}
          {todoList.length < 1 && (
            <h1 className="text-lg text-zinc-400 font-bold">
              Ainda não há nenhuma atividade registrada
            </h1>
          )}

          {todoList.map((todoInfo) => (
            <ToDoCard
              id={todoInfo.id}
              createdAt={todoInfo.createdAt}
              doneAt={todoInfo.doneAt}
              title={todoInfo.name}
              key={todoInfo.id}
            />
          ))}
        </main>
        <footer className="text-center mt-10 text-zinc-800/90 select-none">
          <span>Made By João Vitor</span>
        </footer>
      </div>
      <div className="text-zinc-800 flex gap-3 flex-col md:flex-row fixed bottom-5 right-5">
        <a
          href="http://www.twitter.com/jvitorsantanaa"
          target="_blank"
          className="hover:text-white transition-colors ease-linear"
          rel="noreferrer"
        >
          <LucideTwitter strokeWidth={1} />
        </a>
        <a
          href="https://www.instagram.com/jvitorsantanaa/"
          target="_blank"
          className="hover:text-white transition-colors ease-linear"
          rel="noreferrer"
        >
          <LucideInstagram strokeWidth={1} />
        </a>
        <a
          href="mailto:eu@jvitorsantana.com"
          className="hover:text-white transition-colors ease-linear"
        >
          <LucideMail strokeWidth={1} />
        </a>
      </div>
    </>
  )
}
