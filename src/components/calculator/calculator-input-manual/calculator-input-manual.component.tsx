import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { Input } from '../../common';
import { getDateParts } from '../../../helpers/common-functions';
import styles from './calculator-input-manual.module.scss';

export namespace CalculatorInputManual {

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
      // allow numeric value only
      const e = event.nativeEvent as any;
      if (!/[0-9]/i.test(e.data) && e.inputType !== 'deleteContentBackward') {
        return
      }

      // apply simple mask
      const newDate = event.target.value;
      if (newDate.match(/^\d{2}$/) || newDate.match(/^\d{2}\s\/\s\d{2}$/)) {
        setDate(newDate + ' / ');
      } else if (newDate.match(/^\d{2}\s\/$/) || newDate.match(/^\d{2}\s\/\s\d{2}\s\/$/)) {
        setDate(newDate.slice(0, -3));
      } else {
        setDate(newDate);
      }

      // validate while typing
      const isValid = isDateValid(event.target.value)
      setValid(isValid)

      // update filed status
      onChange({
        value: newDate,
        valid: isValid,
      })
    }

    const getErrorList = (year: number, month: number, day: number) => {
      const newDate = new Date(year, month, day);
      const errors: Array<string> = [];
      if (year > 2999 || year < 1901 || isNaN(year)) {
        errors.push('The year is not in the valid range, please select between 1901 and 2999');
      }
      if (month > 11 || month < 0 || isNaN(month) ) {
        errors.push('The month is not in the valid range, select from 01 to 12');
      }
      if (day === 0 || day.toString().length < 2) {
        errors.push('Correct day is required');
      }
      if (newDate.getDate() !== day && newDate.toString() !== 'Invalid Date') {
        errors.push('There is no such day');
      }
      setErrorMessage(errors)
    }

    const isDateValid = (date: string) => {
      const year = getDateParts(date).year;
      const month = getDateParts(date).month-1;
      const day = getDateParts(date).day;
      const newDate = new Date(year, month, day);

      if (
        // Date range check
        year < 3000 &&
        year > 1900 &&
        // Date existance check
        newDate.getMonth() === month &&
        newDate.getDate() === day
      ) {
        return true
      }
      getErrorList(year, month, day);
      return false
    }

    useEffect(()=> {
      if (initialState.value === '') setDate(initialState.value)
    },[initialState])

    return (
      <div className={styles.calculatorInputManual}>
        <Input.$
          value={date}
          label={label}
          name={name}
          size={Input.Size.Medium}
          onChange={onChangeHandler}
          onBlur={isDateValid}
          placeholder="DD / MM / YYYY"
          maxLength={14}
          isError={!valid}
          errorMessage={!valid ? errorMessage : []}
          testId={name}
        />
      </div>
    );
  };
}
