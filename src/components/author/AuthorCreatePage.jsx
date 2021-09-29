import { useState } from "react";
import { useHistory } from "react-router";
import { createAuthors } from "../../dal/server/authors-api";
import AlertUI from "../../utils/uiComponents/AlertUI/AlertUI";
import styles from "./style-authors.module.css";

const AuthorCreatePage = (props) => {
  const [name, setName] = useState("");
  const history = useHistory();
  const [createAlert, setCreateAlert] = useState(false);

  const sendDataToServer = (e) => {
    e.preventDefault();
    createAuthors(name)
      .then((response) => {
        console.log(response);
        history.push("/authors");
      })
      .catch((e) => setCreateAlert((prev) => !prev));
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

export default AuthorCreatePage;
