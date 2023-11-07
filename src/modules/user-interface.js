import { Project } from "./project";
import { Task } from "./task";
import { projectList, filterList } from "..";

const sidebar = Sidebar();

const projectTabsElement = document.getElementById("sidebar-project-tabs");

export function UserInterface() {
  const publicMethods = {
    load: () => {
      sidebar.loadTabs();
    },
  };

  return publicMethods;
}

function Sidebar() {
  return {
    loadTabs: () => {
      loadProjectTabs();
    },
  };
}

function loadProjectTabs() {
  for (const project of Object.values(projectList.getProjects())) {
    const projectTitle = project.getTitle();
    const buttonElement = document.createElement("button");

    buttonElement.innerHTML = projectTitle;
    buttonElement.id = projectTitle + "-tab";
    buttonElement.title = projectTitle;
    buttonElement.addEventListener("click", () => clickSidebarTab(project));

    projectTabsElement.appendChild(buttonElement);
  }
}

function reloadProjectTabs() {
  while (projectTabsElement.firstChild) {
    projectTabsElement.removeChild(projectTabsElement.firstChild);
  }

  loadProjectTabs();
}

function clickSidebarTab(project) {
  console.log("CLICKING ME SHOULD LOAD PROJECT " + project.getTitle() + " INTO MAIN");
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
    reloadProjectTabs();
  }

  function closeNewProjectDialog() {
    if (newProjectDialog.hasAttribute("open")) {
      newProjectDialog.close();
    }

    newProjectForm.reset();
  }
})();
