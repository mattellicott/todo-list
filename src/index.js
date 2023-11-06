import "./style.css";
import { Filters } from "./modules/filters";
import { ProjectList } from "./modules/project-list";
import { UserInterface } from "./modules/user-interface";

const filters = Filters();
const projectList = ProjectList();
const ui = UserInterface();

ui.load();

export { projectList, filters };
