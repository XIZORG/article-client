import {Route, Switch} from "react-router-dom"
import ArticlePage from "./components/article/ArticlePage";
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
            <Route path={"/articles/*"} exact render={() => <ArticlePage/>}/>

            {/* <Route path={"*"} component={Forbidden404}/> */}
        </Switch>

</div>
    </div>
  );
}

export default App;
