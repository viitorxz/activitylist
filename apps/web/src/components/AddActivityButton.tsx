import clsx from 'clsx'
import { useForm, SubmitHandler } from 'react-hook-form'
import { LucideX, LucideAlertTriangle } from 'lucide-react'

import * as Dialog from '@radix-ui/react-dialog'
import { useState } from 'react'
import { useActivity } from '../hooks/useActivity'

export type Inputs = {
  description: string
}

export function AddActivityButton() {
  const [open, setOpen] = useState(false)
  const { addActivity } = useActivity()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await addActivity({
      name: data.description,
      createdAt: Date.now().toString(),
    })
    reset({
      description: '',
    })

    setTimeout(() => setOpen(false), 150)
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="bg-rose-500 hover:bg-rose-600 transition-colors ease-linear p-2 md:p-3 rounded text-white">
          Adicionar atividade
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/75 fixed inset-0 animate-overlayShow" />
        <Dialog.Content className="bg-zinc-800 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-contentShow outline-none p-6 rounded text-zinc-100">
          <Dialog.Title className="leading-[130%] font-bold text-xl -tracking-wide text-center w-[70vw] max-w-[75vw] md:w-[30vw]">
            Adiconar Atividade
          </Dialog.Title>
          <fieldset className="mt-5">
            <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-1 justify-center group">
                <label
                  htmlFor="description"
                  className="text-zinc-100 font-semibold"
                >
                  Nome da atividade
                </label>
                <input
                  {...register('description', {
                    required: true,
                    maxLength: 45,
                    minLength: 3,
                  })}
                  type="text"
                  id="description"
                  className={clsx(
                    'bg-zinc-600 border-2 text-zinc-100 focus:border-blue-600 invalid:border-red-500 p-1 rounded outline-none',
                    {
                      'border-red-500': errors?.description,
                    },
                  )}
                />
                {errors.description && (
                  <p className="text-red-950 text-sm leading-[130%] flex gap-1 items-center mt-3 animate-overlayShow">
                    <span>
                      <LucideAlertTriangle strokeWidth={1} size={20} />
                    </span>
                    Informe o nome da atividade
                  </p>
                )}
              </div>
              <div className="flex justify-end">
                <button
                  className="mt-5 p-2 bg-green-600 hover:opacity-75 transition-opacity rounded text-white uppercase font-semibold"
                  type="submit"
                >
                  Adicionar
                </button>
              </div>
            </form>
          </fieldset>
          <Dialog.Close className="absolute top-2 right-3">
            <LucideX strokeWidth={2} />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
