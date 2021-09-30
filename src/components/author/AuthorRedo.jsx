import React, { useState } from "react";
import styles from "./style-authors.module.css";
import { Link } from "react-router-dom";
import AlertUI from "../../utils/uiComponents/AlertUI/AlertUI";

function AuthorRedo({
    authorState,
    deleteArticleOnServer,
}) {
    const [isDeleteAlertOpened, setIsDeleteAlertOpened] = useState(false);

    return (
        <>
            <div className={styles.articleRedo}>
                <button className={"btn btn-primary"}>
                    <Link
                        to={{ pathname: "/authors/update/" + authorState.id }}
                    >
                        update
                    </Link>
                </button>

                <button
                    onClick={() => {
                        // sendDataToServer()
                        setIsDeleteAlertOpened((prev) => !prev);
                    }}
                    className={"btn btn-danger"}
                >
                    delete
                </button>

            </div>
            {isDeleteAlertOpened && (
                <AlertUI
                    closeFunc={() => setIsDeleteAlertOpened(false)}
                >
                    <div className={styles.alertDelete}>
                        <div className={styles.title}>
                            Are you shure you want to delete this article?
                        </div>
                        <div className={styles.alertBtnWrapper}>
                            <button className={"btn btn-danger"} onClick={() => deleteArticleOnServer()}>Yes</button>
                            <button className={"btn"} onClick={() => setIsDeleteAlertOpened(false)}>No</button>
                        </div>
                        
                    </div>
                </AlertUI>
            )}
        </>
    );
}

export default AuthorRedo;
