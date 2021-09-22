import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { getAllArticles } from "../../dal/server/articles-api";
import ArticleBlock from "./ArticleBlock";
import styles from './style-articles.module.css'

const Articles = (props) => {

    const [articleState, setArticleState] = useState(null);
    
    useEffect( () => {
        getAllArticles().then( (resp) => {
            console.log(resp);
            const allArticles = resp.data;
            setArticleState(allArticles);
        });
    }, [setArticleState] );

    if (articleState === null) return <>Downloading...</>

    return (
        <div>
            {
                articleState.map(article => {
                    return  <div class="card">
                                <div class="card-body">
                                    <div class="card-title">
                                        <ArticleBlock name={article.name} key={article.id}/> 
                                    </div>
                                    <div class={"btn btn-primary " + styles.button}>
                                        <Link to = {{pathname: '/articles/' + article.id}}>details</Link>
                                    </div>
                                </div>
                            </div>})
            }
        </div>
    )
}

export default Articles;