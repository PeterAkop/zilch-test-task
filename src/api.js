import moment from 'moment';

const url = 'https://api.covid19api.com/';

const getSummary = () => {
  return fetch(`${url}summary`).then(response => {
    if (!response.ok) {
      throw new Error(`failed to fetch summary`);
    } else {
      return response.json();
    }
  });
};
const getLastFiveDays = country => {
  const format = 'YYYY-MM-DD';
  const date = {
    to: moment().format(format),
    from: moment().subtract(5, 'days').format(format),
  };
  return fetch(
    `${url}country/${country}/status/confirmed/live?from=${date.from}T00:00:00Z&to=${date.to}T00:00:00Z`,
  ).then(response => {
    if (!response.ok) {
      throw new Error(`failed to fetch last five days for ${country}`);
    } else {
      return response.json();
    }
  });
};

export { getSummary, getLastFiveDays };
