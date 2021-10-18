let input = document.querySelector('input');
let todoslist = document.querySelector('.todoslist');
const url = `https://sleepy-falls-37563.herokuapp.com/api/todo`;



fetch(url).then((res) => res.json()).then((data) => {

    console.log(data);
    createUI(data.todos);
});


function closeHandler(id) {
    fetch(url + `/${id}`, {
        method: 'DELETE',
        headers: {
            'content-Type': 'application/json'
        },

    })
    fetch(url).then(res => res.json()).then(data => {

        createUI(data.todos)
    });



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
    }).then((res) => res.json());
    fetch(url).then(res => res.json()).then(data => {
        createUI(data.todos)

    });
}


function createUI(todosArray) {
    todoslist.innerHTML = '';
    todosArray.forEach(ele => {
        let todoBox = document.createElement('div');
        todoBox.classList.add('todoBox')
        let article = document.createElement('article');
        let todo = document.createElement('p');
        todo.innerText = ele.title;
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
        })


        e.target.value = '';
        fetch(url).then((res) => res.json()).then((data) => {

            console.log(data);
            createUI(data.todos);
        });
    }



}



input.addEventListener('keyup', (e) => {
    inputHandler(e);
})


fetch(url).then((res) => res.json()).then((data) => {

    console.log(data);
    createUI(data.todos);
});

