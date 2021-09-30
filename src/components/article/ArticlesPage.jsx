import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { getAllArticles } from "../../dal/server/articles-api";
import BlockUI from "../../utils/uiComponents/BlockUI/BlockUI";
import styles from "./style-articles.module.css";

const ArticlesPage = ({ contextFunction }) => {
  const history = useHistory();
  const [article, setArticle] = useState(null);
  const [articleIds, setIds] = useState([]);

  useEffect(() => {
    getAllArticles().then((resp) => {
      const allArticles = resp.data;
      setArticle(allArticles);
    });
  }, []);

  const handleCheckboxChange = (e) => {
    let index = articleIds.indexOf(e);
    if (index > -1) {
      articleIds.splice(index, 1);
    } else {
      articleIds.push(e);
    }
    setIds(articleIds);
    contextFunction(articleIds);
  };

  if (article === null) return <>Downloading...</>;

  return (
    <div className={styles.articlesPage}>
      <div className={styles.articleWrapper}>
        {article.map((article) => (
          <>
            <input
              type="checkbox"
              onChange={() => handleCheckboxChange(article.id)}
            />
            <BlockUI
              imgUrl={
                "https://images.wallpaperscraft.ru/image/single/griby_risunok_raznovidnost_92183_1280x720.jpg"
              }
              name={article.name}
              className={styles.articleBlock}
              onClick={() => history.push(`/articles/show/${article.id}`)}
            />
          </>
        ))}
      </div>
    
      <button className={styles.button}>
        <Link to={{ pathname: "/articles/create" }}>create new article</Link>
      </button>
      {articleIds.length === 0 ? (
        <></>
      ) : (
        <button className={styles.button}>
        <Link to={{ pathname: "/articles/addAuthorsToArticle" }}>add authors</Link>
      </button>
      )}
    </div>
  );
};

export default ArticlesPage;
