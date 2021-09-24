import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllArticles } from "../../dal/server/articles-api";
import ArticleBlock from "./ArticleBlock";
import styles from "./style-articles.module.css";

const ArticlesPage = (props) => {
    const [article, setArticle] = useState(null);

    useEffect(() => {
        getAllArticles().then((resp) => {
            const allArticles = resp.data;
            setArticle(allArticles);
        });
    }, []);

    if (article === null) return <>Downloading...</>;

    return (
        <div className={styles.articlesPage}>
            <div className={styles.articleWrapper}>
                {article.map((article) => (
                    <ArticleBlock name={article.name} id={article.id} />
                ))}
            </div>

            <button className={styles.button + " col-secondary"}>
                <Link to={{ pathname: "/articles/create" }}>
                    create new article
                </Link>
            </button>
        </div>
    );
};

export default ArticlesPage;
