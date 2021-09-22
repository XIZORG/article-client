import { useEffect, useState } from "react"
import { getArticle } from "../../dal/server/articles-api";

const ArticlePage = (props) => {

    const [articleState, setArticleState] = useState({});
    
    useEffect( () => {
        getArticle(window.location.href.split('/')[4]).then( (resp) => {
            console.log(resp);
            const article = resp.data;
            setArticleState(article);
        });
    }, [setArticleState] );

    if (articleState === null) return <>Downloading...</>

    return (
        <div>
            <div>{articleState.name}</div>
            <div>{articleState.description}</div>
            <div>
                {
                   articleState.authors && articleState.authors.map(author => {
                        return  <div>
                                    {author.name}
                                </div>})
                }
            </div>
        </div>
    )
}

export default ArticlePage;