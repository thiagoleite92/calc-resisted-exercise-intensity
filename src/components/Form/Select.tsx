import {
  InputHTMLAttributes,
  useCallback,
  useContext,
  useEffect,
  useRef
} from 'react';
import { useFormContext, useController } from 'react-hook-form';
import CreatableSelect from 'react-select/creatable';

import AppContext from '../../context/AppContext';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

export function SelectInput(props: InputProps) {
  const { exercises, resetForm } = useContext(AppContext);

  const refSelect = useRef<HTMLSelectElement | null>(null);

  const { control } = useFormContext();
  const { field } = useController({
    name: props.name,
    control
  });
  const { value, onChange, ...restLangField } = field;

  const handleChange = useCallback(
    (option: { label: string; value: string; __isNew__?: true }) => {
      onChange(option ? option.label : '');
    },

    [onChange]
  );

  useEffect(() => {
    refSelect?.current?.clearValue();
  }, [resetForm]);

  return (
    <CreatableSelect
      className='select-input'
      placeholder={props.placeholder}
      isClearable
      options={exercises}
      value={value?.label}
      onChange={(option) => handleChange(option)}
      {...restLangField}
      formatCreateLabel={(value) => 'Adicionar: ' + value}
      noOptionsMessage={() => 'Digite uma nova opção'}
      ref={refSelect}
    />
  );
}
