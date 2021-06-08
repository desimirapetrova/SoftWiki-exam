import {html}from '../../node_modules/lit-html/lit-html.js';
import{getArticleById,deleteArticle}from '../api/data.js';

const detailsTemplate=(article,isOwner)=>html`
<section id="details-page" class="content details">
    <h1>${article.title}</h1>

    <div class="details-content">
        <strong>Published in category ${article.category}</strong>
        <p>${article.content}</p>

        <div class="buttons">
          ${isOwner? html`<a id="deleteBtn"href="javascript:void(0)" class="btn delete">Delete</a>
            <a href=${`/edit/${article._id}`} class="btn edit">Edit</a>
            <a href="/" class="btn edit">Back</a>`:
           html`<a href="/" class="btn edit">Back</a>`}
        </div>
    </div>
</section>
`;

export async function detailsPage(ctx){
const articleId=ctx.params.id;
const userId=sessionStorage.getItem('userId');

const article=await getArticleById(articleId);
ctx.render(detailsTemplate(article,article._ownerId==userId));

document.getElementById('deleteBtn').addEventListener('click',onDelete);
async function onDelete(){
    
            await deleteArticle(article._id);
            ctx.page.redirect('/');
    }
}