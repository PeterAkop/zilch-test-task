import React, { useEffect, useState, useMemo } from 'react';
import propTypes from 'prop-types';

import styles from './table.module.scss';
import { defaultPerPage } from './const';

const Table = ({ rows, header, selFormatter, perPage = defaultPerPage }) => {
    const [pagination, setPagination] = useState();

    useEffect(() => {
        if (rows && rows.length > perPage) {
            setPagination({
                page: 1,
                perPage,
                totalPage: Math.round(rows.length / perPage),
            });
        } else {
            setPagination(null);
        }
    }, [rows, perPage]);

    const tR = useMemo(() => {
        let pageRows = rows;
        if (pagination) {
            const { page, perPage } = pagination;
            const slicePage = page - 1;
            pageRows = rows.slice(
                slicePage * perPage,
                slicePage * perPage + perPage,
            );
        }
        return pageRows.map((r, i) =>
            header.map(h => (
                <span
                    key={`${h}-${i}`}
                    className={styles.row}
                    style={
                        i === pageRows.length - 1
                            ? { borderBottom: 'none' }
                            : {}
                    }
                >
                    {selFormatter[h](r[h])}
                </span>
            )),
        );
    }, [rows, pagination, header, selFormatter]);

    const tH = useMemo(
        () =>
            header.map(h => (
                <span key={h} className={styles.header}>
                    <span>{h}</span>
                </span>
            )),
        [header],
    );

    const hasPrevious = useMemo(() => pagination && pagination.page > 1, [
        pagination,
    ]);

    const hasNext = useMemo(
        () => pagination && pagination.page < pagination.totalPage,
        [pagination],
    );

    const handleNext = () => {
        setPagination({ ...pagination, page: pagination.page + 1 });
    };

    const handlePrevious = () =>
        setPagination({ ...pagination, page: pagination.page - 1 });

    return (
        <div
            className={styles.wrapper}
            style={{ gridTemplateColumns: `repeat(${header.length}, 1fr)` }}
        >
            {tH}
            {tR}
            {pagination && (
                <div
                    className={styles.pagination}
                    style={{ gridColumnEnd: header.length + 1 }}
                >
                    <span>
                        page:
                        {pagination.page}
                    </span>
                    <button
                        className={styles.button}
                        onClick={handlePrevious}
                        disabled={!hasPrevious}
                    >
                        previous
                    </button>
                    <button
                        className={styles.button}
                        disabled={!hasNext}
                        onClick={handleNext}
                    >
                        next
                    </button>
                    <span>
                        total pages:
                        {pagination.totalPage}
                    </span>
                </div>
            )}
        </div>
    );
};

Table.propTypes = {
    rows: propTypes.arrayOf(propTypes.object).isRequired,
    header: propTypes.arrayOf(propTypes.string).isRequired,
    selFormatter: propTypes.object,
    perPage: propTypes.number,
};

export default Table;
