import {html}from '../../node_modules/lit-html/lit-html.js';
import{editArticle,getArticleById}from '../api/data.js';

const editTemplate=(article,onSubmit)=>html
`<section id="edit-page" class="content">
<h1>Edit Article</h1>

<form @submit=${onSubmit} id="edit" action="#" method="">
    <fieldset>
        <p class="field title">
            <label for="title">Title:</label>
            <input type="text" name="title" id="title" placeholder="Enter article title" .value=${article.title}></input>
        </p>

        <p class="field category">
            <label for="category">Category:</label>
            <input type="text" name="category" id="category" placeholder="Enter article category" .value=${article.category}></input>
        </p>
        <p class="field">
            <label for="content">Content:</label>
            <textarea name="content" id="content" .value=${article.content}></textarea>
        </p>

        <p class="field submit">
            <input class="btn submit" type="submit" value="Save Changes">
        </p>

    </fieldset>
</form>
</section>
`;
export async function editPage(ctx){
const articleId=ctx.params.id;

const article=await getArticleById(articleId);
ctx.render(editTemplate(article,onSubmit));

async function onSubmit(event){
   // console.log( 'edit');
    event.preventDefault();
    const formData=new FormData(event.target);

    const title=formData.get('title');
    const category=formData.get('category');
    const content=formData.get('content');
    
    if(title==""||category==""||content==""){
        return alert('All fields are required!');
        }
        if(category=='JavaScript'||category=="C#"||category=="Java"||category==="Python"){

      
    await editArticle(articleId,{
        title,category,content
      }
      );
      event.target.reset();
    ctx.page.redirect('/details/'+articleId);
}else{
    return alert("No correct category");
}
}
}