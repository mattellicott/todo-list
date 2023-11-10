import { Project } from "../data/project";
import { Task } from "../data/task";
import { Storage } from "../data/storage";
import { projectList, projectPage } from "../..";

export function Sidebar() {
  const projectTabs = document.getElementById("sidebar-project-tabs");
  const newProjectBtn = document.getElementById("sidebar-project-new-button");

  // Current should default to the All Filter or the last opened Project
  // This should cause it to automatically set the right tab with the 'active' class
  // project: Project(),
  let currentProject;
  let currentTab;

  newProjectBtn.addEventListener("click", newProjectHandler);

  const publicMethods = {
    load: () => {
      addTabs();
    },
  };

  return publicMethods;

  function addTabs() {
    for (const project of Object.values(projectList.getProjects())) {
      addTab(project);
    }
  }

  function addTab(project) {
    const element = document.createElement("button");
    const title = project.getTitle();

    element.innerHTML = title;
    element.id = title + "-tab";
    element.classList.add("sidebar-tab");
    element.title = title;

    if (project.isActive()) {
      updateActive(project, element);
      projectPage.load(project);
    }

    element.addEventListener("click", (e) => {
      updateActive(project, e.target);
      projectPage.load(project);
    });

    projectTabs.appendChild(element);
  }

  function updateActive(project, element) {
    updateActiveProject(project);
    updateActiveTab(element);
  }

  function updateActiveProject(project) {
    if (currentProject) currentProject.setActive(false);
    currentProject = project;
    currentProject.setActive(true);
  }

  function updateActiveTab(element) {
    if (currentTab) currentTab.classList.remove("active");
    currentTab = element;
    currentTab.classList.add("active");
  }

  function newProjectHandler() {
    const dialog = document.getElementById("new-project-dialog");
    const form = document.getElementById("new-project-form");
    const formTitle = document.getElementById("new-project-form-title");
    const formCancel = document.getElementById("new-project-form-cancel");

    const newProject = Project();

    form.addEventListener("submit", submitForm);
    formCancel.addEventListener("click", closeDialog);
    dialog.addEventListener("close", closeDialog);

    dialog.showModal();

    function submitForm() {
      newProject.setTitle(formTitle.value);
      updateActiveProject(newProject);

      projectList.addProject(newProject);
      addTab(newProject);
    }

    function closeDialog() {
      if (dialog.hasAttribute("open")) {
        dialog.close();
      }

      form.reset();
      form.removeEventListener("submit", submitForm);
      formCancel.removeEventListener("click", closeDialog);
      dialog.removeEventListener("close", closeDialog);
    }
  }
}
