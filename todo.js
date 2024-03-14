//show task popup
let taskButton = document.getElementById("add-button");
let taskPopup = document.getElementById("addtask-popup");
taskButton.addEventListener("click", () => {
  taskPopup.style.display = "block";

  //add task
  document.getElementById("newtask-add").addEventListener("click", () => {
    let newTaskDiv = document.createElement("article");
    let newName = document.createElement("p");
    newName.className = "task-name";
    newName.textContent = document.getElementById("newtask-name").value;
    newTaskDiv.appendChild(newName);
    let newDueDate = document.createElement("p");
    newDueDate.className = "due-date";
    newDueDate.innerText =
      "Due " + document.getElementById("newtask-due").value;
    newTaskDiv.appendChild(newDueDate);

    taskPopup.style.display = "none";
    newTaskDiv.addEventListener("click", () => {
      moveTodos(newTaskDiv);
    });

    document.getElementById("todo-list").appendChild(newTaskDiv);
    console.log("added task");
  });

  //close popup
  document.getElementById("close-popup").addEventListener("click", () => {
    taskPopup.style.display = "none";
  });
});

function moveTodos(todo) {
  if (todo) {
    if (todo.parentNode.id == "todo-list") {
      document.getElementById("inprogress-list").appendChild(todo);
    } else if (todo.parentNode.id == "inprogress-list") {
      document.getElementById("completed-list").appendChild(todo);
    }
  }
}

let todos = document.querySelectorAll("article");
if (todos) {
  todos.forEach((todo) => {
    todo.addEventListener("click", () => {
      moveTodos(todo);
    });
  });
}
