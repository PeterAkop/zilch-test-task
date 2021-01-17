import { headerOmitField, lastFiveDays } from './const';
import { prepareData, getLatestFive } from './helper';

const apiCall = jest.fn();
const callBack = jest.fn();
global.fetch = jest.fn(apiCall);
const mockObject = { country: 'val' };
jest.mock('../../Cache', () => ({
    insert: ({ date, days }) => {
        mockObject[date] = days;
    },
    get: key => {
        return Promise.resolve(`mock data-${key}`);
    },
}));

test('prepareData function should remove Omitted elements from header and add LastFiveDays both in header and row', () => {
    const testData = [{ test: 'val', [headerOmitField[0]]: 'val' }];
    const { header, rows } = prepareData({ Countries: testData });
    expect(header.includes(headerOmitField[0])).toBeFalsy();
    expect(header.includes(lastFiveDays)).toBeTruthy();
    expect(rows[0][lastFiveDays]).toBeTruthy();
});

test('if there is value in cache should not make a call to api', async () => {
    await getLatestFive('mockKey', callBack);
    expect(apiCall).toHaveBeenCalledTimes(0);
    expect(callBack).toHaveBeenCalled();
});
