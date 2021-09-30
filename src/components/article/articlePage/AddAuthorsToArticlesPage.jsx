import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { ArticleContext } from "../../../App";
import { getArticle } from "../../../dal/server/articles-api";
import { addArticleToAuthor, getAllAuthors } from "../../../dal/server/authors-api";
import styles from "./article-page.module.css";

const AddAuthorsToArticlesPage = (props) => {
  const [authorsId, setAuthorsId] = useState([]);
  const history = useHistory();
  const [authorState, setauthorState] = useState(null);
  const articlesId = useContext(ArticleContext);
  const [articleArray, setArticle] = useState([]);

  useEffect(() => {
    articlesId.map((data) => {
      getArticle(data).then((resp) => {
          let buff = resp.data;
        setArticle(articleArray => ([...articleArray, buff]));
      });
    });
  }, []);

  useEffect(() => {
    getAllAuthors().then((resp) => {
      const allAuthors = resp.data;
      setauthorState(allAuthors);
    });
  }, []);

    const sendDataToServer = (e) => {
        let summ = +articlesId.length * authorsId.length;
        let counter = 0;
        articlesId.map(data => {
            authorsId.map(inside => {
                addArticleToAuthor(+inside, +data).then((resp) => {
                    counter++;
                    if (counter >= summ) {
                        history.push("/articles");
                    }
                });
            })
        });
    };

  const addIdToArray = (authorId) => {
    setAuthorsId([...authorsId, authorId]);
  };

  if (authorState === null) return <>Downloading...</>;

  return (
    <>
      <div className={styles.dropdown}>
        <button className={styles.dropbtn}>Add author</button>
        <div className={styles.dropdowncontent}>
          {authorState.map((auhtor) => (
            <button
              key ={auhtor.id}
              className={styles.but}
              onClick={() => addIdToArray(auhtor.id)}
            >
              {auhtor.name}
            </button>
          ))}
        </div>
      </div>
      <div className={styles.articlesContainer}>
          <h2>choosen articles:</h2>
        {articleArray.map((data) => {
          return <h2 key={data.id}>,{data.name}</h2>;
        })}
      </div>
      <button onClick={sendDataToServer} className={styles.floatingButton}>unite</button>

    </>
  );
};

export default AddAuthorsToArticlesPage;
