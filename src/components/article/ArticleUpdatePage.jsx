import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { getArticle, updateArticle } from "../../dal/server/articles-api";
import styles from "./articlePage/article-page.module.css";
import stylesMain from "./style-articles.module.css";


const ArticleUpdatePage = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [articleState, setArticleState] = useState(null);
  const history = useHistory();

  useEffect(() => {
    getArticle(window.location.href.split("/").pop()).then((resp) => {
      const article = resp.data;
      setArticleState(article);
    });
  }, []);

  const sendDataToServer = (e) => {
    e.preventDefault();
    updateArticle(window.location.href.split("/").pop(), name, description, [])
      .then((response) => {
        history.push("/articles");
      })
      .catch((e) => console.log(e.response));
  };

  if (articleState === null) return <>Downloading...</>;

  const changeNameString = (e) => {
    setName(e.target.value);
  };

  const changeDescriptionString = (e) => {
    setDescription(e.target.value);
  };

  const redirectToAuthor = (id) => {
    history.push(`/authors/show/${id}`);
  };

  if (articleState === null) return <>Downloading...</>;

  return (
    <div className={styles.article}>
      <div className={styles.name}>{articleState.name}</div>
      <div className={styles.description}>{articleState.description}</div>
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

      <form className={"createArticle"} onSubmit={sendDataToServer}>
        <div className={stylesMain.articleCreateWrapper}>
          <input
            className={stylesMain.articleName}
            placeholder="new name"
            onChange={changeNameString}
          />
          <textarea
            className={stylesMain.articleDescription}
            placeholder="new description"
            rows="5"
            onChange={changeDescriptionString}
          ></textarea>

          <button className={stylesMain.floatingButton}>update</button>
        </div>
      </form>
    </div>
  );
};

export default ArticleUpdatePage;
