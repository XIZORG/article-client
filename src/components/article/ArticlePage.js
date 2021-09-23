import { useEffect, useState } from "react"
import { getArticle } from "../../dal/server/articles-api";
import { Link } from "react-router-dom";

const ArticlePage = (props) => {

    const [articleState, setArticleState] = useState({});
    
    useEffect( () => {
        getArticle(window.location.href.split('/')[5]).then( (resp) => {
            console.log(resp);
            const article = resp.data;
            setArticleState(article);
        });
    }, [setArticleState] );

    if (articleState === null) return <>Downloading...</>

    return (
        <div class="flex-shrink-0">
            <div class="mt-5">Name1: {articleState.name}</div>
            <div class="lead">Description: {articleState.description}</div>
            <div>
                {
                   articleState.authors && articleState.authors.map(author => {
                        return  <div>
                                    {author.name}
                                </div>})
                }
            </div>
            <div className={"btn btn-primary "}>
                <Link to = {{pathname: '/articles/update/' + articleState.id}}>update</Link>
            </div>
        </div>
    )
}

export default ArticlePage;