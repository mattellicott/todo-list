function Task(project, title, description, dueDate, priority, completed) {
  const _task = { project, title, description, dueDate, priority, completed };

  const publicMethods = {
    getProject: () => {
      return _task.project;
    },

    getTitle: () => {
      return _task.title;
    },

    getDescription: () => {
      return _task.description;
    },

    getDueDate: () => {
      return _task.dueDate;
    },

    getPriority: () => {
      return _task.priority;
    },

    getCompleted: () => {
      return _task.completed;
    },

    setTitle: (title) => {
      _task.title = title;
    },

    setDescription: (description) => {
      _task.description = description;
    },

    setDueDate: (dueDate) => {
      _task.dueDate = dueDate;
    },

    setPriority: (priority) => {
      _task.priority = priority;
    },

    setCompleted: (completed) => {
      _task.completed = completed;
    },
  };

  return publicMethods;
}

export { Task };
