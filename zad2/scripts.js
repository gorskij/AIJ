"use strict"
let todoList = [];
const BASE_URL = "https://api.jsonbin.io/v3/b/651fd16f54105e766fbe85b6";
const SECRET_KEY = "$2a$10$KhMx./MOzgkmeuO4s/D7U.hpSz3M1dDIo06HMJgHtq/MvZBvtVfSC";
let initList = function() {
    $.ajax({
        // copy Your bin identifier here. It can be obtained in the dashboard
        url: BASE_URL,
        type: 'GET',
        headers: { //Required only if you are trying to access a private bin
            'X-Master-Key': SECRET_KEY,
            'X-Bin-Meta': false,
        },
        success: (data) => {
            todoList = data
        },
        error: (err) => {
            console.log(err.responseJSON);
        }
    });
}

initList();

let deleteTodo = function(index) {
    todoList.splice(index,1);
    updateJSONbin();
}

let updateTodoList = function() {
    let todoListDiv =
        document.getElementById("todoListView");

    //remove all elements
    while (todoListDiv.firstChild) {
        todoListDiv.removeChild(todoListDiv.firstChild);
    }

    let filterInput = document.getElementById("inputSearch");

    //add all elements
    for (let todo in todoList) {
        if(filterInput.value === "" || todoList[todo].title.includes(filterInput.value)
        || todoList[todo].description.includes(filterInput.value)) {
            let newElement = document.createElement("div");
            let newContent = document.createTextNode(
                todoList[todo].title + " " + todoList[todo].description);
            let newDeleteButton = document.createElement("input");
            newDeleteButton.type = "button";
            newDeleteButton.value = "x";
            newDeleteButton.addEventListener("click",
                function () {
                    deleteTodo(todo);
                });
            newElement.appendChild(newContent);
            newElement.appendChild(newDeleteButton);
            todoListDiv.appendChild(newElement);
        }
    }
}

setInterval(updateTodoList, 1000);

let addTodo = function() {
    //get the elements in the form
    let inputTitle = document.getElementById("inputTitle");
    let inputDescription = document.getElementById("inputDescription");
    let inputPlace = document.getElementById("inputPlace");
    let inputDate = document.getElementById("inputDate");
    //get the values from the form
    let newTitle = inputTitle.value;
    let newDescription = inputDescription.value;
    let newPlace = inputPlace.value;
    let newDate = new Date(inputDate.value);
    //create new item
    let newTodo = {
        title: newTitle,
        description: newDescription,
        place: newPlace,
        dueDate: newDate
    };

    //add item to the list
    todoList.push(newTodo);
    updateJSONbin();
}

let updateJSONbin = function() {
    $.ajax({
        url: BASE_URL,
        type: 'PUT',
        headers: { //Required only if you are trying to access a private bin
            'X-Master-Key': SECRET_KEY
        },
        contentType: 'application/json',
        data: JSON.stringify(todoList),
        success: (data) => {
            console.log(data);
        },
        error: (err) => {
            console.log(err.responseJSON);
        }
    });
}
