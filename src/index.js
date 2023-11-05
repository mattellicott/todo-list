import "./style.css";
import { UserInterface } from "./modules/UI";
import { ProjectList } from "./modules/ProjectList";

const projects = ProjectList();
const UI = UserInterface();

UI.init();

export { projects };
