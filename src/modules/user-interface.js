import { Project } from "./project";
import { Task } from "./task";
import { projectList, filterList } from "..";

const sidebar = Sidebar();

const filterTabsElement = document.getElementById("sidebar-filter-tabs");
const projectTabsElement = document.getElementById("sidebar-project-tabs");

export function UserInterface() {
  const publicMethods = {
    load: () => {
      sidebar.loadTabs();
    },
  };

  return publicMethods;
}

function loadProjectPage(project) {
  const pageHeader = document.getElementById("project-page-header");
  const pageNewTaskBtn = document.getElementById(
    "project-page-new-task-button",
  );
  const pageTasks = document.getElementById("project-page-tasks");

  pageNewTaskBtn.addEventListener("click", newTaskHandler);

  resetPage();
  loadPage();

  function loadPage() {
    loadHeader(project.getTitle());
    loadTasks(project.getTasks());
  }

  function resetPage() {
    removeElementChildren(pageHeader);
    removeElementChildren(pageTasks);
  }

  function loadHeader(projectTitle) {
    pageHeader.innerHTML = projectTitle;
  }

  function loadTasks(taskList) {
    for (const key in taskList) {
      const task = taskList[key].getTask();

      pageTasks.appendChild(createTaskElement(task));
    }
  }

  function newTaskHandler() {
    const form = document.getElementById("new-task-form");
    const formTitle = document.getElementById("new-task-form-title");
    const formDescription = document.getElementById("new-task-form-desc");
    const formDueDate = document.getElementById("new-task-form-duedate");
    const formPriority = document.getElementById("new-task-form-priority");
    const formCompleted = document.getElementById("new-task-form-completed");
    const formCancelBtn = document.getElementById("new-task-form-cancel");

    formCancelBtn.addEventListener("click", resetTaskHandler);
    form.addEventListener("submit", submitForm);

    form.style.display = "block";
    pageNewTaskBtn.style.display = "none";

    function resetTaskHandler() {
      form.style.display = "none";
      pageNewTaskBtn.style.display = "inline";
      form.reset();
    }

    function submitForm() {
      project.addTask(
        Task(
          formTitle.value,
          formDescription.value,
          formDueDate.value,
          formPriority.value,
          formCompleted.value,
        ),
      );
      resetTaskHandler();
      resetPage();
      loadPage();
    }
  }

  function createTaskElement(task) {
    const wrapperElement = document.createElement("div");
    wrapperElement.classList.add("task");

    wrapperElement.appendChild(createTitle());
    wrapperElement.appendChild(createDescription());
    wrapperElement.appendChild(createDueDate());
    wrapperElement.appendChild(createPriority());
    wrapperElement.appendChild(createCompleted());
    wrapperElement.appendChild(createDeleteTask());

    return wrapperElement;

    function createTitle() {
      let element = document.createElement("div");
      element.classList.add("task-title");
      element.innerHTML = task.title;

      element.addEventListener("click", () =>
        console.log("NEED CODE: Click me and I should be editable"),
      );

      return element;
    }

    function createDescription() {
      const element = document.createElement("div");
      element.classList.add("task-description");
      element.innerHTML = task.description;

      element.addEventListener("click", () =>
        console.log("NEED CODE: Click me and I should be editable"),
      );

      return element;
    }

    function createDueDate() {
      const element = document.createElement("div");
      element.classList.add("task-duedate");
      element.innerHTML = task.dueDate;

      element.addEventListener("click", () =>
        console.log("NEED CODE: Click me and I should be editable"),
      );

      return element;
    }

    function createPriority() {
      const element = document.createElement("input");
      element.classList.add("task-priority");
      element.type = "number";
      element.setAttribute("min", "0");
      element.setAttribute("max", "10");
      element.value = task.priority;

      element.addEventListener("change", () => {
        element.value <= 10 && element.value >= 0
          ? (task.priority = element.value)
          : (element.value = task.priority);
      });

      return element;
    }

    function createCompleted() {
      const element = document.createElement("input");
      element.classList.add("task-completed");
      element.type = "checkbox";
      element.checked = task.completed;

      element.addEventListener("change", () => {
        task.completed = element.checked;
      });

      return element;
    }

    function createDeleteTask() {
      const element = document.createElement("button");
      element.classList.add("task-delete-button");
      element.innerHTML = "×";

      element.addEventListener("click", () => {
        if (confirm("Are you sure you wish to remove this task?")) {
          pageTasks.removeChild(wrapperElement);
          project.deleteTask(task);
        }
      });

      return element;
    }
  }
}

function Sidebar() {
  const publicMethods = {
    loadTabs: () => {
      loadProjectTabs();
    },

    reloadProjectTabs: () => {
      removeElementChildren(projectTabsElement);
      loadProjectTabs();
    },
  };

  return publicMethods;
}

function loadProjectTabs() {
  for (const project of Object.values(projectList.getProjects())) {
    const projectTitle = project.getTitle();
    const buttonElement = document.createElement("button");

    buttonElement.innerHTML = projectTitle;
    buttonElement.id = projectTitle + "-tab";
    buttonElement.title = projectTitle;
    buttonElement.addEventListener("click", (e) => {
      updateActiveClassTabs(e);
      clickSidebarTab(project);
    });

    projectTabsElement.appendChild(buttonElement);
  }
}

function updateActiveClassTabs(event) {
  for (const child of filterTabsElement.children) {
    child.classList.remove("active");
  }
  for (const child of projectTabsElement.children) {
    child.classList.remove("active");
  }
  event.target.classList.add("active");
}

function clickSidebarTab(project) {
  loadProjectPage(project);
}

function removeElementChildren(element) {
  element.innerHTML = "";
}

(function NewProjectHandler() {
  const newProjectBtn = document.getElementById("sidebar-project-new-button");
  const newProjectDialog = document.getElementById("new-project-dialog");
  const newProjectForm = document.getElementById("new-project-form");
  const newProjectFormTitle = document.getElementById("new-project-form-title");
  const newProjectFormCancel = document.getElementById(
    "new-project-form-cancel",
  );

  newProjectBtn.addEventListener("click", clickNewProject);
  newProjectForm.addEventListener("submit", submitNewProjectForm);
  newProjectFormCancel.addEventListener("click", closeNewProjectDialog);
  newProjectDialog.addEventListener("close", closeNewProjectDialog);

  let newProject = {};

  function clickNewProject() {
    newProjectDialog.showModal();
  }

  function submitNewProjectForm() {
    newProject = Project(newProjectFormTitle.value);

    projectList.addProject(newProject);
    sidebar.reloadProjectTabs();
  }

  function closeNewProjectDialog() {
    if (newProjectDialog.hasAttribute("open")) {
      newProjectDialog.close();
    }

    newProjectForm.reset();

    loadProjectPage(newProject);
  }
})();
