import { Project } from "./project";
import { Task } from "./task";
import { projectList, filterList } from "..";

const projectTabsElement = document.getElementById("sidebar-project-tabs");

const sidebar = Sidebar();

export function UserInterface() {
  const publicMethods = {
    load: () => {
      sidebar.addTabs();
    },
  };

  return publicMethods;
}

function Sidebar() {
  const publicMethods = {
    addTabs: () => {
      addProjectTabs();
    },
  };

  return publicMethods;
}

function addProjectTabs() {
  for (const project of projectList.getProjects()) {
    const buttonElement = document.createElement("button");

    buttonElement.innerHTML = project.getTitle();
    buttonElement.id = project.getTitle() + "-tab";
    buttonElement.addEventListener("click", () => clickSidebarTab(project));

    projectTabsElement.appendChild(buttonElement);
  }
}

function clickSidebarTab(project) {
  console.log("CLICKING ME SHOULD LOAD PROJECT " + project.getTitle() + " INTO MAIN");
}
