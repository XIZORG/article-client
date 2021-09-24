import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllAuthors } from "../../dal/server/authors-api";
import AuthorBlock from "./AuthorBlock";
import styles from "./style-authors.module.css";

const Authors = (props) => {
    const [authorState, setauthorState] = useState(null);

    useEffect(() => {
        getAllAuthors().then((resp) => {
            console.log(resp);
            const allAuthors = resp.data;
            setauthorState(allAuthors);
        });
    }, [setauthorState]);

    if (authorState === null) return <>Downloading...</>;

    return (
        <div className={styles.articlesPage}>
            <div className={styles.articleWrapper}>
                {authorState.map((auhtor) => (
                    <AuthorBlock name={auhtor.name} id={auhtor.id} />
                ))}
            </div>

            <button className={styles.button + " col-secondary"}>
                <Link to={{ pathname: "/authors/create" }}>
                    create new author
                </Link>
            </button>
        </div>
    );
};

export default Authors;
