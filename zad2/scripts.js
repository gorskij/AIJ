"use strict"
let todoList = [];
const BASE_URL = "https://api.jsonbin.io/v3/b/651fd16f54105e766fbe85b6";
const SECRET_KEY = "$2a$10$KhMx./MOzgkmeuO4s/D7U.hpSz3M1dDIo06HMJgHtq/MvZBvtVfSC";

const updateTodoList = function() {
    const todoListDiv = $("#todoListView")[0];

    while (todoListDiv.firstChild) {
        todoListDiv.removeChild(todoListDiv.firstChild);
    }

    let keys = todoList !== undefined ? Object.keys(todoList[0]) : null;
    let filterInput = $("#inputSearch")[0];
    let startDate = $("#inputSearchStartDate")[0].value;
    let endDate = $("#inputSearchEndDate")[0].value;

    generateTableHead(todoListDiv, keys);
    generateTableBody(todoListDiv, todoList, filterInput, startDate, endDate);
}

const initList = function() {
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
            updateTodoList();
        },
        error: (err) => {
            console.log(err.responseJSON);
        }
    });
}

initList();

const deleteTodo = function(index) {
    todoList.splice(index,1);
    updateTodoList();
    updateJSONbin();
}

function generateTableHead(table, data) {
    if(data === undefined) return;

    let thead = table.createTHead();
    let row = thead.insertRow();

    let th = document.createElement("th");
    let text = document.createTextNode("#");
    th.appendChild(text);
    th.classList.add("col")
    row.appendChild(th);

    for (let key of data) {
        let th = document.createElement("th");
        let text = document.createTextNode(key);
        th.appendChild(text);
        th.classList.add("col")
        row.appendChild(th);
    }

    th = document.createElement("th");
    text = document.createTextNode("Remove");
    th.appendChild(text);
    th.classList.add("col")
    row.appendChild(th);
}


function generateTableBody(table, data, filter, startDate, endDate) {
    if (data === undefined) return;
  
    let tbody = table.createTBody();
  
    for (let i = 0; i < data.length; i++) {
      let element = data[i];
      
      const filterMatches = function () {
          const value = filter.value.toLowerCase() 
          return value === "" ||
          element.title.toLowerCase().includes(value) ||
          element.description.toLowerCase().includes(value)
        }  
      const startDateValid = startDate ? new Date(startDate) : null;
      const endDateValid = endDate ? new Date(endDate) : null;
  
      const startDateCondition = !startDateValid || new Date(element.dueDate) >= startDateValid;
      const endDateCondition = !endDateValid || new Date(element.dueDate) <= endDateValid;
  
      if (filterMatches() && startDateCondition && endDateCondition) {
        let row = tbody.insertRow();
        let cell = row.insertCell();
        let text = document.createTextNode(i + 1);
        cell.appendChild(text);
  
        for (let key in element) {
          cell = row.insertCell();
          text = document.createTextNode(element[key]);
          cell.appendChild(text);
        }
  
        cell = row.insertCell();
  
        let newDeleteButton = document.createElement("input");
        newDeleteButton.type = "button";
        newDeleteButton.value = "x";
  
        (function (currentIndex) {
          newDeleteButton.addEventListener("click",
            function () {
              deleteTodo(currentIndex);
            });
        })(i);
  
        cell.appendChild(newDeleteButton);
      }
    }
  }

const addTodo = function() {
    //get the elements in the form
    let inputTitle = $("#inputTitle")[0];
    let inputDescription = $("#inputDescription")[0];
    let inputPlace = $("#inputPlace")[0];
    let inputDate = $("#inputDate")[0];
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
    updateTodoList();
    updateJSONbin();
}

const updateJSONbin = function() {
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
