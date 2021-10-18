let bookBox=document.querySelector('.book-box');
let listOfCharacters=document.querySelector('.listOfCharacters');
let footer=document.querySelector('footer');
const url=`https://www.anapioficeandfire.com/api/books`

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
    characterList.innerText='CharacterList'
    bookBox.style.display='none'
    footer.style.display='block';
    listOfCharacters.style.display='block';
    console.log(e.target,book.characters);
    book.characters.forEach(character=>{
     
        fetch(`${character}`).then((res)=>res.json()).then((data)=>createUIOfCharacters(data));
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
let bookData=fetch(url).then((res)=> res.json()).then(book=>{
    book.forEach(ele=>{
        createUI(ele);
    })
});