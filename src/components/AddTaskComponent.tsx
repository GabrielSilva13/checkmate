'use client'

import { useEffect, useState } from 'react'
import { IDBPDatabase, openDB } from 'idb'
import { taskProps } from '@/@types/tasks'
import { useFetchTasks } from '@/hooks/useFetchTasks'
import { Button } from './ui/button'
import { Input } from './ui/input'

export const AddTaskComponent = () => {
  const [taskDescription, setTaskDescription] = useState('')
  const fetchTasks = useFetchTasks()

  async function adicionarTarefa(db: IDBPDatabase<unknown>, tarefa: taskProps) {
    const transaction = db.transaction('tarefas', 'readwrite')
    const store = transaction.objectStore('tarefas')

    const id = await store.add(tarefa)

    fetchTasks()

    return id
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (taskDescription.trim() === '') {
      return
    }

    const tarefa = {
      id: Date.now(),
      description: taskDescription,
      completed: false,
    }

    const db = await openDB('ListaDeTarefasDB', 1)
    adicionarTarefa(db, tarefa)

    setTaskDescription('')
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  return (
    <form
      className="my-9 flex flex-col items-center justify-center lg:flex-row"
      onSubmit={handleSubmit}
    >
      <Input
        className="h-12 w-full max-w-3xl rounded-md pl-4 text-lg"
        placeholder="Criar nova tarefa"
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
        maxLength={40}
      />
      <Button
        className="mt-4 h-12 w-full max-w-3xl rounded-md bg-[#4F4F4F] font-heading text-xl leading-5 tracking-wider text-white hover:bg-[#656565] lg:-ml-10 lg:mt-0 lg:max-w-[142px]"
        type="submit"
      >
        Nova Task
      </Button>
    </form>
  )
}
