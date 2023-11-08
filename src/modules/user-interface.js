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
  const pageAddTaskBtn = document.getElementById("project-page-add-task-button");
  const addTaskForm = document.getElementById("add-task-form");
  const pageTasks = document.getElementById("project-page-tasks");

  pageAddTaskBtn.addEventListener("click", clickAddTaskBtn);

  resetPage();
  loadHeader(project.getTitle());
  loadTasks(project.getTasks());

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

      pageTasks.appendChild(TaskElement(task));
    }
  }

  function clickAddTaskBtn() {
    showAddTaskForm();
  }

  function showAddTaskForm() {
    addTaskForm.style.visibility = "visible";
  }

  function TaskElement(task) {
    const wrapperElement = document.createElement("div");
    wrapperElement.classList.add("task");

    wrapperElement.appendChild(createTitle());
    wrapperElement.appendChild(createDescription());
    wrapperElement.appendChild(createDueDate());
    wrapperElement.appendChild(createPriority());
    wrapperElement.appendChild(createCompleted());

    return wrapperElement;

    function createTitle() {
      const element = document.createElement("div");
      element.classList.add("task-title");
      element.innerHTML = task.title;

      element.addEventListener("click", () => console.log("NEED CODE: Click me and I should be editable"));

      return element;
    }

    function createDescription() {
      const element = document.createElement("div");
      element.classList.add("task-description");
      element.innerHTML = task.description;

      element.addEventListener("click", () => console.log("NEED CODE: Click me and I should be editable"));

      return element;
    }

    function createDueDate() {
      const element = document.createElement("div");
      element.classList.add("task-duedate");
      element.innerHTML = task.dueDate;

      element.addEventListener("click", () => console.log("NEED CODE: Click me and I should be editable"));

      return element;
    }

    function createPriority() {
      const element = document.createElement("div");
      element.classList.add("task-priority");
      element.innerHTML = task.priority;

      element.addEventListener("click", () => console.log("NEED CODE: Click me and I should be editable"));

      return element;
    }

    function createCompleted() {
      const element = document.createElement("div");
      element.classList.add("task-completed");
      element.innerHTML = task.completed;

      element.addEventListener("click", () => console.log("NEED CODE: Click me and I should be editable"));

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
  const newProjectFormCancel = document.getElementById("new-project-form-cancel");

  newProjectBtn.addEventListener("click", clickNewProject);
  newProjectForm.addEventListener("submit", submitNewProjectForm);
  newProjectFormCancel.addEventListener("click", closeNewProjectDialog);
  newProjectDialog.addEventListener("close", closeNewProjectDialog);

  function clickNewProject() {
    newProjectDialog.showModal();
  }

  function submitNewProjectForm() {
    projectList.addProject(Project(newProjectFormTitle.value));
    sidebar.reloadProjectTabs();
  }

  function closeNewProjectDialog() {
    if (newProjectDialog.hasAttribute("open")) {
      newProjectDialog.close();
    }

    newProjectForm.reset();
  }
})();
