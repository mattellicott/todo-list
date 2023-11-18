import "./style.css";
import { Sidebar } from "./modules/ui/sidebar";
import { Storage } from "./modules/data-handlers/storage";

Storage.loadProjects();
Sidebar.load();

document.body.style.visibility = "visible";
