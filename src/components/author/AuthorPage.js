import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { deleteAuthors, getAuthors } from "../../dal/server/authors-api";


const AuthorPage = (props) => {

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

    if (authorState === null) return <>Downloading...</>

    return (
        <div className="flex-shrink-0">
            <div className="mt-5">Name: {authorState.name}</div>

            <button className={"btn btn-primary"}>
                <Link to = {{pathname: '/authors/update/' + authorState.id}}>update</Link>
            </button>
            <div className={"btn btn-danger"}>
                <button onClick={sendDataToServer}> delete</button>
            </div>
        </div>
    )
}

export default AuthorPage;