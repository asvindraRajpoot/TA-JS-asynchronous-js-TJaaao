let input =document.querySelector('input');
let imgBox=document.querySelector('figure');

input.addEventListener('keyup',()=>{

    let xhr=new XMLHttpRequest();
    xhr.open('GET','https://api.unsplash.com/search/photos/');
    xhr.onload=function (){
      let data=JSON.parse(xhr.response);
      imgBox.src=data.url;

    }
    xhr.onerror=function (){
        console.log('Something went wrong');
    }
    xhr.send();
})