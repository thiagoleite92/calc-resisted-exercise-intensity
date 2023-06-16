'use client';

import React, { useCallback, useEffect } from 'react';
import { useForm, FormProvider, useFieldArray } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { PlusCircle, XCircle } from 'lucide-react';
import { z } from 'zod';

import { Form } from '../index';

type ExerciseSchemaType = z.infer<typeof exerciseSchema>;

const exerciseSchema = z.object({
  exercise: z.array(
    z.object({
      title: z.string().nonempty().min(3, 'Mínimo 3 caracteres').max(25),
      load: z.coerce.number().min(1, 'Mínimo 1 repetição'),
      reps: z.coerce.number().min(1, 'Mínimo 1 Kg').max(99),
      date: z.date().default(new Date())
    })
  )
});

export default function ExerciseForm() {
  const exerciseForm = useForm<ExerciseSchemaType>({
    resolver: zodResolver(exerciseSchema)
  });

  const { handleSubmit, control } = exerciseForm;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'exercise'
  });

  const addExercise = useCallback(() => {
    append({ title: '', reps: 0, load: 0, date: new Date() });
  }, [append]);

  const onSubmit = (data: ExerciseSchemaType) => console.log(data);

  useEffect(() => {
    addExercise();
  }, [addExercise]);

  return (
    <>
      <FormProvider {...exerciseForm}>
        <form
          className='mx-auto grid h-4/5 grid-cols-1 overflow-y-auto
      rounded-sm sm:mt-4 sm:w-full sm:border sm:border-yellow-400 sm:p-4'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='flex h-fit flex-col gap-2'>
            {fields.map((field, index) => {
              const fieldName = `exercise.${index}.title`;
              const fieldReps = `exercise.${index}.reps`;
              const fieldLoads = `exercise.${index}.load`;

              return (
                <div className='flex h-fit flex-col gap-2' key={field.id}>
                  <Form.Field>
                    <Form.Label htmlFor='exercises'>Nome</Form.Label>
                    <Form.SelectInput
                      name={fieldName}
                      type='text'
                      placeholder='Levantamento Terra'
                    />
                    <Form.ErrorMessage field={fieldName} />
                  </Form.Field>
                  <div className=''>
                    <Form.Field>
                      <div className='flex w-full gap-8'>
                        <Form.Label htmlFor='exercises'>Repetições</Form.Label>
                        <Form.Input
                          name={fieldReps}
                          type='number'
                          min='1'
                          placeholder='8 reps'
                        />
                        <Form.ErrorMessage field={fieldReps} />
                        <Form.Label htmlFor='exercises'>Carga</Form.Label>
                        <Form.Input
                          name={fieldLoads}
                          type='number'
                          min='1'
                          placeholder='27kg'
                        />
                        <Form.ErrorMessage field={fieldLoads} />
                      </div>
                    </Form.Field>
                  </div>
                  <button
                    type='button'
                    onClick={() => remove(index)}
                    className='self-end text-red-500'
                    style={{
                      display: fields?.length >= 2 ? 'block' : 'none'
                    }}
                  >
                    <XCircle size={14} />
                  </button>
                </div>
              );
            })}

            <div>
              <button
                type='button'
                onClick={addExercise}
                className='flex items-center gap-1 text-xs font-semibold text-emerald-500'
              >
                Adicionar
                <PlusCircle size={14} />
              </button>
            </div>
          </div>

          <button className='btn-hover mt-4 justify-center'>
            Salvar na Planilha
          </button>
        </form>
      </FormProvider>
    </>
  );
}
