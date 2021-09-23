import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { getAllArticles } from "../../dal/server/articles-api";
import ArticleBlock from "./ArticleBlock";
import styles from './style-articles.module.css'

const Articles = (props) => {

    const [articleState, setArticleState] = useState(null);
    
    useEffect( () => {
        getAllArticles().then( (resp) => {
            const allArticles = resp.data;
            setArticleState(allArticles);
        });
    }, []);

    if (articleState === null) return <>Downloading...</>

    return (
        <div>
            {
            articleState.map(article => {
                return  <div className="card">
                            <div className="card-body">
                                <div className="card-title">
                                    <ArticleBlock name={article.name} key={article.id}/> 
                                </div>
                                <div className={"btn btn-primary " + styles.button}>
                                    <Link to = {{pathname: '/articles/show/' + article.id}}>details</Link>
                                </div>
                            </div>
                        </div>})
            }
            <div className={"btn btn-primary " + styles.button}>
                <Link to = {{pathname: '/articles/create'}}>create new article</Link>
            </div>
        </div>
    )
}

export default Articles;