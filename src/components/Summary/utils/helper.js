import moment from 'moment';

import Cache from '../../../Cache';
import { headerOmitField, lastFiveDays } from './enum';
import { getLastFiveDays } from '../../../api';

export const prepareData = ({ Countries }) => {
  const preparedData = {};
  if (Countries) {
    const header = Object.keys(Countries[0]).filter(
      h => !headerOmitField.includes(h),
    );
    header.push(lastFiveDays);
    preparedData.header = header;
    preparedData.rows = Countries.map(c => ({ ...c, LastFiveDays: c }));
  }
  return preparedData;
};

export const getLatestFive = (country, callBack) => {
  let date = moment().format('YYYY-MM-DD');
  date = `${country}-${date}`;

  Cache.get(date)
    .then(daysFromCache => {
      if (!daysFromCache) {
        getLastFiveDays(country)
          .then(days => {
            Cache.insert({ date, days }).then(
              () =>
                callBack &&
                callBack({
                  elements: days,
                  source: 'from api request',
                }),
            );
          })
          .catch(error => callBack({ error: error.message }));
      } else {
        callBack &&
          callBack({
            elements: daysFromCache.days,
            source: 'from cache',
          });
      }
    })
    .catch(error => callBack({ error: error.message }));
};
