import { Link } from "react-router-dom";
import Card from "../../utils/uiComponents/Card/Card";
import styles from "./style-authors.module.css";

const AuthorBlock = ({name, id }) => {

    return (
        <Card className={styles.articleBlock}>
                <div>{name}</div>
            <button className={styles.button}>
                <Link to = {{pathname: '/authors/show/' + id}}>details</Link>
            </button>
        </Card>
    );
}

export default AuthorBlock;