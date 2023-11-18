import { ProjectList } from "../data-handlers/project-list";
import { Storage } from "../data-handlers/storage";
import { compareAsc } from "date-fns";

export const Page = (function () {
  const headerDiv = document.getElementById("page-header");
  const tasksContainerDiv = document.getElementById("tasks-container");
  const defaultTaskMsgDiv = document.getElementById("default-task-message");
  const newTaskBtn = document.getElementById("new-task-btn");
  const newTaskForm = document.getElementById("new-task-form");
  const tasksHeaderDiv = document.getElementById("tasks-header");

  for (const child of tasksHeaderDiv.children)
    child.addEventListener("click", (e) => tasklistSortHandler(e));

  const observer = new MutationObserver(setDefaultTaskMsg);
  observer.observe(tasksContainerDiv, { childList: true });

  let _pageType;
  let _sortType;
  let _lastSortType;
  let _isRepeatedSortType;
  let _title;
  let _tasks;

  const publicMethods = {
    load: (taskContainer, type) => {
      _title = taskContainer.getTitle();
      _tasks = Object.values(taskContainer.getTasks());
      _pageType = type;
      _isRepeatedSortType = false;
      _lastSortType = _pageType == 'filter' ? 'project-title' : 'title';

      reset();
      setDefaultTaskMsg();
      loadHeader();
      loadTasklist(_tasks);
    },

    addTaskElement: (task) => {
      tasksContainerDiv.appendChild(createTaskElement(task));
    },
  };

  function setDefaultTaskMsg() {
    const noProjMsg =
      Object.keys(ProjectList.getProjects()).length == 0
        ? "a New Project and then "
        : "";

    const noTaskMsg =
      _tasks.length == 0
        ? `Create ${noProjMsg}a New Task to get started!`
        : "";

    defaultTaskMsgDiv.innerHTML = noTaskMsg;
  }

  function reset() {
    headerDiv.innerHTML = "";
    resetTasklist();

    newTaskForm.style.display = "none";
    newTaskBtn.style.display = "none";
  }

  function loadHeader() {
    headerDiv.innerHTML = _title + " Tasks";
  }

  function loadTasklist(tasks) {
    tasksHeaderDiv.firstElementChild.style.display =
      _pageType == "filter" ? "" : "none";

    for (const task of tasks) {
      tasksContainerDiv.appendChild(createTaskElement(task));
    }
  }

  function resetTasklist() {
    while (tasksContainerDiv.childElementCount > 1)
    tasksContainerDiv.removeChild(tasksContainerDiv.lastChild);
  }

  function reloadTasklist(tasks) {
    resetTasklist();
    loadTasklist(tasks);
  }

  function tasklistSortHandler(event) {
    _sortType = event.target.className;

    if (_sortType == _lastSortType) _isRepeatedSortType = !_isRepeatedSortType;
    else _isRepeatedSortType = false;

    sortTasklist();
    _lastSortType = _sortType;

    function sortTasklist() {
      const _tasksCopy = [..._tasks];

      switch (_sortType) {
        case "project-title":
          if (!_isRepeatedSortType)
            _tasksCopy.sort((a, b) =>
              sortString(a.getProject().getTitle(), b.getProject().getTitle()),
            );
          else
            _tasksCopy.sort((b, a) =>
              sortString(a.getProject().getTitle(), b.getProject().getTitle()),
            );
          break;
        case "title":
          if (!_isRepeatedSortType)
            _tasksCopy.sort((a, b) => sortString(a.getTitle(), b.getTitle()));
          else
            _tasksCopy.sort((b, a) => sortString(a.getTitle(), b.getTitle()));
          break;
        case "description":
          if (!_isRepeatedSortType)
            _tasksCopy.sort((a, b) =>
              sortString(a.getDescription(), b.getDescription()),
            );
          else
            _tasksCopy.sort((b, a) =>
              sortString(a.getDescription(), b.getDescription()),
            );
          break;
        case "due-date":
          if (!_isRepeatedSortType)
            _tasksCopy.sort((a, b) => sortDate(a.getDueDate(), b.getDueDate()));
          else
            _tasksCopy.sort((b, a) => sortDate(a.getDueDate(), b.getDueDate()));
          break;
        case "priority":
          if (!_isRepeatedSortType)
            _tasksCopy.sort((a, b) => a.getPriority() - b.getPriority());
          else _tasksCopy.sort((b, a) => a.getPriority() - b.getPriority());
          break;
        case "completed":
          if (!_isRepeatedSortType)
            _tasksCopy.sort((a, b) => a.getCompleted() - b.getCompleted());
          else _tasksCopy.sort((b, a) => a.getCompleted() - b.getCompleted());
          break;
      }

      reloadTasklist(_tasksCopy);

      function sortString(aValue, bValue) {
        return aValue.localeCompare(bValue, undefined, {
          numeric: true,
        });
      }

      function sortDate(aValue, bValue) {
        const [aMonth, aDay, aYear] = aValue.split("/");
        const [bMonth, bDay, bYear] = bValue.split("/");

        return compareAsc(
          new Date(aYear, aMonth - 1, aDay),
          new Date(bYear, bMonth - 1, bDay),
        );
      }
    }
  }

  function createTaskElement(task) {
    const containerElement = document.createElement("div");

    containerElement.classList.add("task");

    if (_pageType === "filter")
      containerElement.appendChild(createProjectTitle());
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
      const elementWrapper = document.createElement("div");
      const element = document.createElement("div");

      elementWrapper.classList.add("project-title");
      elementWrapper.appendChild(element);

      element.innerHTML = title;

      return elementWrapper;
    }

    function createTaskTitle() {
      const title = task.getTitle();
      const elementWrapper = document.createElement("div");
      const element = document.createElement("div");

      elementWrapper.classList.add("task-title");
      elementWrapper.appendChild(element);

      element.innerHTML = title;

      return elementWrapper;
    }

    function createDescription() {
      const description = task.getDescription();
      const elementWrapper = document.createElement("div");
      const element = document.createElement("div");

      elementWrapper.classList.add("description");
      elementWrapper.appendChild(element);

      element.innerHTML = description;

      return elementWrapper;
    }

    function createDueDate() {
      const dueDate = task.getDueDate();
      const elementWrapper = document.createElement("div");
      const element = document.createElement("div");

      elementWrapper.classList.add("due-date");
      elementWrapper.appendChild(element);

      element.innerHTML = dueDate;

      return elementWrapper;
    }

    function createPriority() {
      const priority = task.getPriority();
      const elementWrapper = document.createElement("div");
      const element = document.createElement("div");

      elementWrapper.classList.add("priority");
      elementWrapper.appendChild(element);

      element.classList.add(["low", "medium", "high"][priority]);
      element.innerHTML = ["Low", "Medium", "High"][priority];

      return elementWrapper;
    }

    function createCompleted() {
      const completed = task.getCompleted();
      const elementWrapper = document.createElement("div");
      const element = document.createElement("input");

      elementWrapper.classList.add("completed");
      elementWrapper.appendChild(element);

      element.type = "checkbox";
      element.checked = completed ? true : false;

      element.addEventListener("change", () =>
        task.setCompleted(element.checked),
      );

      return elementWrapper;
    }

    function createDeleteTask() {
      const elementWrapper = document.createElement("div");
      const element = document.createElement("div");

      elementWrapper.classList.add("delete-btn");
      elementWrapper.appendChild(element);

      element.innerHTML = "×";

      element.addEventListener("click", (e) => {
        if (confirm("Are you sure you wish to remove this task?")) {
          e.target.parentElement.parentElement.remove();
          task.getProject().deleteTask(task);
          Storage.saveProjects();
        }
      });

      return elementWrapper;
    }
  }

  return publicMethods;
})();
