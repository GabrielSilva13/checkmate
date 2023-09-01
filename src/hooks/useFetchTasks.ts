import { openDB } from 'idb'
import { state } from '@/store'
import { taskProps } from '@/@types/tasks'

export const useFetchTasks = () => {
  async function fetchTasks() {
    const db = await openDB('ListaDeTarefasDB', 1)
    const transaction = db.transaction('tarefas', 'readonly')
    const store = transaction.objectStore('tarefas')

    const tasks = (await store.getAll()) as taskProps[]
    state.tasks = tasks
  }

  return fetchTasks
}
