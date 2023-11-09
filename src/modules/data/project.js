import { deleteProperty } from "../shared/shared-functions";

export function Project() {
  const _taskList = {};

  let _title = "";
  let _active = false;

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

    setTitle: (title) => {
      _title = title;
    },

    getTasks: () => {
      return _taskList;
    },

    isActive: () => {
      return _active;
    },

    setActive: (bool) => {
      _active = bool;
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
