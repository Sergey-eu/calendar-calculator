import React, { FC, useEffect, useState } from 'react';
import { Button } from '../../components/common';
import { CalculatorInputManual, CalculatorLog } from '../../components/calculator';
import { getDateParts } from '../../helpers/common-functions';

import styles from './calculator.module.scss';

export const Calculator: FC = () => {
  const initialFieldState = {
    value: '',
    valid: false
  }
  const [startDate, setStartDate] = useState<CalculatorInputManual.InputProps>(initialFieldState)
  const [endDate, setEndDate] = useState<CalculatorInputManual.InputProps>(initialFieldState)
  const [formValid, setFormValid] = useState<boolean>(false)
  const [logData, setLogData] = useState<Array<CalculatorLog.ItemProps>>([])

  useEffect(() => {
    setFormValid(startDate.valid && endDate.valid)
  }, [startDate, endDate])

  const dateFormatter = (date: string) => {
    return new Date(`${getDateParts(date).month}/${getDateParts(date).day}/${getDateParts(date).year}`);
  }

  const getDays = () => {
    const startTime = dateFormatter(startDate.value).getTime();
    const endTime = dateFormatter(endDate.value).getTime();
    // days start at 00:00,
    // so the last day is not included in "endTime",
    // but the first day is included in "startTime" completely, so it needs to be offset by "-1"
    // time difference may be non-integer due to daylight saving time, so it needs to be rounded
    const daysDifference = Math.round((endTime - startTime) / (1000 * 3600 * 24)) - 1;
    setLogData([
      {
        id: new Date().toISOString(),
        start: startDate.value.replace(/\s/g, ""),
        end: endDate.value.replace(/\s/g, ""),
        duration: daysDifference < 0 ? `Error: "End Date" can't be earlier than "Start Date"` : daysDifference
      },
      ...logData
    ])
    setStartDate(initialFieldState);
    setEndDate(initialFieldState);
  }

  return (
    <div className={styles.calculator}>
      <fieldset className={styles.calculator__form}>
        <legend>Experiment duration calculator</legend>
        <CalculatorInputManual.$ initialState={startDate} name='start-date' label='Start date' onChange={setStartDate} />
        <CalculatorInputManual.$ initialState={endDate} name='end-date' label='End date' onChange={setEndDate} />
        <div className={styles.calculator__formAction}>
          <Button.$ label='Calculate' theme={Button.Theme.Primary} size={Button.Size.Medium} width={Button.Width.Full} onClick={getDays} disabled={!formValid} testId='get-days' />
        </div>
      </fieldset>
      <CalculatorLog.$ data={logData} testId="calculation-log" />
    </div>
  );
}
