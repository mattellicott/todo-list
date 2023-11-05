import "./style.css";
import { UI } from "./modules/UI";
import { ProjectList } from "./modules/ProjectList";

export const projects = ProjectList();

UI.init();
