import { Project } from "../data-handlers/project";
import { Storage } from "../data-handlers/storage";
import { projectList, projectPage } from "../..";

export function Sidebar() {
  const projectTabs = document.getElementById("project-tabs");
  const newProjectBtn = document.getElementById("new-project-btn");

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
      addProjectTab(project);
    }
  }

  function addProjectTab(project) {
    const title = project.getTitle();
    const containerElement = document.createElement("div");
    containerElement.classList.add("tab");
    containerElement.title = title;

    containerElement.appendChild(createTitle());
    containerElement.appendChild(createDelete());

    projectTabs.appendChild(containerElement);

    if (project.isActive()) {
      updateActiveTab(containerElement);
      projectPage.load(project);
    }

    function createTitle() {
      const element = document.createElement("div");
      element.classList.add("title");
      element.innerHTML = title;

      containerElement.addEventListener("click", (e) => {
        updateActiveTab(containerElement);
        projectList.setActiveProject(project);
        projectPage.load(project);
      });

      return element;
    }

    function createDelete() {
      const element = document.createElement("div");
      element.classList.add("delete");
      element.innerHTML = "×";

      element.addEventListener("click", (e) => {
        if (confirm("Are you sure you wish to remove this project?")) {
          e.stopPropagation();

          if (e.target.parentElement === currentTab)
            updateActiveTab(document.getElementsByClassName("tab")[0]);

          projectTabs.removeChild(containerElement);
          projectList.deleteProject(project);

          Storage.saveProjects();
        }
      });

      return element;
    }
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

      projectList.addProject(newProject);
      projectList.setActiveProject(newProject);
      addProjectTab(newProject);
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
