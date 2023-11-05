import { ProjectList } from "./project-list";
import { UserInterface } from "./user-interface";

const DEFAULT_ELEMENTS = {
  sidebar: document.getElementById("sidebar"),
  main: document.getElementById("main"),
};
const DEFAULT_TAB_NAMES = ["All", "Today", "Week", "Important", "Completed"];

const projectList = ProjectList();
const ui = UserInterface();

export { DEFAULT_TAB_NAMES, DEFAULT_ELEMENTS, projectList, ui };
