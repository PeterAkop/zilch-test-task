import React from 'react';
import { render } from '@testing-library/react';
import Table from './Table';

const rows = [{ test: 'test1' }, { test: 'test2' }];
const header = ['test'];
const selFormatter = {
  test: v => <span data-testid={'test-id'}>{v}</span>,
};

// more tests can be added

test('check selFormatter is rendered', async () => {
  const { getAllByTestId } = render(
    <Table rows={rows} header={header} selFormatter={selFormatter} />,
  );
  const selWrapper = await getAllByTestId('test-id');
  expect(selWrapper.length).toEqual(rows.length);
});
