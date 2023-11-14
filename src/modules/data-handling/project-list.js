import { deleteProperty } from "../shared/shared-functions";

export function ProjectList() {
  const _projectList = {};

  const publicMethods = {
    addProject: (project) => {
      _projectList[Object.keys(_projectList).length] = project;
    },

    deleteProject: (project) => {
      deleteProperty(_projectList, project);
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
    },
  };

  return publicMethods;
}
