'use client';

import React from 'react';

import { ExerciseSchemaType } from '../../../components/Form/ExerciseForm';

type RowsProps = {
  rows: Array<ExerciseSchemaType>;
};

export default function Rows({ rows }: RowsProps) {
  return (
    <table>
      {rows.map((row) => (
        <li key={row.exercise}>
          <span>{row.exercise}</span>
          <span>{row.load}</span>
          <span>{row.reps}</span>
        </li>
      ))}
    </table>
  );
}
