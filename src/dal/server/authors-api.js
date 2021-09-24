import axiosInstance from "./server-api";

export const getAllAuthors = () => {
    return axiosInstance.get('authors');
}

export const getAuthors = (authorId) => {
    return axiosInstance.get(`authors/${authorId}`);
}

export const createAuthors = (name) => {
    return axiosInstance.post('authors', {name});
}

export const updateAuthors = (authorId, name) => {
    return axiosInstance.put(`authors/${authorId}`, {name});
}

export const deleteAuthors = (authorId) => {
    return axiosInstance.delete(`authors/${authorId}`);
}

export const addArticleToAuthor = (authorId, id) => {
    return axiosInstance.post(`authors/${authorId}/article`, {id});
}