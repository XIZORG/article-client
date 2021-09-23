import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { getAllAuthors } from "../../dal/server/authors-api";
import AuthorBlock from "./AuthorBlock";
import styles from './style-authors.module.css'

const Authors = (props) => {

    const [authorState, setauthorState] = useState(null);
    
    useEffect( () => {
        getAllAuthors().then( (resp) => {
            console.log(resp);
            const allAuthors = resp.data;
            setauthorState(allAuthors);
        });
    }, [setauthorState] );

    if (authorState === null) return <>Downloading...</>

    return (
        <div>
            {
            authorState.map(auhtor => {
                return  <div className="card">
                            <div className="card-body">
                                <div className="card-title">
                                    <AuthorBlock name={auhtor.name} key={auhtor.id}/> 
                                </div>
                                <div className={"btn btn-primary " + styles.button}>
                                    <Link to = {{pathname: '/authors/show/' + auhtor.id}}>details</Link>
                                </div>
                            </div>
                        </div>})
            }
            <div className={"btn btn-primary " + styles.button}>
                <Link to = {{pathname: '/authors/create'}}>create new author</Link>
            </div>
        </div>
    )
}

export default Authors;