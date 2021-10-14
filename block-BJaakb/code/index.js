let input =document.querySelector('input');
let imgBox=document.querySelector('figure');

function createUI(data){
    data.results.forEach(ele=>{
        let li=document.createElement('li');
        let img=document.createElement('img');
         img.src=ele.urls.small;
         console.log(img.src);
         li.append(img);
         imgBox.append(li);
      })

}

function fetch(url){

    return new Promise((res,rej)=>{

        let xhr=new XMLHttpRequest();
        xhr.open('GET',url);
        xhr.onload= ()=>{
            res(JSON.parse(xhr.response))
            
        }
        xhr.onerror= ()=>{
            rej('Something went wrong');
           
        }
        xhr.send();
    })
}


input.addEventListener('keyup',(e)=>{
    imgBox.innerHTML="";
    let url=`https://api.unsplash.com/search/photos/?client_id=p1-hM9mBQfTyRcIyt5p_e1Y2ciEpFRfmV7eKnAtAH3E&query=${e.target.value}`;

  let data=  fetch(url).then((data)=>{createUI(data)}).catch((error)=>{console.log(error)})
  
  
})