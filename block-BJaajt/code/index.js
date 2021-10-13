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
function displayFollowers(url){
    followersImg.innerHTML=""
    let xhr=new XMLHttpRequest();
    console.log(url,'it is display url');
    xhr.open('GET',`${url}`);
    xhr.onload=function (){
        let imageData=JSON.parse(xhr.response);   
        console.log(imageData);       
        followersImg[0].src=imageData[0].avatar_url;
        followersImg[1].src=imageData[1].avatar_url;
        followersImg[2].src=imageData[2].avatar_url;
        followersImg[3].src=imageData[3].avatar_url;
        followersImg[4].src=imageData[4].avatar_url;
    }
    xhr.onerror=function (){
        console.log('Something went wrong ...');
    };
    xhr.send();


}
function displayFollowing(username){
    followingImg.innerHTML=""
    let xhr=new XMLHttpRequest();
    console.log(username,'it is display url');
    xhr.open('GET',`https://api.github.com/users/${username}/following`);
    xhr.onload=function (){
        let imageData=JSON.parse(xhr.response);   
        console.log(imageData);       
        followingImg[0].src=imageData[0].avatar_url;
        followingImg[1].src=imageData[1].avatar_url;
        followingImg[2].src=imageData[2].avatar_url;
        followingImg[3].src=imageData[3].avatar_url;
        followingImg[4].src=imageData[4].avatar_url;
    }
    xhr.onerror=function (){
        console.log('Something went wrong ...');
    };
    xhr.send();


}



input.addEventListener('keyup',(e)=>{

    
    if(e.keyCode===13){
        let xhr=new XMLHttpRequest();
        xhr.open('GET',`https://api.github.com/users/${e.target.value}`);
        xhr.onload=function (){
            let imageData=JSON.parse(xhr.response);          
            userImg.src=imageData.avatar_url;
            h3.innerText=imageData.name;
            h4.innerText='@'+ imageData.login;
            console.log(imageData.followers_url);
            displayFollowers(imageData.followers_url);
            displayFollowing(imageData.login);

        };
        xhr.onerror=function (){
            console.log('Something went wrong ...');
        };
        xhr.send();
    }
    
  

});