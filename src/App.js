import { Route, Switch } from "react-router-dom";
import ArticleCreatePage from "./components/article/ArticleCreatePage";
import ArticlePage from "./components/article/ArticlePage";
import Articles from "./components/article/Articles";
import ArticleUpdatePage from "./components/article/ArticleUpdatePage";
import AuthorCreatePage from "./components/author/AuthorCreatePage";
import AuthorPage from "./components/author/AuthorPage";
import Authors from "./components/author/Authors";
import AuthorUpdatePage from "./components/author/AuthorUpdatePage";
import Header from "./components/header/Header";
import MainPage from "./components/main-page/MainPage";
import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <Header />
        <Switch>
          <Route path={"/"} exact render={() => <MainPage />} />

          {/* Articles part */}
          <Route
            path={"/articles"}
            exact
            render={() => <Articles />}
          />
          <Route
            path={"/articles/create"}
            exact
            render={() => <ArticleCreatePage />}
          />
          <Route
            path={"/articles/show/*"}
            exact
            render={() => <ArticlePage />}
          />
          <Route
            path={"/articles/update/*"}
            exact
            render={() => <ArticleUpdatePage />}
          />

          {/* Authors part */}
          <Route path={"/authors"} exact render={() => <Authors />} />
          <Route
            path={"/authors/create"}
            exact
            render={() => <AuthorCreatePage />}
          />
          <Route
            path={"/authors/show/*"}
            exact
            render={() => <AuthorPage />}
          />
          <Route
            path={"/authors/update/*"}
            exact
            render={() => <AuthorUpdatePage />}
          />

          {/* <Route path={"*"} component={Forbidden404}/> */}
        </Switch>
      </div>
    </div>
  );
}

export default App;
