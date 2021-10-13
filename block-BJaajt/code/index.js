let input=document.querySelector('input');
let userImg=document.querySelector('.user-img');
let h3=document.querySelector('h3');
let h4=document.querySelector('h4');
let followersImg=document.querySelectorAll('.followers-img');
let followingImg=document.querySelectorAll('.following-img');
let catImg=document.querySelector('.cat');
let btn=document.querySelector('.btn');





btn.addEventListener('click',()=>{
    let xhr=new XMLHttpRequest();
    xhr.open('GET','https://thatcopy.pw/catapi/rest/');
    xhr.onload=function (){
        let imageData=JSON.parse(xhr.response);
        catImg.src=imageData.url;
    };
    xhr.onerror=function (){
        console.log('Something went wrong ...');
    };
    xhr.send();

});




input.addEventListener('keyup',(e)=>{

    
    if(e.keyCode===13){
        let xhr=new XMLHttpRequest();
        xhr.open('GET',`https://api.github.com/users/${e.target.value}`);
        xhr.onload=function (){
            let imageData=JSON.parse(xhr.response);          
            userImg.src=imageData.avatar_url;
            h3.innerText=imageData.name;
            h4.innerText=imageData.twitter_username;
            followersImg.forEach(ele=>{
                ele.src=imageData.followers_url;
            })
            followingImg.forEach(ele=>{
                ele.src=imageData.following_url;
            })

        };
        xhr.onerror=function (){
            console.log('Something went wrong ...');
        };
        xhr.send();
    }
    
  

});