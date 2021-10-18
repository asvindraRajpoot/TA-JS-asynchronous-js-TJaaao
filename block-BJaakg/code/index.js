let bookBox=document.querySelector('.book-box');
let listOfCharacters=document.querySelector('.listOfCharacters');
let footer=document.querySelector('footer');
const url=`https://www.anapioficeandfire.com/api/books`
let spinner=document.querySelector('.spinner');
let spinner2=document.querySelector('.spinner2');


{/* <li>
    <h2>Book Name</h2>
    <span>Author Name</span>
    <div>
        <a href="#">Show Charatcers(200)</a>
    </div>

</li> */}

let listHead=document.createElement('div');
let characterList=document.createElement('h6');
let close=document.createElement('small')
close.innerText='close';
close.classList.add('close');
characterList.innerText='CharacterList'

listHead.append(characterList,close);
listHead.classList.add('listHeader');
listOfCharacters.style.display='none';
listOfCharacters.append(listHead);


function createUIOfCharacters(item){
    
    console.log('it is characters')
  
    let div=document.createElement('div');
    let h4=document.createElement('h4');
    h4.innerText=`${item.name} (${item.aliases.toString()})`;
    div.append(h4);
    characterList.append(div);


}

close.addEventListener('click',(e)=>{
    characterList.innerHTML=''
    footer.style.display='none';
    bookBox.style.display='flex';

    listOfCharacters.style.display='block';

})


function btnHandler(e,book){
    handleSpiner2(true)
    characterList.innerText='CharacterList'
    bookBox.style.display='none'
    footer.style.display='block';
   
    listOfCharacters.style.display='block';
    console.log(e.target,book.characters);
   
    book.characters.forEach(character=>{
     
       
        fetch(`${character}`).then((res)=>res.json()).then((data)=>{
            spinner2.innerHTML="";
            handleSpiner2();
            createUIOfCharacters(data)});
    })
}



function createUI(book){
    let li=document.createElement('li');
    let h2=document.createElement('h2');
    h2.innerText=book.name;
    let span=document.createElement('span');
    span.innerText=book.authors[0]; 
    let diva=document.createElement('div');
    let a=document.createElement('a');
    let strong=document.createElement('strong');
    strong.innerText=`Show Characters (${book.characters.length})`
    a.append(strong);
    a.addEventListener('click',(e)=>{
     
      btnHandler(e,book);
    })
    
    diva.append(a);
    li.append(h2,span,diva);
    bookBox.append(li);
    
}

function handleSpiner(status=false){

    if(status){
        spinner.innerHTML=`<div class='center'> <div class="loader loader1"></div></div>`
    }
   

}


function handleSpiner2(status=false){

    if(status){
        spinner2.innerHTML=`<div class='center'> <div class="loader loader1"></div></div>`
    }
   

}
function init(){
    handleSpiner(true);
    let bookData=fetch(url).then((res)=> res.json()).then(book=>{
        spinner.innerHTML="";
        handleSpiner();
   
        book.forEach(ele=>{
            createUI(ele);
        })
    });
}
init();




