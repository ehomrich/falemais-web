import React, { SelectHTMLAttributes, useEffect, useRef } from 'react';
import { useField } from '@unform/core';

import { Container, InputError } from './styles';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
}

const Input: React.FC<SelectProps> = ({ name, ...props }) => {
  const inputRef = useRef<HTMLSelectElement>(null);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container isErrored={!!error}>
      <select
        name={name}
        defaultValue={defaultValue}
        ref={inputRef}
        {...props}
      />

      {error && <InputError>{error}</InputError>}
    </Container>
  );
};

export default Input;
