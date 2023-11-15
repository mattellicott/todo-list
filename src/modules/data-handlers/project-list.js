import { deleteProperty } from "../shared/shared-functions";
import { Storage } from "./storage";

export const ProjectList = (function () {
  const _projectList = {};

  const publicMethods = {
    addProject: (project) => {
      _projectList[Object.keys(_projectList).length] = project;
      Storage.saveProjects();
    },

    deleteProject: (project) => {
      deleteProperty(_projectList, project);
      Storage.saveProjects();
    },

    getProjects: () => {
      return _projectList;
    },

    getActive: () => {
      for (const key in _projectList) {
        const project = _projectList[key];

        if (project.isActive()) return project;
      }
    },

    setActiveProject: (project) => {
      for (const key in _projectList) {
        const currentProject = _projectList[key];

        currentProject === project
          ? currentProject.setActive(true)
          : currentProject.setActive(false);
      }
      Storage.saveProjects();
    },
  };

  return publicMethods;
})();
