import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { getAuthors, updateAuthors } from "../../dal/server/authors-api";
import styles from "./style-authors.module.css";

const AuthorUpdatePage = (props) => {
  const [name, setName] = useState("");
  const [authorState, setAuthorState] = useState({});
  const history = useHistory();

  useEffect(() => {
    getAuthors(window.location.href.split("/")[5]).then((resp) => {
      console.log(resp);
      const author = resp.data;
      setAuthorState(author);
    });
  }, [setAuthorState]);

  const sendDataToServer = (e) => {
    e.preventDefault();
    updateAuthors(window.location.href.split("/")[5], name)
      .then((response) => {
        console.log(response);
        history.push("/authors");
      })
      .catch((e) => console.log(e.response));
  };

  if (authorState === null) return <>Downloading...</>;

  const changeNameString = (e) => {
    setName(e.target.value);
  };

  return (
    <>
      <h1 className={styles.marginLeft}>{authorState.name}</h1>

      <form  className={"createAuthor"} onSubmit={sendDataToServer}>
        <div className={styles.articleCreateWrapper}>
          <input
            className={styles.authorName}
            placeholder="new name"
            onChange={changeNameString}
          />
          <button className={styles.floatingButton}>update</button>
        </div>
      </form>
    </>
  );
};

export default AuthorUpdatePage;
