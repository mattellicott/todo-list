import { Project } from "./project";
import { Task } from "./task";
import { projectList } from "../..";

export const Storage = {
  loadProjects: () => {
    const storedProjects = JSON.parse(localStorage.getItem("storedProjects"));

    for (const key in storedProjects) {
      const newProject = Project();
      const tasks = storedProjects[key].tasks;
      const active = storedProjects[key].active;

      newProject.setTitle(storedProjects[key].title);
      newProject.setActive(active);

      for (const key in tasks) {
        const task = tasks[key];

        newProject.addTask(
          Task(
            newProject,
            task.title,
            task.description,
            task.dueDate,
            task.priority,
            task.completed,
          ),
        );
      }

      projectList.addProject(newProject);
    }
  },

  saveProjects: () => {
    let storedProjects = {};

    for (const [key, project] of Object.entries(projectList.getProjects())) {
      const tasks = {};

      for (const [key, task] of Object.entries(project.getTasks())) {
        tasks[key] = {
          title: task.getTitle(),
          description: task.getDescription(),
          dueDate: task.getDueDate(),
          priority: task.getPriority(),
          completed: task.getCompleted(),
        };
      }

      storedProjects[key] = {
        title: project.getTitle(),
        tasks: tasks,
        active: project.isActive(),
      };
    }

    localStorage.setItem("storedProjects", JSON.stringify(storedProjects));
  },
};
