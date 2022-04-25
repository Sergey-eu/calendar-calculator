import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { Input } from '../../common';
import { validateDate, dateInputMask } from '../../../helpers/date-functions';

export namespace CalculatorInput {

  export type InputProps = Readonly<{
    value: string;
    valid: boolean;
  }>

  export type Props = Readonly<{
    name: string;
    label?: string;
    initialState: InputProps;
    onChange: (inputState: InputProps) => void;
  }>;

  export const $: FC<Props> = (props) => {
    const {
      name,
      label,
      initialState,
      onChange
    } = props;
    const [date, setDate] = useState<string>(initialState.value)
    const [valid, setValid] = useState<boolean>(initialState.valid)
    const [errorMessage, setErrorMessage] = useState<Array<string>>([]);

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      // allow numeric input only
      const e = event.nativeEvent as any;
      if (!/[0-9]/i.test(e.data) && e.inputType !== 'deleteContentBackward') {
        return
      }
      const date = event.target.value;

      // set value with mask
      setDate(dateInputMask(date) || date)

      // validate while typing
      const validationResult = validateDate(date)
      setValid(validationResult.isValid)
      setErrorMessage(validationResult.errors)

      // update form status
      onChange({
        value: date,
        valid: validationResult.isValid,
      })
    }

    const onBlurHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const validationResult = validateDate(event.target.value)
      setValid(validationResult.isValid)
      setErrorMessage(validationResult.errors)
    }

    useEffect(() => {
      // refresh field by parent (form)
      if (initialState.value === '') setDate(initialState.value)
    }, [initialState])

    return (
      <Input.$
        value={date}
        label={label}
        name={name}
        size={Input.Size.Medium}
        width={Input.Width.Full}
        onChange={onChangeHandler}
        onBlur={onBlurHandler}
        placeholder="DD / MM / YYYY"
        maxLength={14}
        isError={!valid}
        errorMessage={!valid ? errorMessage : []}
        testId={name}
      />
    );
  };
}
