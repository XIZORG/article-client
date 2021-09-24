import { useEffect, useState } from "react"
import { useHistory } from "react-router";
import { getArticle, updateArticle } from "../../dal/server/articles-api";

const ArticleUpdatePage = (props) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [articleState, setArticleState] = useState({});
    const history = useHistory();

    useEffect( () => {
        getArticle(window.location.href.split('/').pop()).then( (resp) => {
            const article = resp.data;
            setArticleState(article);
        });
    }, [] );

    const sendDataToServer = (e) => {
        e.preventDefault();
        updateArticle(window.location.href.split('/').pop(), name, description, []).then(response => {
            history.push('/articles');
        }).catch(e => console.log(e.response));
    }

    if (articleState === null) return <>Downloading...</>

    const changeNameString = (e) => {
        setName(e.target.value);
    }

    const changeDescriptionString = (e) => {
        setDescription(e.target.value);
    }

    return (
        <>
            <div class="flex-shrink-0">
                <div class="mt-5">Name: {articleState.name}</div>
                <div class="lead">Description: {articleState.description}</div>
                <div>
                    {
                    articleState.authors && articleState.authors.map(author => {
                            return  <div>
                                        {author.name}
                                    </div>})
                    }
                </div>
            </div>

            <form className={"updateArticle"} onSubmit={sendDataToServer}>
                <input value={name} onChange={changeNameString}/>
                <input value={description} onChange={changeDescriptionString}/>
                <button>update</button>
            </form>
        </>
    )
}

export default ArticleUpdatePage;