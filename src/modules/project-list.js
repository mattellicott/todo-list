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

    getProjectTitles: () => {
      const titles = [];

      for (const key in _projectList) {
        titles.push(_projectList[key].getTitle());
      }

      return titles;
    },
  };

  return publicMethods;
}
