import { deleteProperty } from "./shared-functions";

export function Project(title) {
  const _title = title;
  const _taskList = {};

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
  };

  return publicMethods;
}
