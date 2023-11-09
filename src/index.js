import "./style.css";
import { Filters } from "./modules/filters";
import { ProjectList } from "./modules/project-list";
import { Sidebar } from "./modules/ui/sidebar";

const filterList = Filters();
const projectList = ProjectList();
const sidebar = Sidebar();

sidebar.load();

export { projectList, filterList };
