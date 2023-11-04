import { deleteProperty } from "./PublicFunctions";

export function Project(title) {
  const _title = title;
  const _taskList = {};

  const publicMethods = {
    addTask: (task) => {
      _taskList[Object.keys(_taskList).length] = task;
    },

    deleteTask: (property) => {
      deleteProperty(_taskList, property);
    },

    getTitle: () => {
      return _title;
    },

    getTaskList: () => {
      return _taskList;
    },
  };

  return publicMethods;
}
