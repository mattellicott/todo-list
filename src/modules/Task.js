export function Task(title, description, dueDate, priority = 0, completed = false) {
  const _task = { title, description, dueDate, priority, completed };

  const publicMethods = {
    getTask: () => {
      return _task;
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
