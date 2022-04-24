import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Calculator } from '.';

type CalculationProps = {
  startInput: string,
  startExpected: string,
  endInput: string,
  endExpected: string,
  result: string,
  resultId: string,
}

const cases: Array<CalculationProps> = [
  {
    startInput: '02061983',
    startExpected: '02 / 06 / 1983',
    endInput: '22061983',
    endExpected: '22 / 06 / 1983',
    result: '19',
    resultId: '1',
  },
  {
    startInput: '04071984',
    startExpected: '04 / 07 / 1984',
    endInput: '25121984',
    endExpected: '25 / 12 / 1984',
    result: '173',
    resultId: '2',
  },
  {
    startInput: '03011989',
    startExpected: '03 / 01 / 1989',
    endInput: '03081983',
    endExpected: '03 / 08 / 1983',
    result: 'Error',
    resultId: '3',
  },
]

const scenario = (props: CalculationProps) => {
  const {
    startInput,
    startExpected,
    endInput,
    endExpected,
    result,
    resultId,
  } = props
  const startDateInput = screen.getByTestId('start-date') as HTMLInputElement;
  const endDateInput = screen.getByTestId('end-date') as HTMLInputElement;
  const calculateButton = screen.getByTestId('get-days') as HTMLButtonElement;

  userEvent.type(startDateInput, startInput)
  expect(startDateInput).toHaveValue(startExpected)

  userEvent.type(endDateInput, endInput)
  expect(endDateInput).toHaveValue(endExpected)

  expect(calculateButton).not.toBeDisabled()

  userEvent.click(calculateButton)

  const firstCalculationResult = screen.getByTestId(`duration-${resultId}`) as HTMLTableCellElement;
  expect(firstCalculationResult).toHaveTextContent(result)
}

test('adding item to log', () => {
  render(<Calculator />);
  const calculateButton = screen.getByTestId('get-days') as HTMLButtonElement;
  const calculationLog = screen.queryByText('History') as HTMLDivElement;

  // inital state
  expect(calculateButton).toBeDisabled();
  expect(calculationLog).toBeNull()

  // cases
  cases.map(item => scenario(item))
});
