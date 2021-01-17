import React from 'react';
import propTypes from 'prop-types';

import styles from './container.module.scss';

const Container = ({ children }) => (
    <div className={styles.wrapper}>{children}</div>
);

Container.propTypes = {
    children: propTypes.node,
};

export default Container;
