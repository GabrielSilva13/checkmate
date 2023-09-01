import { AddTaskComponent } from '@/components/AddTaskComponent'
import { Divider } from '@/components/Divider'
import { Header } from '@/components/Header'
import { TaskComponent } from '@/components/TaskComponent'

export default function Home() {
  return (
    <main className="container p-4">
      <Header />
      <AddTaskComponent />
      <Divider width={966} />
      <TaskComponent />
    </main>
  )
}
