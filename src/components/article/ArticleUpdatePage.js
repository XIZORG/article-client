import { useEffect, useState } from "react"
import { getArticle, updateArticle } from "../../dal/server/articles-api";

const ArticleUpdatePage = (props) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [articleState, setArticleState] = useState({});
    
    useEffect( () => {
        getArticle(window.location.href.split('/')[5]).then( (resp) => {
            console.log(resp);
            const article = resp.data;
            setArticleState(article);
        });
    }, [setArticleState] );

    const sendDataToServer = (e) => {
        e.preventDefault();
        updateArticle(window.location.href.split('/')[5], name, description, []).then(response => {
            console.log(response);
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