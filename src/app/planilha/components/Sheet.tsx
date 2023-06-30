'use client';

import React from 'react';

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table';

import { percentages, repsZone } from '../../../utils/calcLoads';

import { SheetExercise } from '../../../components/Form/ExerciseForm';
import { DateService } from '../../../services/DateService';

type SheetProps = {
  rows: Array<SheetExercise>;
};

export default function Sheet({ rows }: SheetProps) {
  const dateService = new DateService();

  const columnHelper = createColumnHelper<SheetExercise>();

  const columns = [
    columnHelper.accessor('exercise', {
      cell: (info) => info.getValue(),
      header: 'Exercício',
      footer: (info) => info.column.id
    }),
    columnHelper.accessor('load', {
      cell: (info) => info.getValue() + ' Kg',
      header: 'Carga',
      footer: (info) => info.column.id
    }),
    columnHelper.accessor('reps', {
      cell: (info) => info.getValue(),
      header: 'Repetições',
      footer: (info) => info.column.id
    }),

    columnHelper.accessor('date', {
      cell: (info) => dateService.formatDate(info.getValue()),
      header: 'Data',
      footer: (info) => info.column.id
    }),
    columnHelper.accessor('loads', {
      cell: (info) => renderLoads(info.getValue()),
      header: 'Informações de Treinamento',
      footer: (info) => info.column.id
    })
  ];

  const renderLoads = (loads: Array<number>) => {
    return (
      <div className='overflow-x-auto'>
        <h3>Intensidade</h3>
        <div className='space-x-2 overflow-x-auto bg-gradient-to-r from-[#7fda56] to-[#ff5656]'>
          {percentages.map((pct) => (
            <span key={pct} className='text-slate-950'>
              {pct}%
            </span>
          ))}
        </div>
        <h3 className='underline'>Quilagem</h3>
        <div className='space-x-2'>
          {loads.map((load) => (
            <span key={load}>{Math.floor(load)}Kg</span>
          ))}
        </div>
        <h3>Zona de Repetição</h3>
        <div className='space-x-2 overflow-x-auto'>
          {repsZone?.map((zone: string) => (
            <span key={zone}>{zone} |</span>
          ))}
        </div>
      </div>
    );
  };

  const table = useReactTable({
    data: [...rows],
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  console.log('oi');

  return (
    <table className='h-fit-content w-full border border-yellow-400 p-2 text-yellow-400'>
      <thead className='w-full border border-yellow-400 bg-slate-900 p-1'>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id} className=''>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody className='p-8 text-center'>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id} className='h-10 odd:bg-slate-700 even:bg-slate-800'>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className='p-2'>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
      <tfoot className='bg-slate-900'>
        {table.getFooterGroups().map((footerGroup) => (
          <tr key={footerGroup.id}>
            {footerGroup.headers.map((header) => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.footer,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </tfoot>
    </table>
  );
}
