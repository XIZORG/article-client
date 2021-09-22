import axiosInstance from "./server-api";

export const getAllArticles = () => {
    return axiosInstance.get('articles');
}

export const getArticle = (articleId) => {
    return axiosInstance.get(`articles/${articleId}`);
}