import { useState } from "react"
import { createArticle } from "../../dal/server/articles-api";

const ArticleCreatePage = (props) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const sendDataToServer = (e) => {
        e.preventDefault();
        createArticle(name,description).then(response => {
            console.log(response);
        }).catch(e => console.log(e.response));
    }

    const changeNameString = (e) => {
        setName(e.target.value);
    }

    const changeDescriptionString = (e) => {
        setDescription(e.target.value);
    }

    return (
        <>
            <form className={"createArticle"} onSubmit={sendDataToServer}>
                <input value={name} onChange={changeNameString}/>
                <input value={description} onChange={changeDescriptionString}/>
                <button>create</button>
            </form>
        </>
    )
}

export default ArticleCreatePage;