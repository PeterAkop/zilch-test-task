import moment from 'moment';

const url = 'https://api.covid19api.com/';

const getSummary = () => {
    return fetch(`${url}summary`).then(response => response.json());
};
const getLastFiveDays = country => {
    const format = 'YYYY-MM-DD';
    const date = {
        to: moment().format(format),
        from: moment().subtract(5, 'days').format(format),
    };
    return fetch(
        `${url}country/${country}/status/confirmed/live?from=${date.from}T00:00:00Z&to=${date.to}T00:00:00Z`,
    ).then(response => response.json());
};

export { getSummary, getLastFiveDays };
