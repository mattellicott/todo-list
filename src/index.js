import "./style.css";
import { UserInterface } from "./modules/user-interface";
import { ProjectList } from "./modules/project-list";

const projects = ProjectList();
const UI = UserInterface();

UI.init();

export { projects };
