let input = document.querySelector('input');
let todoslist = document.querySelector('.todoslist');
const url = `https://sleepy-falls-37563.herokuapp.com/api/todo`;





function closeHandler(id) {
    fetch(url + `/${id}`, {
        method: 'DELETE',
        headers: {
            'content-Type': 'application/json'
        },

    }).then(res=>res.json()).then(()=>{
        displayTodos();
    })
   


}

function checkboxHandler(id, e) {

    let obj = {
        todo: {
            isCompleted: e.target.checked,
        },
    }

    fetch(url + `/${id}`, {
        method: 'PUT',
        headers: {
            'content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    }).then((res) => res.json()).then(()=>{
        displayTodos();
    })
   
}


function handleEdit(e,id,title){

    let input=document.createElement('input');
    input.value=title;
    let p=e.target;
    let parent=e.target.parentElement;
    parent.replaceChild(input,p);
    input.addEventListener('keyup',(e)=>{
        if(e.keyCode===13 && e.target.value!=''){
            let obj = {
                todo: {
                    title: e.target.value,
                },
            }
        
            fetch(url + `/${id}`, {
                method: 'PUT',
                headers: {
                    'content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
            }).then((res) => res.json()).then(()=>{
                displayTodos();
            })
        }
    })
}



function createUI(todosArray) {
    todoslist.innerHTML = '';
    todosArray.forEach(ele => {
        let todoBox = document.createElement('div');
        todoBox.classList.add('todoBox')
        let article = document.createElement('article');
        let todo = document.createElement('p');
        todo.innerText = ele.title;
        todo.addEventListener('dblclick',(e)=>{
            handleEdit(e,ele._id,ele.title);
        })
        let checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.checked = ele.isCompleted;
        article.append(checkbox, todo);
        checkbox.addEventListener('change', (e) => {
            console.log(ele._id, e);
            checkboxHandler(ele._id, e);
        })
        let close = document.createElement('span');
        close.innerText = '❌'
        close.addEventListener('click', () => {
            closeHandler(ele._id);
        })
        todoBox.append(article, close);
        todoslist.append(todoBox);
    })
}

function inputHandler(e) {
    if (e.keyCode === 13 && e.target.value != '') {
        console.log(e.target.value, e.keyCode);

        let obj = {
            todo: {
                title: e.target.value,
                isCompleted: false,
            },
        };


        fetch(url, {
            method: 'POST',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify(obj),
        }).then(res=>res.json()).then(()=>{
            displayTodos();
        })


        e.target.value = '';
       
    }



}



input.addEventListener('keyup', (e) => {
    inputHandler(e);
})

function displayTodos(){
    fetch(url).then((res) => res.json()).then((data) => {

        console.log(data);
        createUI(data.todos);
    });
}
displayTodos();

