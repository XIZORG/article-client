import { Route, Switch } from "react-router-dom";
import ArticleCreatePage from "./components/article/ArticleCreatePage";
import ArticlesPage from "./components/article/ArticlesPage";
import ArticleUpdatePage from "./components/article/ArticleUpdatePage";
import AuthorCreatePage from "./components/author/AuthorCreatePage";
import AuthorPage from "./components/author/AuthorPage";
import Authors from "./components/author/Authors";
import AuthorUpdatePage from "./components/author/AuthorUpdatePage";
import Header from "./components/header/Header";
import MainPage from "./components/main-page/MainPage";
import styles from "./App.module.css";
import ArticlePage from "./components/article/articlePage/ArticlePage";
import React, { useState } from 'react';
import AddAuthorsToArticlesPage from "./components/article/articlePage/AddAuthorsToArticlesPage";

export const ArticleContext = React.createContext();

function App() {
  const [articleArray, setarticleArray] = useState([])

  const setContext = (e) => {
    setarticleArray(e);
  }

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <ArticleContext.Provider value={articleArray}>
          <Header />
          <Switch>
            <Route path={"/"} exact render={() => <MainPage />} />

            {/* Articles part */}
            <Route
              path={"/articles"}
              exact
              render={() => <ArticlesPage contextFunction = {setContext}/>}
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

            <Route
              path={"/articles/addAuthorsToArticle"}
              exact
              render={() => <AddAuthorsToArticlesPage />}
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

        </ArticleContext.Provider>

      </div>
    </div>
  );
}

export default App;
