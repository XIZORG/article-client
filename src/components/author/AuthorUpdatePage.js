import { useEffect, useState } from "react"
import { useHistory } from "react-router";
import { getAuthors, updateAuthors } from "../../dal/server/authors-api";

const AuthorUpdatePage = (props) => {
    const [name, setName] = useState("");
    const [authorState, setAuthorState] = useState({});
    let history = useHistory();


    useEffect( () => {
        getAuthors(window.location.href.split('/')[5]).then( (resp) => {
            console.log(resp);
            const author = resp.data;
            setAuthorState(author);
        });
    }, [setAuthorState] );

    const sendDataToServer = (e) => {
        e.preventDefault();
        updateAuthors(window.location.href.split('/')[5], name).then(response => {
            console.log(response);
            history.push('/authors');
        }).catch(e => console.log(e.response));
    }

    if (authorState === null) return <>Downloading...</>

    const changeNameString = (e) => {
        setName(e.target.value);
    }

    return (
        <>
            <div class="flex-shrink-0">
                <div class="mt-5">Name: {authorState.name}</div>
                <div>
                    {
                    authorState.authors && authorState.authors.map(author => {
                            return  <div>
                                        {author.name}
                                    </div>})
                    }
                </div>
            </div>

            <form className={"updateAuthor"} onSubmit={sendDataToServer}>
                <input value={name} onChange={changeNameString}/>
                <button>update</button>
            </form>
        </>
    )
}

export default AuthorUpdatePage;