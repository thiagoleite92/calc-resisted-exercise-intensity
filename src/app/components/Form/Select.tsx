import { InputHTMLAttributes } from 'react';
import { useFormContext, useController } from 'react-hook-form';
import CreatableSelect from 'react-select/creatable';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

export function SelectInput(props: InputProps) {
  const { control } = useFormContext();
  const { field } = useController({
    name: props.name,
    control
  });
  const { value, onChange, ...restLangField } = field;

  const languageList = [
    { value: 'deadlift', label: 'Levantamento Terra' },
    { value: 'bench_press', label: 'Supino Reto' },
    { value: 'squat', label: 'Agachamento' }
  ];

  return (
    <CreatableSelect
      className='select-input'
      placeholder={props.placeholder}
      isClearable
      options={languageList}
      value={value ? languageList.find((x) => x.value === value) : value}
      onChange={(option) => onChange(option ? option.value : option)}
      {...restLangField}
      formatCreateLabel={(value) => 'Adicionar novo exercício: ' + value}
    />
  );
}
