import { useEffect, useState } from "react"
import { useHistory } from "react-router";
import { deleteAuthors, getAuthors } from "../../dal/server/authors-api";
import AuthorRedo from "./AuthorRedo";
import styles from "./style-authors.module.css";


const AuthorPage = (props) => {
    const [isRedoMenuOpen, setIsRedoMenuOpen] = useState(false);
    const [authorState, setAuthorState] = useState({});
    let history = useHistory();

    useEffect( () => {
        getAuthors(window.location.href.split('/')[5]).then( (resp) => {
            console.log(resp);
            const author = resp.data;
            setAuthorState(author);
        });
    }, [setAuthorState] );

    const sendDataToServer = () => {
        deleteAuthors(window.location.href.split('/')[5]).then(response => {
            console.log(response);
            history.push('/authors');
        }).catch(e => console.log(e.response));
    }

    const toggleRedoMenu = () => {
        setIsRedoMenuOpen((prev) => !prev);
    };

    if (authorState === null) return <>Downloading...</>

    return (
        <div className="flex-shrink-0">
            <div className="mt-5">Name: {authorState.name}</div>

            <button className={styles.btnToggleRedo + (isRedoMenuOpen ? " " + styles.__opened : "")} onClick={toggleRedoMenu}>
                <img src={'https://cdn-icons-png.flaticon.com/512/709/709586.png'} alt="" />
                <div className={styles.btnText}>Edit menu</div> 
                
            </button>
            {isRedoMenuOpen && (
                <AuthorRedo
                    authorState={authorState}
                    deleteArticleOnServer={sendDataToServer}
                />
            )}
        </div>
    )
}

export default AuthorPage;