import "./style.css";
import { Filters } from "./modules/filters";
import { ProjectList } from "./project-list";
import { UserInterface } from "./user-interface";

const filters = Filters();
const projectList = ProjectList();
const ui = UserInterface();

ui.load();

export { projectList, filters };
