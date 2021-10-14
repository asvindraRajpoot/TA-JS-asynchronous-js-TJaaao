let option = document.querySelector('select');
let news_box = document.querySelector('.news-box');
const url = `https://api.spaceflightnewsapi.net/v3/articles?_limit=30`
let spaceNews=[];
let data=fetch(url)
.then((res)=>{
    if(!res.ok){
        throw new Error(`Error happned: ${res.status}`);
    }
    return res.json()})
.then((allNews)=>{
       
      if(Array.isArray(allNews)){
        spaceNews=allNews;
        createUI(allNews);
        let allSource= [...new Set(allNews.map((n)=>n.newsSite))];
        console.log(allSource)
      
      }
    }).finally(()=>{

    }).catch((error)=>{
        let err=document.createElement('div');
        err.innerText=error;
        news_box.append(err);
    });

function createUI(allNews) {
    news_box.innerHTML=""
   
    allNews.forEach((news)=>{
        let article = document.createElement('article');
        let figure = document.createElement('figure');
        let img = document.createElement('img');
        img.classList.add('article-img');
        img.src = news.imageUrl;
        console.log(img.src);
        figure.append(img);
        let div = document.createElement('div');
        let span = document.createElement('span');
        span.innerText =news.newsSite;
        console.log(span.innerText);
        let p = document.createElement('p');
        p.innerText = news.summary;
        let diva = document.createElement('div');
        diva.classList.add('read');
        let a = document.createElement('a');
        a.innerText = 'Read More'
        a.href = news.url;
        diva.append(a);
        div.append(span, p, diva);
        article.append(figure, div);
        news_box.append(article);
    })
 
}

function selectHandler(e) {
    let filteredNews=[];
    
    if(e.target.value===''){
        filteredNews=spaceNews;
    }else{
         filteredNews=spaceNews.filter((ele)=>ele.newsSite===e.target.value)
    }
  
    createUI(filteredNews);

    

}
option.addEventListener('change', selectHandler);
