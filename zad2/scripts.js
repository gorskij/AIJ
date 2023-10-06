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

function generateTableHead(table, data) {
    if(data !== undefined) {
        let thead = table.createTHead();
        let row = thead.insertRow();
        for (let key of data) {
            let th = document.createElement("th");
            let text = document.createTextNode(key);
            th.appendChild(text);
            row.appendChild(th);
        }

        let th = document.createElement("th");
        let text = document.createTextNode("Remove");
        th.appendChild(text);
        row.appendChild(th);
    }
}

function generateTable(table, data, filter) {
    if(data !== undefined) {
        for (let element of data) {
            let row = table.insertRow();

            if(filter.value === "" || element.title.includes(filter.value)
                || element.description.includes(filter.value)) {
                for (let key in element) {
                    let cell = row.insertCell();
                    let text = document.createTextNode(element[key]);
                    cell.appendChild(text);
                }

                let cell = row.insertCell();

                let newDeleteButton = document.createElement("input");
                newDeleteButton.type = "button";
                newDeleteButton.value = "x";
                newDeleteButton.addEventListener("click",
                    function () {
                        deleteTodo(element);
                    });

                cell.appendChild(newDeleteButton);
            }
        }
    }
}
let updateTodoList = function() {
    let todoListDiv =
        document.getElementById("todoListView");

    while (todoListDiv.firstChild) {
        todoListDiv.removeChild(todoListDiv.firstChild);
    }

    let keys = todoList !== undefined ? Object.keys(todoList[0]) : null;
    let filterInput = document.getElementById("inputSearch");

    generateTableHead(todoListDiv, keys);
    generateTable(todoListDiv, todoList, filterInput);
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
