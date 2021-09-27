import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { getAllArticles } from "../../dal/server/articles-api";
import BlockUI from "../../utils/uiComponents/BlockUI/BlockUI";
import styles from "./style-articles.module.css";

const ArticlesPage = (props) => {
    const history = useHistory()
    const [article, setArticle] = useState(null);

    useEffect(() => {
        console.log("THIS IS A TEXT AZAZAZSAZ")
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
                    <BlockUI
                        imgUrl={
                            "https://images.wallpaperscraft.ru/image/single/griby_risunok_raznovidnost_92183_1280x720.jpg"
                        }
                        name={article.name}
                        className={styles.articleBlock}
                        onClick={() => history.push(`/articles/show/${article.id}`)}
                    />
                ))}
            </div>

            <button className={styles.button}>
                <Link to={{ pathname: "/articles/create" }}>
                    create new article
                </Link>
            </button>
        </div>
    );
};

export default ArticlesPage;
