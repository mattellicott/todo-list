function Project(title) {
  const _title = title;
  const _taskList = {};

  const publicMethods = {
    addTask: (task) => {
      _taskList[Object.keys(_taskList).length] = task;
    },

    deleteTask: (task) => {
      let taskDeleted = false;
      let endKey = Object.keys(_taskList).length - 1;

      for (const key in _taskList) {
        if (_taskList[key].getTask() === task) {
          taskDeleted = true;
          delete _taskList.key;
        }

        if (taskDeleted) {
          condenseTaskList(key, endKey);
          break;
        }
      }
    },

    getTitle: () => {
      return _title;
    },

    getTaskList: () => {
      return { ..._taskList };
    },
  };

  return publicMethods;
}
