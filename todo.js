document.addEventListener("DOMContentLoaded", function () {
  let taskButton = document.getElementById("add-button");
  let taskPopup = document.getElementById("addtask-popup");

  taskButton.addEventListener("click", () => {
    taskPopup.style.display = "block";
  });

  document.getElementById("close-popup").addEventListener("click", () => {
    taskPopup.style.display = "none";
  });

  document.getElementById("newtask-add").addEventListener("click", () => {
    let taskName = document.getElementById("newtask-name").value;
    let dueDate = document.getElementById("newtask-due").value;
    if (taskName && dueDate) {
      addTask(taskName, dueDate);
      document.getElementById("newtask-name").value = "";
      document.getElementById("newtask-due").value = "";
      taskPopup.style.display = "none";
    } else {
      alert("Please fill in all fields.");
    }
  });
});

function addTask(taskName, dueDate) {
  let newTaskDiv = createTaskElement(taskName, dueDate);
  let currentList = document.getElementById("todo-list");
  currentList.appendChild(newTaskDiv);
}

function createTaskElement(taskName, dueDate) {
  let newTaskDiv = document.createElement("article");
  let newName = document.createElement("p");
  newName.className = "task-name";
  newName.textContent = taskName;
  let newDueDate = document.createElement("p");
  newDueDate.className = "due-date";
  newDueDate.innerText = "Due " + dueDate;

  let moveLeftSpan = createMoveSpan("←", "move-left", "left");
  moveLeftSpan.style.display = "none";

  let moveRightSpan = createMoveSpan("→", "move-right", "right");

  newTaskDiv.appendChild(newName);
  newTaskDiv.appendChild(newDueDate);
  newTaskDiv.appendChild(moveLeftSpan);
  newTaskDiv.appendChild(moveRightSpan);

  return newTaskDiv;
}

function createMoveSpan(text, className, direction) {
  let moveSpan = document.createElement("span");
  moveSpan.textContent = text;
  moveSpan.className = `move-arrow ${className}`;
  moveSpan.addEventListener("click", function (event) {
    event.stopPropagation();
    moveTask(this.parentNode, direction);
  });
  return moveSpan;
}

function moveTask(taskElement, direction) {
  let currentListId = taskElement.parentNode.id;
  let targetParentId;

  if (direction === "right") {
    if (currentListId === "todo-list") targetParentId = "inprogress-list";
    else if (currentListId === "inprogress-list")
      targetParentId = "completed-list";
  } else if (direction === "left") {
    if (currentListId === "inprogress-list") targetParentId = "todo-list";
    else if (currentListId === "completed-list")
      targetParentId = "inprogress-list";
  }

  if (targetParentId) {
    document.getElementById(targetParentId).appendChild(taskElement);
    console.log(`Task moved from ${currentListId} to ${targetParentId}`);
  }

  if (targetParentId === "completed-list") {
    taskElement.classList.add("completed-task");
  } else {
    taskElement.classList.remove("completed-task");
  }
  let leftArrow = taskElement.querySelector(".move-left");
  let rightArrow = taskElement.querySelector(".move-right");

  if (leftArrow) {
    leftArrow.style.display =
      targetParentId === "todo-list" ? "none" : "inline";
  }

  if (rightArrow) {
    rightArrow.style.display =
      targetParentId === "completed-list" ? "none" : "inline";
  }
}
