import React, { useState } from "react";
import styles from "./article-page.module.css";
import { Link } from "react-router-dom";
import AlertUI from "../../../utils/uiComponents/AlertUI/AlertUI";

function ArticleRedo({
  authorState,
  articleState,
  deleteArticleOnServer,
  sendAuthorToArticleRequest,
  sendDeleteAuthorFromArticle
}) {
  const [isDeleteAlertOpened, setIsDeleteAlertOpened] = useState(false);

  return (
    <>
      <div class={styles.articleRedo}>
        <button className={"btn btn-primary"}>
          <Link to={{ pathname: "/articles/update/" + articleState.id }}>
            update
          </Link>
        </button>

        <button
          onClick={() => {
            setIsDeleteAlertOpened((prev) => !prev);
          }}
          className={"btn btn-danger"}
        >
          delete
        </button>

        <div className={styles.dropdown}>
          <button className={styles.dropbtn}>add author</button>
          <div className={styles.dropdowncontent}>
            {authorState.map((author) => (
              <button
                className={styles.but}
                onClick={() => sendAuthorToArticleRequest(author.id)}
              >
                {author.name}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.dropdown}>
          <button className={styles.dropbtn}>delete author</button>
          <div className={styles.dropdowncontent}>
            {articleState.authors.map((author) => {
              return (
                <a
                  className={styles.but}
                  onClick={() => sendDeleteAuthorFromArticle(author.id)}
                >
                  {author.name}
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {isDeleteAlertOpened && (
        <AlertUI closeFunc={() => setIsDeleteAlertOpened(false)}>
          <div className={styles.alertDelete}>
            <div className={styles.title}>
              Are you shure you want to delete this article?
            </div>
            <div className={styles.alertBtnWrapper}>
              <button
                className={"btn btn-danger"}
                onClick={() => deleteArticleOnServer()}
              >
                Yes
              </button>
              <button
                className={"btn"}
                onClick={() => setIsDeleteAlertOpened(false)}
              >
                No
              </button>
            </div>
          </div>
        </AlertUI>
      )}
    </>
  );
}

export default ArticleRedo;
