import React, { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import propTypes from 'prop-types';
import moment from 'moment';

import styles from './summary.module.scss';

const Details = ({ data, onClose, id = 'summary' }) => {
    const ref = useRef();

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [data]);

    const handleClickOutside = ({ target }) => {
        if (ref && !ref.current.contains(target)) {
            onClose && onClose();
        }
    };

    return (
        <>
            {createPortal(
                <div className={styles.details} ref={ref}>
                    <div>
                        {data && (
                            <>
                                <span>
                                    Country : {data.elements[0].Country}
                                </span>
                                <ul>
                                    {data.elements.map(({ Cases, Date }, i) => {
                                        return (
                                            <li key={`${Cases}-${i}`}>
                                                <span>
                                                    Date:
                                                    {moment(Date).format(
                                                        'YYYY-MM-DD',
                                                    )}
                                                </span>
                                                <span> Cases: {Cases}</span>
                                            </li>
                                        );
                                    })}
                                </ul>
                                <span>source : {data.source}</span>
                                <span style={{ color: 'white' }}>
                                    click outside to close!
                                </span>
                            </>
                        )}
                    </div>
                </div>,
                document.querySelector(`#${id}`),
            )}
        </>
    );
};

Details.prototype = {
    data: propTypes.shape({
        elements: propTypes.arrayOf(propTypes.object).isRequired,
        source: propTypes.string.isRequired,
        id: propTypes.string,
    }),
};

export default Details;
