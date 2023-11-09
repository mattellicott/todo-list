import "./style.css";
import { Filters } from "./modules/filters";
import { ProjectList } from "./modules/data/project-list";
import { Sidebar } from "./modules/ui/sidebar";
import { ProjectPage } from "./modules/ui/project-page,js";

const filterList = Filters();
const projectList = ProjectList();
const sidebar = Sidebar();
const projectPage = ProjectPage();

sidebar.load();

export { projectList, filterList, projectPage };
