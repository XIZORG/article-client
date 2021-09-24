import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import {
    addArticleToAuthor,
    getAllAuthors,
} from "../../../dal/server/authors-api";
import styles from "./article-page.module.css";
import { deleteArticle, getArticle } from "../../../dal/server/articles-api";
import ArticleRedo from "./ArticleRedo";

const ArticlePage = (props) => {
    const history = useHistory();

    const [articleState, setArticleState] = useState(null);
    const [authorState, setauthorState] = useState(null);

    const [isRedoMenuOpen, setIsRedoMenuOpen] = useState(false);

    useEffect(() => {
        getAllAuthors().then((resp) => {
            const allAuthors = resp.data;
            setauthorState(allAuthors);
        });
    }, []);

    useEffect(() => {
        getArticle(window.location.href.split("/")[5]).then((resp) => {
            const article = resp.data;
            setArticleState(article);
        });
    }, []);

    const sendAuthorToArticleRequest = (authorId) => {
        addArticleToAuthor(authorId, window.location.href.split("/")[5])
            .then((response) => {
                console.log(response);
                window.location.reload();
            })
            .catch((e) => console.log(e.response));
    };

    const deleteArticleOnServer = () => {
        deleteArticle(window.location.href.split("/")[5])
            .then((response) => {
                console.log(response);
                history.push("/articles");
            })
            .catch((e) => console.log(e.response));
    };

    const redirectToAuthor = (id) => {
        history.push(`/authors/show/${id}`);
    };

    const toggleRedoMenu = () => {
        setIsRedoMenuOpen((prev) => !prev);
    };
    console.log(isRedoMenuOpen)
    if (articleState === null || authorState === null)
        return <>Downloading...</>;

    return (
        <div className={styles.article}>
            <div className={styles.name}>{articleState.name}</div>
            <div className={styles.description}>
                {articleState.description} + Lorem ipsum, dolor sit amet
                consectetur adipisicing elit. Voluptatem eaque illo quo
                reiciendis, tenetur pariatur minus sit sunt autem, doloribus
                quod rem earum nostrum aut vel. Voluptas ea dignissimos
                repellendus magni architecto labore voluptatem quia deleniti
                inventore omnis officiis eum rerum at reprehenderit obcaecati
                illum, consequuntur facere repellat. Eum quam inventore fugit
                earum sint aliquam similique, dignissimos quaerat commodi
                veritatis iusto ab doloribus vero provident facilis?
                Necessitatibus maxime nemo minus nobis id laudantium nihil optio
                voluptate quibusdam alias possimus quasi dolorem iusto,
                repudiandae facilis similique expedita qui? Necessitatibus, at
                possimus soluta harum numquam hic commodi error praesentium
                animi impedit, maiores ipsam modi adipisci suscipit cumque esse
                mollitia quos voluptatem consectetur reiciendis ad tempore. Nam,
                in? Illum, nisi numquam. Nostrum vel alias, eaque provident
                molestias voluptatem officia cumque, amet velit iste doloribus
                reiciendis eos vitae? Dignissimos reprehenderit cupiditate
                molestias provident quaerat similique, tempora porro ad
                necessitatibus, officia dolorum, commodi amet iure ullam
                asperiores consectetur distinctio impedit. Reiciendis incidunt,
                temporibus voluptatum ratione sunt placeat iste possimus
                laboriosam laborum ullam dolorum maxime ipsam, autem earum quas
                cumque sed accusantium? Nam nobis quidem natus perspiciatis
                asperiores. Vel atque maxime dolores at illum neque? Officia,
                incidunt in explicabo sequi dolorum velit corporis ad sed
                reiciendis.
            </div>
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
            <button className={styles.btnToggleRedo + (isRedoMenuOpen ? " " + styles.__opened : "")} onClick={toggleRedoMenu}>
                <img src={'https://cdn-icons-png.flaticon.com/512/709/709586.png'} alt="" />
                <div className={styles.btnText}>Edit menu</div> 
                
            </button>
            {isRedoMenuOpen && (
                <ArticleRedo
                    articleState={articleState}
                    authorState={authorState}
                    sendAuthorToArticleRequest={sendAuthorToArticleRequest}
                    deleteArticleOnServer={deleteArticleOnServer}
                />
            )}
        </div>
    );
};

export default ArticlePage;
