import React from 'react';
import styles from './alertUI.module.css'

function AlertUI({children, className, closeFunc}) {
    return (
        <div className={styles.alertWrapper} onClick={closeFunc}>
            <div className={styles.alert + " " + className} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}

export default AlertUI;