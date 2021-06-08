import {html}from '../../node_modules/lit-html/lit-html.js';
import { getRecentArticles } from '../api/data.js';

const homeTemplate=(articles)=>html`
<section id="home-page" class="content">
    <h1>Recent Articles</h1>
    <section class="recent js">
    <h2>JavaScript</h2>
        ${articles ? articles.filter(c=>c.category=="JavaScript").map(articleRecentTemplate)
            :articles.map(emptyTemplate)
         }
    </section>
    <section class="recent csharp">
    <h2>C#</h2>
    ${articles ? articles.filter(c=>c.category=="C#").map(articleRecentTemplate)

        :articles.map(emptyTemplate)}
    </section>
    <section class="recent java">
    <h2>Java</h2>
    ${!articles.filter(c=>c.category=="Java")
        ?html`<h3>No articles yet</h3>`: articles.filter(c=>c.category=="Java").map(articleRecentTemplate)
    }
         </section>

    <section class="recent python">
    <h2>Python</h2>
    ${articles ? articles.filter(c=>c.category=="Python").map(articleRecentTemplate)
:articles.map(emptyTemplate) }
    </section>
</section>
`;
const articleRecentTemplate=(article)=>html`
<article>
            <h3>${article.title}</h3>
            <p>${article.content}</p>
            <a href=${`/details/${article._id}`} class="btn details-btn">Details</a>
        </article>` ;
      //  const emptyArticle=(article)=>html``; 
      
const emptyTemplate=()=>html`
      <h3 class="no-articles">No articles yet</h3>                  
              ` ;
export async function homePage(ctx){

    const recentArticles=await getRecentArticles();

    ctx.render(homeTemplate(recentArticles));
 
}