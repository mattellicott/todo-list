import { Task } from "../data-handlers/task";
import { Page } from "./page";
import { getDate, getMonth, getYear } from "date-fns";

export const ProjectPage = (function () {
  const newTaskBtn = document.getElementById("new-task-btn");
  const newTaskForm = document.getElementById("new-task-form");

  newTaskBtn.addEventListener("click", newTaskHandler);

  let currentProject;

  const publicMethods = {
    load: (project) => {
      currentProject = project;

      Page.load(currentProject, "project");
      newTaskBtn.style.display = "initial";
    },
  };

  return publicMethods;

  function newTaskHandler() {
    const formTitle = document.getElementById("new-task-title");
    const formDescription = document.getElementById("new-task-description");
    const formDueDate = document.getElementById("new-task-due-date");
    const formPriority = document.getElementById("new-task-priority");
    const formCompleted = document.getElementById("new-task-completed");
    const formCancelBtn = document.getElementById("new-task-cancel");

    formCancelBtn.addEventListener("click", resetTaskHandler);
    newTaskForm.addEventListener("submit", submitForm);

    formTitle.focus();
    formDueDate.setAttribute("min", getFullDate());
    formDueDate.value = getFullDate();
    newTaskForm.style.display = "flex";
    newTaskBtn.style.display = "none";

    function resetTaskHandler() {
      formCancelBtn.removeEventListener("click", resetTaskHandler);
      newTaskForm.removeEventListener("submit", submitForm);

      newTaskForm.style.display = "none";
      newTaskBtn.style.display = "inline";
      newTaskForm.reset();
    }

    function submitForm() {
      const newTask = Task(
        currentProject,
        formTitle.value,
        formDescription.value,
        formDueDate.value,
        formPriority.selectedIndex,
        formCompleted.checked,
      );

      currentProject.addTask(newTask);
      Page.addTaskElement(newTask);

      resetTaskHandler();
    }

    function getFullDate() {
      const date = new Date();

      return getYear(date) + "-" + (getMonth(date) + 1) + "-" + getDate(date);
    }
  }
})();
