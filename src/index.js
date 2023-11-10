import "./style.css";
import { Storage } from "./modules/data-handling/storage";
import { Filters } from "./modules/data-handling/filters";
import { ProjectList } from "./modules/data-handling/project-list";
import { Sidebar } from "./modules/ui/sidebar";
import { ProjectPage } from "./modules/ui/project-page,js";

const filterList = Filters();
const projectList = ProjectList();
const sidebar = Sidebar();
const projectPage = ProjectPage();

Storage.loadProjects(projectList);

sidebar.load();
projectPage.load(projectList.getActive());

export { projectList, filterList, projectPage };
