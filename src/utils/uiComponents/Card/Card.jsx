import React from "react";
import styles from "./card.module.css";

function Card({ children, className="", img }) {
    return <div className={styles.card + " " + className}>{children}</div>;
}

export default Card;
