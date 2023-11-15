import { Storage } from "../data-handlers/storage";

export const Page = (function () {
  const header = document.getElementById("page-header");
  const tasklist = document.getElementById("tasklist");
  const noTaskMsg = document.getElementById("no-task-message");
  const newTaskBtn = document.getElementById("new-task-btn");
  const newTaskForm = document.getElementById("new-task-form");

  const publicMethods = {
    load: (taskContainer) => {
      reset();
      loadHeader(taskContainer.getTitle());
      loadTasklist(taskContainer.getTasks());
    },

    addTaskElement: (task) => {
      tasklist.appendChild(createTaskElement(task));
    },
  };

  function reset() {
    header.innerHTML = "";
    while (tasklist.children.length > 1)
      tasklist.removeChild(tasklist.lastChild);

    noTaskMsg.style.display = "initial";
    newTaskForm.style.display = "none";
    newTaskBtn.style.display = "none";
  }

  function loadHeader(str) {
    header.innerHTML = str;
  }

  function loadTasklist(tasks) {
    if (Object.keys(tasks) != 0) {
      noTaskMsg.style.display = "none";

      for (const key in tasks) {
        tasklist.appendChild(createTaskElement(tasks[key]));
      }
    }
  }

  return publicMethods;
})();

function createTaskElement(task) {
  const containerElement = document.createElement("div");

  containerElement.classList.add("task");
  containerElement.appendChild(createTitle());
  containerElement.appendChild(createDescription());
  containerElement.appendChild(createDueDate());
  containerElement.appendChild(createPriority());
  containerElement.appendChild(createCompleted());
  containerElement.appendChild(createDeleteTask());

  containerElement.addEventListener("change", Storage.saveProjects);

  return containerElement;

  function createTitle() {
    const title = task.getTitle();
    const element = document.createElement("div");

    element.classList.add("title");
    element.innerHTML = title;

    return element;
  }

  function createDescription() {
    const description = task.getDescription();
    const element = document.createElement("div");

    element.classList.add("description");
    element.innerHTML = description;

    return element;
  }

  function createDueDate() {
    const dueDate = task.getDueDate();
    const element = document.createElement("div");

    element.classList.add("due-date");
    element.innerHTML = dueDate;

    return element;
  }

  function createPriority() {
    const priority = task.getPriority();
    const element = document.createElement("div");

    element.classList.add("priority");
    element.classList.add(["low", "medium", "high"][priority]);
    element.innerHTML = ["Low", "Medium", "High"][priority];

    return element;
  }

  function createCompleted() {
    const completed = task.getCompleted();
    const element = document.createElement("input");

    element.classList.add("completed");
    element.type = "checkbox";
    element.checked = completed ? true : false;

    element.addEventListener("change", () =>
      task.setCompleted(element.checked),
    );

    return element;
  }

  function createDeleteTask() {
    const element = document.createElement("div");
    element.classList.add("delete-button");
    element.innerHTML = "×";

    element.addEventListener("click", (e) => {
      if (confirm("Are you sure you wish to remove this task?")) {
        e.target.parentElement.remove();
        task.getProject().deleteTask(task);
        Storage.saveProjects();
      }
    });

    return element;
  }
}
