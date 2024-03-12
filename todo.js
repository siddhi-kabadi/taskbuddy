//add task popup
newTaskButton = document.getElementById("add-button");
taskPopup = document.getElementById("addtask-popup");
newTaskButton.addEventListener("click", () => {
  taskPopup.style.display = "block";
});
