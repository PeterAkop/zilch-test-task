import React from 'react';
import { render } from '@testing-library/react';
import Home from './Home';

const summaryCall = jest.fn();

global.fetch = jest.fn(summaryCall);
test('Summary end point should be called on component mount', () => {
    render(<Home />);
    expect(summaryCall).toHaveBeenCalled();
});
