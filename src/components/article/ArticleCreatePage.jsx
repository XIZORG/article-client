import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { createArticle } from "../../dal/server/articles-api";
import { getAllAuthors } from "../../dal/server/authors-api";
import AlertUI from "../../utils/uiComponents/AlertUI/AlertUI";
import styles from "./style-articles.module.css";

const ArticleCreatePage = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [authorsId, setAuthorsId] = useState([]);
  const history = useHistory();
  const [authorState, setauthorState] = useState(null);
  const [createAlert, setCreateAlert] = useState(false);

  useEffect(() => {
    getAllAuthors().then((resp) => {
      const allAuthors = resp.data;
      setauthorState(allAuthors);
    });
  }, []);

  const sendDataToServer = (e) => {
    e.preventDefault();
    createArticle(name, description, authorsId)
      .then((response) => {
        console.log(response);
        history.push("/articles");
      })
      .catch((e) => setCreateAlert((prev) => !prev));
  };

  const changeNameString = (e) => {
    setName(e.target.value);
  };

  const changeDescriptionString = (e) => {
    setDescription(e.target.value);
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
              className={styles.but}
              onClick={() => addIdToArray(auhtor.id)}
            >
              {auhtor.name}
            </button>
          ))}
        </div>
      </div>
      <form className={"createArticle"} onSubmit={sendDataToServer}>
        <div className={styles.articleCreateWrapper}>
          <input
            className={styles.articleName}
            placeholder="name"
            onChange={changeNameString}
          />
          <textarea
            className={styles.articleDescription}
            placeholder="description"
            rows="5"
            onChange={changeDescriptionString}
          ></textarea>

          <button className={styles.floatingButton}>create</button>
        </div>
      </form>
      {createAlert && (
                <AlertUI
                    closeFunc={() => setCreateAlert(false)}
                >
                    <div className={styles.alertUpdate}>
                        <div className={styles.title}>
                            Bad request, check input data!
                        </div>
                        <div className={styles.alertBtnWrapper}>
                            <button className={"btn"} onClick={() => setCreateAlert(false)}>Ok</button>
                        </div>
                        
                    </div>
                </AlertUI>
            )}
    </>
  );
};

export default ArticleCreatePage;
