import React from 'react';
import styles from './blockUI.module.css'

function BlockUI({className, imgUrl, onClick, name}) {
    return (
        <div className={styles.block + " " + className} onClick={onClick}>
            <img src={imgUrl || "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png"} alt="image" />
            <div className={styles.name}>{name}</div>
        </div>
    );
}

export default BlockUI;