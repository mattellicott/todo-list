import { deleteProperty } from "./shared-functions";

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

    findActive: () => {
      for (const key in _projectList) {
        if (_projectList[key].getIsActive()) return true;
      }
    },

    setProjectsInactive: () => {
      for (const key in _projectList) {
        _projectList[key].setIsActive(false);
      }
    },
  };

  return publicMethods;
}
