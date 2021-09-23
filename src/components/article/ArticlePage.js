import { useEffect, useState } from "react"
import { deleteArticle, getArticle } from "../../dal/server/articles-api";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";


const ArticlePage = (props) => {

    const [articleState, setArticleState] = useState({});
    let history = useHistory();

    useEffect( () => {
        getArticle(window.location.href.split('/')[5]).then( (resp) => {
            console.log(resp);
            const article = resp.data;
            setArticleState(article);
        });
    }, [setArticleState] );

    const sendDataToServer = () => {
        deleteArticle(window.location.href.split('/')[5]).then(response => {
            console.log(response);
            history.push('/articles');
        }).catch(e => console.log(e.response));
    }

    if (articleState === null) return <>Downloading...</>

    return (
        <div className="flex-shrink-0">
            <div className="mt-5">Name1: {articleState.name}</div>
            <div className="lead">Description: {articleState.description}</div>
            <div>
                {
                   articleState.authors && articleState.authors.map(author => {
                        return  <div>
                                    {author.name}
                                </div>})
                }
            </div>
            <div className={"btn btn-primary"}>
                <Link to = {{pathname: '/articles/update/' + articleState.id}}>update</Link>
            </div>
            <div className={"btn btn-danger"}>
                <button onClick={sendDataToServer}> delete</button>
            </div>
        </div>
    )
}

export default ArticlePage;