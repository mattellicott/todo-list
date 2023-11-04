export const projectList = function () {
  const _projectList = {};

  const publicMethods = {
    getProjects: () => {
      return _projectList;
    },
  };

  return publicMethods;
};
