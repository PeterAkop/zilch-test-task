import React, { useEffect, useState, useContext } from 'react';

import styles from './summary.module.scss';
import Table from '../Table/Table';
import { prepareData, getLatestFive } from './helper';
import DataContext from '../../pages/dataContext';
import Details from './Details';

const Summary = () => {
    const [innerData, setInnerData] = useState();
    const [details, setDetails] = useState(false);
    const data = useContext(DataContext);

    useEffect(() => {
        if (data) {
            setInnerData(prepareData(data));
        }
    }, [data]);

    const handler = {
        get(obj, prop) {
            return prop in obj ? obj[prop] : v => <span>{v}</span>;
        },
    };

    const formatter = {
        NewDeaths: v => (
            <span className={v > 0 ? styles.newDeaths : {}}>
                <span>{v > 0 ? `+ ${v}` : v}</span>
            </span>
        ),
        NewConfirmed: v => (
            <span className={v > 0 ? styles.newConfirmed : {}}>
                <span>{v > 0 ? `+ ${v}` : v}</span>
            </span>
        ),
        LastFiveDays: v => {
            const handleLastFiveDays = () => {
                getLatestFive(v.Country, setDetails);
            };
            return (
                <button className={styles.button} onClick={handleLastFiveDays}>
                    click to view
                </button>
            );
        },
    };

    const handleSearch = event => {
        const { Countries } = data;
        const reg = new RegExp(event.target.value, 'i');
        const result = Countries.filter(r => r.Country.match(reg));
        setInnerData({
            ...innerData,
            rows: prepareData({ Countries: result }).rows,
        });
    };

    const handleDetailsClose = () => {
        setDetails(null);
    };

    return (
        <div className={styles.wrapper} id={'summary'}>
            {details && <Details data={details} onClose={handleDetailsClose} />}
            <div className={styles.search}>
                <span>Search for country</span>
                <input onChange={handleSearch} />
            </div>
            {innerData && Object.keys(innerData) && (
                <Table
                    {...innerData}
                    selFormatter={new Proxy(formatter, handler)}
                />
            )}
        </div>
    );
};

export default Summary;
