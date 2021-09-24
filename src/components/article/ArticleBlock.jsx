import { Link } from "react-router-dom";
import Card from "../../utils/uiComponents/Card/Card";
import styles from "./style-articles.module.css";

const ArticleBlock = ({ name, id }) => {
    return (
        <Card className={styles.articleBlock}>
            <div>{name}</div>
            <button className={styles.button}>
                <Link to={{ pathname: "/articles/show/" + id }}>details</Link>
            </button>
        </Card>
    );
};

export default ArticleBlock;
