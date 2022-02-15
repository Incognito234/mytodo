// Getting all required elements
const inputBox = document.querySelector('.inputField input');
const addBtn = document.querySelector('.inputField button');
const todoList = document.querySelector('.todoList');
const deleteAllBtn = document.querySelector('.footer button');

inputBox.onkeyup = () => {
  let userData = inputBox.value; //getting user's entered value
  if(userData.trim() != 0){ //if user's values aren't only spaces
      addBtn.classList.add('active'); //activate the 'add' button
  }else {
    addBtn.classList.remove('active'); //unactivate the 'add' button
  }
}

showTasks();

// If user clicks on the add button
addBtn.onclick = ()=> {
    let userData = inputBox.value; //getting user's entered value
    let getLocalStorage = localStorage.getItem('New Todo'); //getting localstorage
    if(getLocalStorage == null){ //if localStorage is null
        listArr = [] //creating blank array
    }else{
        listArr = JSON.parse(getLocalStorage); // transforming a JSON string into a JS object
    }
    listArr.unshift(userData); // pushing user data
    localStorage.setItem("New Todo", JSON.stringify(listArr)); // transforming JS object into a JSON string
    showTasks(); //calling the function
    addBtn.style.transition = '0.5s';
    addBtn.classList.remove("active");
}

// function to add task list inside ul
function showTasks(){
    let getLocalStorage = localStorage.getItem('New Todo'); //getting localstorage
    if(getLocalStorage == null){ //if localStorage is null
        listArr = [] //creating blank array
    }else{
        listArr = JSON.parse(getLocalStorage); // transforming a JSON string into a JS object
    }
    const pendingNumb = document.querySelector('.pendingNumb');
    pendingNumb.textContent = listArr.length; // show actual number of pending tasks
    if(listArr.length > 0){
        deleteAllBtn.style.transition = '0.5s';
        deleteAllBtn.classList.add('active');
    }else{
        deleteAllBtn.style.transition = '0.5s';
        deleteAllBtn.classList.remove('active');
    }
    let newLiTag = '';
    listArr.forEach((element, index) => {
        newLiTag += `<li>${element}<span onclick = "deleteTask(${index})";><i class="fas fa-trash"></i></span></li>`;
    });
    todoList.innerHTML = newLiTag //adding new li tag inside ul tag
    inputBox.value = ""; //empty the textbox after adding todo
}

//delete task function
function deleteTask(index){
    let getLocalStorage = localStorage.getItem("New Todo");
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index, 1) //remove an li
    // update localstorage after li removal
    localStorage.setItem("New Todo", JSON.stringify(listArr)); // transforming JS object into a JSON string
    showTasks(); //calling the function
}

//delete all tasks function
deleteAllBtn.onclick = () => {
    listArr = [] // empty the array
    // update localstorage after task feletion
    localStorage.setItem("New Todo", JSON.stringify(listArr)); // transforming JS object into a JSON string
    showTasks(); //calling the function
}