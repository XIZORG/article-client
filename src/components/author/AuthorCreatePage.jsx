import { useState } from "react"
import { useHistory } from "react-router";
import { createAuthors } from "../../dal/server/authors-api";

const AuthorCreatePage = (props) => {
    const [name, setName] = useState("");
    let history = useHistory();

    const sendDataToServer = (e) => {
        e.preventDefault();
        createAuthors(name).then(response => {
            console.log(response);
            history.push('/authors');
        }).catch(e => console.log(e.response));
    }

    const changeNameString = (e) => {
        setName(e.target.value);
    }

    return (
        <>
            <form className={"createAuthor"} onSubmit={sendDataToServer}>
                <input value={name} onChange={changeNameString}/>
                <button>create</button>
            </form>
        </>
    )
}

export default AuthorCreatePage;