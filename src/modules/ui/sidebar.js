import { Project } from "../data-handling/project";
import { Storage } from "../data-handling/storage";
import { projectList, projectPage } from "../..";

export function Sidebar() {
  const projectTabs = document.getElementById("project-tabs");
  const newProjectBtn = document.getElementById("new-project-btn");

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
    const title = project.getTitle();
    const containerElement = document.createElement("div");
    containerElement.classList.add("tab");
    containerElement.title = title;

    containerElement.appendChild(createTitle());
    containerElement.appendChild(createDelete());

    if (project.isActive()) {
      updateActive(project, containerElement);
      projectPage.load(project);
    }

    projectTabs.appendChild(containerElement);

    function createTitle() {
      const element = document.createElement("div");
      element.classList.add("title");
      element.innerHTML = title;

      containerElement.addEventListener("click", (e) => {
        updateActive(project, containerElement);
        projectPage.load(project);
      });

      return element;
    }

    function createDelete() {
      const element = document.createElement("div");
      element.classList.add("delete");
      element.innerHTML = "×";

      element.addEventListener("click", () => {
        if (confirm("Are you sure you wish to remove this project?")) {
          projectTabs.removeChild(containerElement);
          projectList.deleteProject(project);
          Storage.saveProjects(projectList);
        }
      });

      return element;
    }
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
