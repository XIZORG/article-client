import {Route, Switch} from "react-router-dom"
import ArticleCreatePage from "./components/article/ArticleCreatePage";
import ArticlePage from "./components/article/ArticlePage";
import ArticleUpdatePage from "./components/article/ArticleUpdatePage";
import Articles from "./components/articles/Articles";
import Header from "./components/header/Header";
import MainPage from "./components/main-page/MainPage";


function App() {
  return (
    <div>
       <div className={'container'}>
        <Header/>
        <Switch>
            <Route path={"/"} exact render={() => <MainPage/>}/>
            <Route path={"/articles"} exact render={() => <Articles/>}/>
            <Route path={"/articles/create"} exact render={() => <ArticleCreatePage/>}/>
            <Route path={"/articles/show/*"} exact render={() => <ArticlePage/>}/>
            <Route path={"/articles/update/*"} exact render={() => <ArticleUpdatePage/>}/>

            {/* <Route path={"*"} component={Forbidden404}/> */}
        </Switch>

</div>
    </div>
  );
}

export default App;
