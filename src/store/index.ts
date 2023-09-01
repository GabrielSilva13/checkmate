import { taskProps } from '@/@types/tasks'
import { proxy } from 'valtio'

export const state = proxy({
  tasks: [] as taskProps[],
})
