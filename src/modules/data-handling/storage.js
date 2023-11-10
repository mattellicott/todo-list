import { Project } from "./project";
import { Task } from "./task";

export const Storage = {
  loadProjects: (projectList) => {
    const projects = JSON.parse(localStorage.getItem("projects"));

    for (const key in projects) {
      const newProject = Project();
      const tasks = projects[key].tasks;
      const active = projects[key].active;

      newProject.setTitle(projects[key].title);
      newProject.setActive(active);

      for (const key in tasks) {
        const task = tasks[key];
        newProject.addTask(
          Task(
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

  saveProjects: (projectList) => {
    let projects = {};

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

      projects[key] = {
        title: project.getTitle(),
        tasks: tasks,
        active: project.isActive(),
      };
    }

    localStorage.setItem("projects", JSON.stringify(projects));
  },
};
