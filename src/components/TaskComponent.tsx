'use client'
import { TaskSingleProps } from '@/@types/tasks'
import { useState } from 'react'
import { state } from '@/store'
import { AnimatePresence, motion } from 'framer-motion'
import { openDB } from 'idb'
import Image from 'next/image'
import { useSnapshot } from 'valtio'
import { ConfirmToDeleteTaskModal } from './ConfirmToDeleteTaskModal'
import { Button } from '@/components/ui/button'

const TaskSingle = ({ id, description }: TaskSingleProps) => {
  const [isCompleted, setIsCompleted] = useState(false)
  const snap = useSnapshot(state)

  const deleteTask = async () => {
    const db = await openDB('ListaDeTarefasDB', 1)
    const transaction = db.transaction('tarefas', 'readwrite')
    const store = transaction.objectStore('tarefas')

    await store.delete(id)
    state.tasks = snap.tasks.filter((task) => task.id !== id)
  }

  return (
    <div
      className={`relative mb-28 flex w-full max-w-3xl items-center rounded-md bg-zinc-800 lg:mb-3 ${
        isCompleted && 'bg-opacity-40'
      } px-4 py-3`}
    >
      <strong
        className={`text-sm font-normal tracking-wide text-white lg:text-base ${
          isCompleted && 'line-through opacity-40'
        }`}
      >
        {description}
      </strong>

      <div className="absolute right-0 top-14 flex w-full flex-col items-center gap-2 lg:top-1 lg:w-fit lg:flex-row">
        <Button
          className="w-full rounded-md bg-zinc-700 px-2 py-1 lg:w-12"
          type="button"
          onClick={() => setIsCompleted((prevState) => !prevState)}
        >
          <Image
            src="/note-pencil.svg"
            alt="note-pencil"
            width={26}
            height={26}
          />
        </Button>

        <ConfirmToDeleteTaskModal setHasRequestedToDelete={deleteTask} />
      </div>
    </div>
  )
}

export const TaskComponent = () => {
  const snap = useSnapshot(state)

  return (
    <div className="flex flex-col items-center justify-center lg:mt-20">
      <AnimatePresence>
        {Object.values(snap.tasks).map((task, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -150 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -150 }}
            transition={{
              duration: 0.25,
              delay: index * 0.1,
              type: 'spring',
              stiffness: 100,
              damping: 20,
              mass: 1.5,
              velocity: 10,
              bounce: 0.5,
              restDelta: 0.001,
              restSpeed: 0.001,
            }}
            style={{
              zIndex: index + 1,
              position: 'relative' as const,
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
            }}
            layoutId={`task-${task.id}`}
          >
            <TaskSingle id={task.id} description={task.description} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
