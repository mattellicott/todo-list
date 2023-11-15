import { Storage } from "./storage";
import { deleteProperty } from "../shared/shared-functions";

export function Project() {
  const _taskList = {};

  let _title = "";
  let _active = false;

  const publicMethods = {
    addTask: (task) => {
      _taskList[Object.keys(_taskList).length] = task;
      Storage.saveProjects();
    },

    deleteTask: (task) => {
      deleteProperty(_taskList, task);
      Storage.saveProjects();
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
  };

  return publicMethods;
}
