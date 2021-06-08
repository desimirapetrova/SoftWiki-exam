import * as api from './api.js';


const host = 'http://localhost:3030';
api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;


// Implement application-specific requests

// export async function getMeme()

export async function getArticles(){
    return await api.get(host+'/data/wiki?sortBy=_createdOn%20desc'); 
}
export async function getRecentArticles(){
    return await api.get(host+'/data/wiki?sortBy=_createdOn%20desc&distinct=category'); 
}

export async function getArticleById(id){
    return await api.get(host+'/data/wiki/'+id);
}
// export async function getMyCars(){
//     const userId=sessionStorage.getItem('userId');
//     return await api.get(host+`/data/cars?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
// }
export async function createArticle(articles){
    return await api.post(host+'/data/wiki',articles);
}

export async function editArticle(id,articles){
    return await api.put(host+'/data/wiki/'+id ,articles);
}
export async function deleteArticle(id){
    return await api.del(host+'/data/wiki/'+id);
}
export async function search(query){
    return await api.get(host+`/data/wiki?where=title%20LIKE%20%22${query}%22
    `)
}