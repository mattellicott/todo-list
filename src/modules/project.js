import { deleteProperty } from "./shared-functions";

export function Project(title) {
  const _title = title;
  const _taskList = {};

  let _active = true;

  const publicMethods = {
    addTask: (task) => {
      _taskList[Object.keys(_taskList).length] = task;
    },

    deleteTask: (task) => {
      deleteProperty(_taskList, task);
    },

    getTitle: () => {
      return _title;
    },

    getTasks: () => {
      return _taskList;
    },

    getActive: () => {
      return _active;
    },

    makeActive: () => {
      _active = true;
    },

    makeInactive: () => {
      _active = false;
    },
  };

  return publicMethods;
}
