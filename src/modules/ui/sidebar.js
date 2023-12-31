import { Project } from "../data-handlers/project";
import { FilterPage } from "./filter-page.js";
import { ProjectPage } from "./project-page.js";
import { FilterList } from "../data-handlers/filter-list.js";
import { ProjectList } from "../data-handlers/project-list.js";

export const Sidebar = (function () {
  const filterTabs = document.getElementById("filter-tabs");
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
    for (const filter of Object.values(FilterList)) {
      addFilterTab(filter);
    }

    for (const project of Object.values(ProjectList.getProjects())) {
      addProjectTab(project);
    }

    noActiveUpdate();
  }

  function addFilterTab(filter) {
    const title = filter.getTitle();
    const containerElement = document.createElement("div");
    containerElement.classList.add("tab");
    containerElement.title = title;

    containerElement.appendChild(createTitle());

    filterTabs.appendChild(containerElement);

    function createTitle() {
      const element = document.createElement("div");
      element.innerHTML = title;

      containerElement.addEventListener("click", (e) => {
        if (!containerElement.classList.contains("active")) {
          ProjectList.setActiveProject();
          updateActiveTab(containerElement);
          FilterPage.load(filter);
        }
      });

      return element;
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
      ProjectPage.load(project);
    }

    function createTitle() {
      const element = document.createElement("div");
      element.classList.add("title");
      element.innerHTML = title;

      containerElement.addEventListener("click", (e) => {
        if (!containerElement.classList.contains("active")) {
          updateActiveTab(containerElement);
          ProjectList.setActiveProject(project);
          ProjectPage.load(project);
        }
      });

      return element;
    }

    function createDelete() {
      const element = document.createElement("div");
      element.classList.add("delete");
      element.innerHTML = "×";

      element.addEventListener("click", (e) => {
        e.stopPropagation();

        if (confirm("Are you sure you wish to remove this project?")) {
          projectTabs.removeChild(containerElement);
          ProjectList.deleteProject(project);

          if (e.target.parentElement === currentTab) noActiveUpdate();
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

  function noActiveUpdate() {
    if (!ProjectList.getActive()) {
      updateActiveTab(filterTabs.firstChild);
      FilterPage.load(FilterList[0]);
    }
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

      ProjectList.addProject(newProject);
      ProjectList.setActiveProject(newProject);
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
})();
