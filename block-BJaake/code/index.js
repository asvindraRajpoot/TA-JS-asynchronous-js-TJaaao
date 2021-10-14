let option = document.querySelector('select');
let news_box = document.querySelector('.news-box');
const url = `https://api.spaceflightnewsapi.net/v3/articles?_limit=30`


function newsObj(e) {
    news_box.innerHTML = "";
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = function () {
        let data = JSON.parse(xhr.response);

        data.forEach(ele => {
            if (e.target.value === ele.newsSite) {
                console.log(ele);



                createUI(ele);
            }
        })
    }
    xhr.onerror = function () {
        console.log(`Something went wrong`);
    }
    xhr.send();


}


function createUI(ele) {
    console.log('it is createUI');
    let article = document.createElement('article');
    let figure = document.createElement('figure');
    let img = document.createElement('img');
    img.classList.add('article-img');
    img.src = ele.imageUrl;
    console.log(img.src);
    figure.append(img);
    let div = document.createElement('div');
    let span = document.createElement('span');
    span.innerText = ele.newsSite;
    console.log(span.innerText);
    let p = document.createElement('p');
    p.innerText = ele.summary;
    let diva = document.createElement('div');
    diva.classList.add('read');
    let a = document.createElement('a');
    a.innerText = 'Read More'
    diva.append(a);
    div.append(span, p, diva);
    article.append(figure, div);
    news_box.append(article);
}

function selectHandler(e) {
    console.log(e.target.value);
    newsObj(e);

}
option.addEventListener('change', selectHandler);
