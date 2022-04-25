import React, { FC } from 'react';

import styles from './calculator-log.module.scss';

export namespace CalculatorLog {

  export type ItemProps = Readonly<{
    id?: string;
    start: string;
    end: string;
    duration: number | string;
  }>;

  export type Props = Readonly<{
    data?: Array<ItemProps>
    testId?: string;
  }>;

  export const $: FC<Props> = (props) => {
    const {
      data = [],
      testId
    } = props;

    if (data.length === 0) {
      return <></>
    }

    return (
      <div className={styles.calculatorLog}>
        <div className={styles.calculatorLog__title}>History</div>
        <table data-testid={testId}>
          <thead>
            <tr>
              <th style={{ width: '40px' }}>№</th>
              <th>First day</th>
              <th>Last day</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) =>
              <tr key={item.id}>
                <td>{data.length - i}</td>
                <td>{item.start}</td>
                <td>{item.end}</td>
                <td data-testid={`duration-${data.length - i}`}>
                  {typeof item.duration === 'string' ? <small className='error'>{item.duration}</small> : item.duration}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  };
}
