import { ProjectList } from "../data-handlers/project-list";
import { Storage } from "../data-handlers/storage";

export const Page = (function () {
  const headerDiv = document.getElementById("page-header");
  const tasklistDiv = document.getElementById("tasklist");
  const noTaskMsgDiv = document.getElementById("no-task-message");
  const newTaskBtn = document.getElementById("new-task-btn");
  const newTaskForm = document.getElementById("new-task-form");

  let pageType;

  const publicMethods = {
    load: (taskContainer, type) => {
      pageType = type;

      reset();
      setNoTaskMsg();
      loadHeader(taskContainer.getTitle());
      loadTasklist(taskContainer.getTasks());
    },

    addTaskElement: (task) => {
      tasklistDiv.appendChild(createTaskElement(task));
    },
  };

  function setNoTaskMsg() {
    const noProjMsg =
      Object.keys(ProjectList.getProjects()).length == 0
        ? "a New Project and then "
        : "";

    noTaskMsgDiv.innerHTML = `Create ${noProjMsg}a New Task to get started!`;
  }

  function reset() {
    headerDiv.innerHTML = "";
    while (tasklistDiv.children.length > 1)
      tasklistDiv.removeChild(tasklistDiv.lastChild);

    noTaskMsgDiv.style.display = "initial";
    newTaskForm.style.display = "none";
    newTaskBtn.style.display = "none";
  }

  function loadHeader(str) {
    headerDiv.innerHTML = str;
  }

  function loadTasklist(tasks) {
    if (Object.keys(tasks) != 0) {
      noTaskMsgDiv.style.display = "none";

      for (const key in tasks) {
        tasklistDiv.appendChild(createTaskElement(tasks[key], pageType));
      }
    }
  }

  return publicMethods;
})();

function createTaskElement(task, pageType) {
  const containerElement = document.createElement("div");

  containerElement.classList.add("task");

  if (pageType === "filter") containerElement.appendChild(createProjectTitle());
  containerElement.appendChild(createTaskTitle());
  containerElement.appendChild(createDescription());
  containerElement.appendChild(createDueDate());
  containerElement.appendChild(createPriority());
  containerElement.appendChild(createCompleted());
  containerElement.appendChild(createDeleteTask());

  containerElement.addEventListener("change", Storage.saveProjects);

  return containerElement;

  function createProjectTitle() {
    const title = task.getProject().getTitle();
    const element = document.createElement("div");

    element.classList.add("project-title");
    element.innerHTML = title;

    return element;
  }

  function createTaskTitle() {
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
