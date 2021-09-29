import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import {
    addArticleToAuthor,
    deleteArticleFromAuthor,
    getAllAuthors,
} from "../../../dal/server/authors-api";
import styles from "./article-page.module.css";
import { deleteArticle, getArticle } from "../../../dal/server/articles-api";
import ArticleRedo from "./ArticleRedo";

const ArticlePage = (props) => {
    const history = useHistory();
    const [articleState, setArticleState] = useState(null);
    const [authorState, setauthorState] = useState(null);
    const [isRedoMenuOpen, setIsRedoMenuOpen] = useState(false);


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

    const sendDeleteAuthorFromArticle = (authorId) => {
        deleteArticleFromAuthor(authorId, window.location.href.split("/")[5])
            .then((response) => {
                console.log(response);
                window.location.reload();
            })
            .catch((e) => console.log(e.response));
    };

    const deleteArticleOnServer = () => {
        deleteArticle(window.location.href.split("/")[5])
            .then((response) => {
                console.log(response);
                history.push("/articles");
            })
            .catch((e) => console.log(e.response));
    };

    const redirectToAuthor = (id) => {
        history.push(`/authors/show/${id}`);
    };

    const toggleRedoMenu = () => {
        setIsRedoMenuOpen((prev) => !prev);
    };

    if (articleState === null || authorState === null)
        return <>Downloading...</>;

    return (
        <div className={styles.article}>
            <div className={styles.name}>{articleState.name}</div>
            <div className={styles.description}>
                {articleState.description}
            </div>
            <div className={styles.authors}>
                <span className={styles.text}>Authors: </span>
                {articleState.authors.map((author) => {
                    return (
                        <a
                            className={styles.author + " link"}
                            onClick={() => redirectToAuthor(author.id)}
                        >
                            {author.name} |{" "}
                        </a>
                    );
                })}
            </div>
            <button className={styles.btnToggleRedo + (isRedoMenuOpen ? " " + styles.__opened : "")} onClick={toggleRedoMenu}>
                <img src={'https://cdn-icons-png.flaticon.com/512/709/709586.png'} alt="" />
                <div className={styles.btnText}>Edit menu</div> 
                
            </button>
            {isRedoMenuOpen && (
                <ArticleRedo
                    articleState={articleState}
                    authorState={authorState}
                    sendAuthorToArticleRequest={sendAuthorToArticleRequest}
                    deleteArticleOnServer={deleteArticleOnServer}
                    sendDeleteAuthorFromArticle={sendDeleteAuthorFromArticle}
                />
            )}
        </div>
    );
};

export default ArticlePage;
