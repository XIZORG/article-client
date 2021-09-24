import { useEffect, useState } from "react";
import { deleteArticle, getArticle } from "../../dal/server/articles-api";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import styles from "./style-articles.module.css";
import { addArticleToAuthor, getAllAuthors } from "../../dal/server/authors-api";

const ArticlePage = (props) => {
    const [articleState, setArticleState] = useState({});
    let history = useHistory();
    const [authorState, setauthorState] = useState(null);

    useEffect(() => {
        getAllAuthors().then((resp) => {
            const allAuthors = resp.data;
            setauthorState(allAuthors);
        });
    }, []);

    useEffect(() => {
        getArticle(window.location.href.split("/")[5]).then((resp) => {
            const article = resp.data;
            setArticleState(article);
        });
    }, []);

    const sendAuthorToArticleRequest = (authorId) => {
        addArticleToAuthor(authorId, window.location.href.split("/")[5])
            .then((response) => {
                console.log(response);
                window.location.reload();
            })
            .catch((e) => console.log(e.response));
    };

    const sendDataToServer = () => {
        deleteArticle(window.location.href.split("/")[5])
            .then((response) => {
                console.log(response);
                history.push("/articles");
            })
            .catch((e) => console.log(e.response));
    };

    if (articleState === null || authorState === null) return <>Downloading...</>;

    return (
        <div className="flex-shrink-0">
            <div className="mt-5">Name1: {articleState.name}</div>
            <div className="lead">Description: {articleState.description}</div>
            <div>
                {" "}
                Authors:
                {articleState.authors &&
                    articleState.authors.map((author) => {
                        return <div>{author.name}</div>;
                    })}
            </div>
            <button className={"btn btn-primary"}>
                <Link to={{ pathname: "/articles/update/" + articleState.id }}>
                    update
                </Link>
            </button>
            <div className={"btn btn-danger"}>
                <button onClick={sendDataToServer}> delete</button>
            </div>
            <div className={styles.dropdown}>
                <button className={styles.dropbtn}>Add author</button>
                <div className={styles.dropdowncontent}>
                    {authorState.map((auhtor) => (
                        <button className={styles.but} onClick={() => sendAuthorToArticleRequest(auhtor.id)}>{auhtor.name}</button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ArticlePage;
