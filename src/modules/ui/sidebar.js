import { Project } from "../data/project";
import { Task } from "../data/task";
import { Storage } from "../data/storage";
import { projectList, projectPage } from "../..";

export function Sidebar() {
  const projectTabs = document.getElementById("sidebar-project-tabs");
  const newProjectBtn = document.getElementById("sidebar-project-new-button");

  let current = {
    // Current should default to the All Filter or the last opened Project
    // This should cause it to automatically set the right tab with the 'active' class
    project: Project(),
  };
  let last = {};

  newProjectBtn.addEventListener("click", newProjectHandler);

  const publicMethods = {
    load: () => {
      // let proj = Project();
      // proj.setTitle("Proj1");
      // proj.addTask(Task("Task1", "Desc1", "11/1/23"));
      // proj.addTask(Task("Task11", "Desc11", "11/1/23"));
      // proj.addTask(Task("Task111", "Desc111", "11/1/23"));
      // projectList.addProject(proj);

      // proj = Project();
      // proj.setTitle("Proj2");
      // proj.addTask(Task("Task2", "Desc2", "11/1/23"));
      // proj.addTask(Task("Task22", "Desc22", "11/1/23"));
      // projectList.addProject(proj);

      // proj = Project();
      // proj.setTitle("Proj3");
      // proj.addTask(Task("Task3", "Desc3", "11/1/23"));
      // proj.addTask(Task("Task33", "Desc33", "11/1/23"));
      // proj.addTask(Task("Task333", "Desc333", "11/1/23"));
      // projectList.addProject(proj);

      // current.project = proj;
      window.ls = projectList;

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

    if (project.getActive()) updateCurrent(element, project);

    element.addEventListener("click", (e) => updateCurrent(e.target, project));

    projectTabs.appendChild(element);
  }

  function updateCurrent(newTab, project) {
    if (current.tab !== newTab) {
      if (current.tab) {
        last.tab = current.tab;
        last.project = current.project;
      }
      current.tab = newTab;
      current.project = project;

      setActiveTab();
      projectPage.load(project);
    }
  }

  function setActiveTab() {
    if (last.tab) last.tab.classList.remove("active");
    current.tab.classList.add("active");
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

      projectList.setAllInactive();
      projectList.addProject(newProject);

      current.project.makeInactive();
      addTab(newProject);

      Storage.saveProjects(projectList);
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
