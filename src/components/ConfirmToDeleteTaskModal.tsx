import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import Image from 'next/image'
import { Button } from './ui/button'

interface ConfirmToDeleteTaskModalProps {
  setHasRequestedToDelete: () => Promise<void>
}

export function ConfirmToDeleteTaskModal({
  setHasRequestedToDelete,
}: ConfirmToDeleteTaskModalProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className="w-full rounded-md bg-zinc-700 px-2 py-1 lg:w-12"
          type="button"
        >
          <Image src="/trash-icon.svg" alt="trash" width={40} height={40} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Tem certeza que quer apagar a task?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação não pode ser desfeita
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={setHasRequestedToDelete}>
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
