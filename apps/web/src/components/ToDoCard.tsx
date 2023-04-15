import clsx from 'clsx'
import dayjs from 'dayjs'

import { Trash2, CheckCircle2, LucideTrash2 } from 'lucide-react'

import * as AlertDialog from '@radix-ui/react-alert-dialog'
import { useActivity } from '../hooks/useActivity'

type ToDoCardProps = {
  id: string
  title: string
  createdAt: string
  doneAt: string | null
}

export function ToDoCard(props: ToDoCardProps) {
  const { deleteActivity, doneActivity } = useActivity()

  const createdAt = dayjs(props.createdAt).format('DD/MM/YYYY')
  const doneAt =
    props.doneAt != null ? dayjs(props.doneAt).format('DD/MM/YYYY') : null
  return (
    <div className="flex justify-between items-center gap-10 min-w-[350px] max-w-[50vw] md:max-w-[500px] shadow rounded-md p-3 md:p-6 bg-zinc-700 text-zinc-100">
      <div className="flex flex-col gap-[2px]">
        <h3
          className={clsx(
            'font-semibold leading-[130%] text-[14px] md:text-base',
            {
              'line-through': props?.doneAt,
            },
          )}
        >
          {props.title}
        </h3>
        <p className="text-[10px] md:text-xs leading-[130%] lowercase text-zinc-500">
          Adicionado em: <span>{createdAt}</span>
        </p>
        {props.doneAt && (
          <p className="text-[10px] md:text-xs leading-[130%] lowercase text-zinc-500">
            Feito em: <span>{doneAt}</span>
          </p>
        )}
      </div>
      <div className="flex items-center gap-1 text-white">
        <button
          onClick={() => doneActivity(props.id)}
          className={clsx(
            'hover:text-green-600 transition-colors ease-linear',
            {
              hidden: props?.doneAt,
            },
          )}
        >
          <CheckCircle2 strokeWidth={1.5} />
        </button>

        <AlertDialog.Root>
          <AlertDialog.Trigger asChild>
            <button className="hover:text-red-600 transition-colors ease-linear">
              <Trash2 strokeWidth={1.5} />
            </button>
          </AlertDialog.Trigger>
          <AlertDialog.Portal>
            <AlertDialog.Overlay className="bg-black/60 fixed inset-0 animate-overlayShow" />
            <AlertDialog.Content className="outline-none bg-zinc-100 rounded-md fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-contentShow p-6 w-[90wv] max-w-[500px] max-h-[85vh] shadow-md">
              <AlertDialog.Title className="font-semibold text-lg">
                Excluir atividade
              </AlertDialog.Title>
              <AlertDialog.Description className="mt-3 leading-[1.5] text-black/75">
                Você deseja excluir {'‘'}
                <span className="italic">{props.title}</span>
                {'’'} ?
              </AlertDialog.Description>
              <div className="mt-5 flex items-center justify-end gap-3">
                <AlertDialog.Cancel asChild>
                  <button className="p-2 bg-zinc-500 rounded-md text-white font-semibold hover:bg-zinc-600 transition-colors ease-linear">
                    Cancelar
                  </button>
                </AlertDialog.Cancel>
                <AlertDialog.Action asChild>
                  <button
                    className="p-2 bg-red-900 rounded-md text-white hover:bg-red-950 transition-colors"
                    title="Excluir atividade"
                    onClick={() => deleteActivity(props.id)}
                  >
                    <LucideTrash2 strokeWidth={1.5} />
                  </button>
                </AlertDialog.Action>
              </div>
            </AlertDialog.Content>
          </AlertDialog.Portal>
        </AlertDialog.Root>
      </div>
    </div>
  )
}
