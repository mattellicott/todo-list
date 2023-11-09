import "./style.css";
import { Storage } from "./modules/data/storage";
import { Filters } from "./modules/filters";
import { ProjectList } from "./modules/data/project-list";
import { Sidebar } from "./modules/ui/sidebar";
import { ProjectPage } from "./modules/ui/project-page,js";
import { Project } from "./modules/data/project";

const DEFAULT_PROJECT = Project();

const filterList = Filters();
const projectList = ProjectList();
const sidebar = Sidebar();
const projectPage = ProjectPage();

Storage.loadProjects(projectList);

sidebar.load();
projectPage.load(DEFAULT_PROJECT);

export { projectList, filterList, projectPage };
