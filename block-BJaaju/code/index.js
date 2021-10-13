let input =document.querySelector('input');
let imgBox=document.querySelector('figure');
//const url=`https://api.unsplash.com/search/photos/?client_id=p1-hM9mBQfTyRcIyt5p_e1Y2ciEpFRfmV7eKnAtAH3E&query${query}`;
input.addEventListener('keyup',(e)=>{
    imgBox.innerHTML="";

    let xhr=new XMLHttpRequest();
    xhr.open('GET',`https://api.unsplash.com/search/photos/?client_id=p1-hM9mBQfTyRcIyt5p_e1Y2ciEpFRfmV7eKnAtAH3E&query=${e.target.value}`);
    xhr.onload=function (){
      let data=JSON.parse(xhr.response);
      //imgBox.src=data.url;
      console.log(data.results);
      data.results.forEach(ele=>{
        let li=document.createElement('li');
        let img=document.createElement('img');
         img.src=ele.urls.small;
         console.log(img.src);
         li.append(img);
         imgBox.append(li);
      })

      

    }
    xhr.onerror=function (){
        console.log('Something went wrong');
    }
    xhr.send();
})