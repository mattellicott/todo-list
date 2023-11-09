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

    setAllInactive: () => {
      for (const key in _projectList) {
        _projectList[key].makeInactive();
      }
    },
  };

  return publicMethods;
}
