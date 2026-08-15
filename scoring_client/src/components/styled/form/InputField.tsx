// region imports

import styles from './InputField.module.css';
import {useEffect, useRef} from "react";
import * as React from "react";
import {InputType} from "../../../types/enums/ui/InputType.ts";

// endregion

// region local

export type InputFieldProps = Readonly<{
  value: string;
  type?: InputType;
  autoFocus?: boolean;
  onChange?: (value: string) => void;
  onLeave?: () => void;
  onInputRef?: (reference: HTMLInputElement) => void;
  onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  error?: boolean;
  readonly?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  placeholder?: string;
}>;

function getTypeText(type: InputType): string
{
  switch(type) {
    case InputType.Text:
      return 'text';
    case InputType.Number:
      return 'number';
    case InputType.Email:
      return 'email';
    case InputType.Password:
      return 'password';
  }
}

// endregion

// region exports

export function InputField({
  value, onChange, onLeave, type = InputType.Text, autoFocus = false, onInputRef, onKeyPress, error,
  readonly, disabled, onClick, placeholder
}: InputFieldProps) {
  const inputRef = useRef(null);
  useEffect(
    () => {
      if (inputRef.current && onInputRef) {
        onInputRef(inputRef.current);
      }
    },
    [onInputRef]
  );
  return (
    <input
      ref={inputRef}
      type={getTypeText(type)}
      value={value}
      onChange={(event) => onChange?.(event.target.value)}
      onBlur={onLeave}
      onKeyDown={onKeyPress}
      className={styles['input-field'] + (error ? ' ' + styles['input-field--is-error'] : '')}
      autoFocus={autoFocus}
      readOnly={readonly}
      disabled={disabled}
      onClick={onClick}
      placeholder={placeholder}
    />
  )
}

// endregion