import { Storage } from "../data-handling/storage";

export function createTaskElement(task) {
  const title = task.getTitle();
  const description = task.getDescription();
  const dueDate = task.getDueDate();
  const priority = task.getPriority();
  const completed = task.getCompleted();

  const containerElement = document.createElement("div");
  containerElement.classList.add("task");

  containerElement.appendChild(createTitle());
  containerElement.appendChild(createDescription());
  containerElement.appendChild(createDueDate());
  containerElement.appendChild(createPriority());
  containerElement.appendChild(createCompleted());
  containerElement.appendChild(createDeleteTask());

  return containerElement;

  function createTitle() {
    const element = document.createElement("div");
    element.classList.add("title");
    element.innerHTML = title;

    return element;
  }

  function createDescription() {
    const element = document.createElement("div");
    element.classList.add("description");
    element.innerHTML = description;

    return element;
  }

  function createDueDate() {
    const element = document.createElement("div");
    element.classList.add("due-date");
    element.innerHTML = dueDate;

    return element;
  }

  function createPriority() {
    const element = document.createElement("div");
    element.classList.add("priority");
    element.classList.add(["low", "medium", "high"][priority]);
    element.innerHTML = ["Low", "Medium", "High"][priority];

    return element;
  }

  function createCompleted() {
    const element = document.createElement("div");
    element.classList.add("completed");
    if (completed) element.innerHTML = "×";

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
