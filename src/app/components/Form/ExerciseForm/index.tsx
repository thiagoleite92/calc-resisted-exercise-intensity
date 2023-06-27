'use client';

import React, { useCallback, useContext, useMemo, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';

import AppContext from '../../../context/AppContext';
import { StorageService } from '../../../services/StorageService';
import Button from '../../Button';
import { GraphicsRM } from '../../GraphsRM';
import { Form } from '../index';

export type ExerciseSchemaType = z.infer<typeof exerciseSchema>;

type FormDataType = {
  exercise: string;
  result: string;
};

const exerciseSchema = z.object({
  id: z.string().default(uuidv4()),
  exercise: z
    .string({ required_error: 'Campo obrigatório' })
    .nonempty('Campo obrigatório'),
  load: z.coerce.number().min(1, 'Mínimo 1 Kg'),
  reps: z.coerce.number().min(1, 'Mínimo 1 repetição').max(99),
  date: z.date().default(new Date())
});

export default function ExerciseForm() {
  const service = useMemo(() => new StorageService(), []);

  const { setResetForm } = useContext(AppContext);
  const [showClearBtn, setShowClearBtn] = useState<boolean>(false);
  const [saveCalc, setSaveCalc] = useState<ExerciseSchemaType>({
    id: '',
    exercise: '',
    load: 0,
    reps: 0,
    date: new Date()
  });

  const [formData, setFormData] = useState<FormDataType>({
    exercise: '',
    result: ''
  });

  const exerciseForm = useForm<ExerciseSchemaType>({
    resolver: zodResolver(exerciseSchema)
  });
  const { handleSubmit, reset } = exerciseForm;

  const onSubmit = ({ load, reps, exercise, date, id }: ExerciseSchemaType) => {
    const k = 0.033;

    const result = Number(k * reps * load + load).toFixed(1);
    setFormData({
      exercise,
      result
    });
    setShowClearBtn(true);

    setSaveCalc({ load, reps, exercise, date, id });
  };

  const handleResetForm = () => {
    reset();
    setShowClearBtn(false);
    setResetForm?.((oldState: boolean) => !oldState);
  };

  const onSave = useCallback(() => {
    service.saveCalc(saveCalc);
    reset();
    setFormData({
      exercise: '',
      result: ''
    });
    setResetForm?.((oldState: boolean) => !oldState);
  }, [reset, saveCalc, service, setResetForm]);

  return (
    <>
      <FormProvider {...exerciseForm}>
        <form
          className='mx-auto h-full w-full space-y-4 rounded-sm sm:mt-4 sm:w-full sm:border sm:border-yellow-400 sm:p-4'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='flex h-fit flex-col gap-2'>
            <Form.Field>
              <Form.Label htmlFor='exercise'>Nome</Form.Label>
              <Form.SelectInput
                name='exercise'
                type='select'
                placeholder='Selecione ou digite um novo exercício'
              />
              <Form.ErrorMessage field='exercise' />
            </Form.Field>
            <div className='flex h-fit  gap-2'>
              <Form.Field>
                <Form.Label htmlFor='load'>Carga</Form.Label>
                <Form.Input
                  type='number'
                  name='load'
                  min='1'
                  placeholder='27kg'
                ></Form.Input>
                <Form.ErrorMessage field='load' />
              </Form.Field>
              <Form.Field>
                <Form.Label htmlFor='reps'>Repetições</Form.Label>
                <Form.Input
                  type='number'
                  name='reps'
                  min='1'
                  placeholder='8 reps'
                ></Form.Input>
                <Form.ErrorMessage field='reps' />
              </Form.Field>
            </div>
          </div>
          <div className='flex w-full justify-between'>
            <button className='btn-hover '>Calcular</button>
            {showClearBtn && (
              <button
                className='btn-hover '
                type='button'
                onClick={handleResetForm}
              >
                Limpar
              </button>
            )}
          </div>
          <GraphicsRM exercise={formData.exercise} result={formData.result} />
        </form>
        <Button
          customClass='btn-hover  justify-center'
          isDisabled={!formData.exercise && !formData.result}
          onClick={onSave}
          text='Salvar na Planilha'
        />
      </FormProvider>
    </>
  );
}
