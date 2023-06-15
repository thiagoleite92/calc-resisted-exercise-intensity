'use client';

import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Form } from './components/Form';

const exerciseSchema = z.object({
  name: z
    .string()
    .nonempty('Campo obrigatório')
    .min(3, 'Mínimo de 3 caracteres')
    .max(25, 'Máximo de 25 caracteres'),
  load: z.coerce.number().nonnegative().min(1),
  reps: z.coerce.number().nonnegative().min(1)
});

type ExerciseSchemaType = z.infer<typeof exerciseSchema>;

export default function Home() {
  const exerciseForm = useForm<ExerciseSchemaType>({
    resolver: zodResolver(exerciseSchema)
  });

  const { handleSubmit } = exerciseForm;

  const onSubmit = (data: any) => console.log(data);

  return (
    <main className='flex h-full w-full flex-col gap-2  bg-blue-800 py-2'>
      <FormProvider {...exerciseForm}>
        <form
          className='mx-auto grid h-full grid-cols-1 gap-4
          rounded-sm p-4 sm:mt-4 sm:w-2/4 sm:border sm:border-yellow-400'
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className='flex items-center justify-between text-yellow-400'>
            Predição de Cargas de Treinamento{' '}
            <button className='h-10 rounded border border-yellow-400 bg-transparent px-3 text-sm font-semibold text-yellow-400 hover:border-black hover:bg-yellow-400 hover:text-black'>
              {' '}
              Ver planilha
            </button>
          </h1>
          <div className='flex h-fit flex-col gap-2'>
            <Form.Field>
              <Form.Label htmlFor='exercises'>Exercicio</Form.Label>
              <Form.Input
                name='exercises'
                type='text'
                placeholder='Ex: Deadlift'
              />
            </Form.Field>
            <div className='flex w-full flex-1 justify-between gap-2 sm:justify-start'>
              <Form.Field>
                <Form.Label htmlFor='exercises'>Repetições</Form.Label>
                <Form.Input
                  name='exercises'
                  type='number'
                  min='1'
                  placeholder='8 reps'
                />
              </Form.Field>
              <Form.Field>
                <Form.Label htmlFor='exercises'>Carga</Form.Label>
                <Form.Input
                  name='exercises'
                  type='number'
                  min='1'
                  placeholder='27kg'
                />
              </Form.Field>
            </div>
          </div>

          <Form.ErrorMessage field='exercises' />

          <button className='h-10 rounded border border-yellow-400 bg-transparent px-3 text-sm font-semibold text-yellow-400 hover:border-black hover:bg-yellow-400 hover:text-black'>
            Adicionar à Lista
          </button>
        </form>
      </FormProvider>
      <button className='text-black-400 h-10 self-center rounded-sm bg-yellow-400 px-3 text-sm font-semibold sm:w-2/4'>
        Ver Lista
      </button>
    </main>
  );
}
