import React from 'react';

import { ExerciseSchemaType } from '../../components/Form/ExerciseForm';

type RowsProps = {
  rows: Array<ExerciseSchemaType>;
};

export default function Rows({ rows }: RowsProps) {
  return <div>{rows.map((row) => row.exercise)}</div>;
}
