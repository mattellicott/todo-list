function Project(title) {
  const _title = title;
  const _taskList = {};

  const publicMethods = {
    addTask: (task) => {
      _taskList[Object.keys(_taskList).length] = task;
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
