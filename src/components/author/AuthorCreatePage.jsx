import { useState } from "react";
import { useHistory } from "react-router";
import { createAuthors } from "../../dal/server/authors-api";
import styles from "./style-authors.module.css";

const AuthorCreatePage = (props) => {
  const [name, setName] = useState("");
  let history = useHistory();

  const sendDataToServer = (e) => {
    e.preventDefault();
    createAuthors(name)
      .then((response) => {
        console.log(response);
        history.push("/authors");
      })
      .catch((e) => console.log(e.response));
  };

  const changeNameString = (e) => {
    setName(e.target.value);
  };

  return (
    <>
      <form className={"createAuthor"} onSubmit={sendDataToServer}>
        <div className={styles.articleCreateWrapper}>
          <input
            className={styles.authorName}
            placeholder="name"
            onChange={changeNameString}
          />
          <button className={styles.floatingButton}>create</button>
        </div>
      </form>
    </>
  );
};

export default AuthorCreatePage;
